import { useEffect, useState } from "react";
import { Badge, Button } from "flowbite-react";
import CreateLesson from "../../components/tutor/CreateLesson";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCourseDetailsAPI, deleteCourseAPI } from "../../api/tutor";
import { getLessonDetailsAPI } from "../../api/common";
import SectionTitle from "../../components/common/SectionTitle";
import HorizontalRule from "../../components/common/HorizontalRule";
import Loading from "../../components/common/Loading";
import ViewLesson from "./ViewLesson";
import toast from "react-hot-toast";
import EditCourseForm from "./EditCourseForm";

export default function CourseLesson() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLesson, setSelectedLesson] = useState(null);
 
    
    useEffect(() => {
      setIsLoading(true);
      getCourseDetailsAPI(id).then((response) => {
        const course = response.data?.data;
        console.log(course, 'courseeeeeeeeeee');
        setCourse(course);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }, []);

    const handleDeleteCourse = async () => {
      
        try {
          setIsLoading(true);
          await deleteCourseAPI(id); // Call the delete API
          toast.success("Course deleted successfully");
          navigate('/tutor/courses'); // Redirect to courses list after deletion
        } catch (error) {
          console.error("Error deleting course:", error);
          toast.error("Failed to delete course. Please try again.");
        } finally {
          setIsLoading(false);
        
      }
    };
    

    return (
      <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <SectionTitle
            title={course?.title}
            description={`Providing Learnt Course Management tool :- Manage Your ${course?.title} course`}
          />
          <HorizontalRule />
          <div className="flex nexa-font p-3">
            <div className="flex-1 p-5 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <img
                src={course?.thumbnail}
                className="w-125 card ml-1 rounded"
                alt="alternate image"
              />
              <h1 className="text-white mt-3 uppercase text-center text-3xl p-5">{course.title}</h1>
              <h3 className="mt-5 text-gray-400">{course.tagline}</h3>
              <h3 className="mt-2 text-gray-400">{course.about}</h3>
           

             <div className="flex mt-5 justify-between">
             <Button 
                onClick={handleDeleteCourse} 
                color="red" 
                variant="contained" 
                disabled={isLoading}
              >
            {isLoading ? "Deleting..." : "Delete Course"}
          </Button>

          <Button 
            onClick={() => navigate(`/tutor/courses/edit/${id}`)}   
            color="blue" 
            variant="contained"
          >
           Edit Course
          </Button>
             </div>
            </div>
            
            <div className="flex-1 p-10">
              <img src="" alt="" />
              <div className="flex justify-center">
                <CreateLesson course={course}/>
              </div>
              {course?.lessons?.length ? (
                <>
                  <h1 className="text-amber-500 drop-shadow-sm  nexa-font text-start text-xl md:text-1xl ml-3 mt-10 mb-10 font-black">
                    View Lessons
                  </h1>
                </>
              ) : null}
              
              <ViewLesson />
              {selectedLesson && (
  <div className="mt-5">
    <h2 className="text-white text-2xl">{selectedLesson.title}</h2>
    <p className="text-gray-400">{selectedLesson.description}</p>
    <div className="mt-5">
      <video
        controls
        className="w-full rounded-lg shadow-lg"
        src={selectedLesson.videoURL} // Display the fetched video URL here
      >
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
)}
            </div>
          </div>
        </>
      )}
    </>
  );
}
