import { useState, useEffect } from "react";
import { fetchEnrolledCoursesAPI, messageFromUserAPI } from "../api/user";

export const UserChat = (handleError) => {

    const [instructors, setInstructors] = useState([]);
    const [studentMessages, setMessages] = useState([])
    const [fetchChange, setFetchChange] = useState(false)

    useEffect(() => {
      const fetchEnrolledCoursesTutors = async () => {
        try {
          const response = await fetchEnrolledCoursesAPI();
          const courses = response.data.data;
          console.log(fetchEnrolledCoursesAPI(), '=====================================================');
          
          console.log(courses, "courrrrrseeeeeeessssssssss")
          
          if (courses.error) {
            throw new Error(courses.error.data.message);
          }

          const uniqueInstructorIds = new Set();
          const uniqueInstructors = [];
          
   
          courses.forEach((course) => {
            
            const instructor = course.courseDetails.tutor;

            console.log(instructor, "instructorrrrrrrrrrrrr")
            const instructorId = course.courseDetails.tutor._id;

            console.log(instructorId, "instructor idddddddddddd");
            
            if (!uniqueInstructorIds.has(instructorId)) {
              uniqueInstructorIds.add(instructorId);
              uniqueInstructors.push(instructor);
            }
          })
          const instructorIdsArray = Array.from(uniqueInstructorIds);
  
          console.log(messageFromUserAPI(), "+==============");
          
          const messages = await messageFromUserAPI({ uniqueInstructorIds: instructorIdsArray });
          console.log(messages,"messages");
          
          setMessages(messages)
          setInstructors(uniqueInstructors);
  
        } catch (error) {
          console.log(error.message)
          if (
            error?.message === "Access token is required" ||
            error?.message === "User not found" ||
            error?.message === "Invalid token"
  
          ) {
            handleError(error.message);
          }
        }
      };
  
      fetchEnrolledCoursesTutors();
    }, [handleError, fetchChange]);
    return { instructors, studentMessages, setFetchChange };
  };