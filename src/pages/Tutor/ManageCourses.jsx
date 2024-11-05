import { useState, useEffect } from "react";
import SectionTitle from "../../components/common/SectionTitle";
import CourseCard from "../../components/tutor/CourseCard";
import { getAllCoursesByTutorAPI } from "../../api/tutor";
import HorizontalRule from "../../components/common/HorizontalRule";
import { Footer } from "flowbite-react";

export default function ManageCourses() {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getAllCoursesByTutorAPI()
        .then((response) => {
          setCourses(response.data?.data);
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
    return (
      <>
        <SectionTitle
          title="Courses Created By You"
          description="Share the Knowledge to world!"
        />
        <HorizontalRule />
        <div className="px-4 md:px-20 pb-10 md:pb-20 md:pt-6 nexa-font">
          <CourseCard courses={courses} loading={isLoading} />
        </div>
        <Footer />
      </>
    );
  }
  