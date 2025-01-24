import { useEffect, useState } from "react";
import { Badge, Button, Card } from "flowbite-react";
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
import AddQuiz from "../../components/tutor/AddQuiz";
import { getQuizByCourseIdAPI } from "../../api/tutor";

export default function CourseLesson() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLesson, setSelectedLesson] = useState(null);
 
    const [quizzes, setQuizzes] = useState([]);

    
    // useEffect(() => {
    //   setIsLoading(true);
    //   getCourseDetailsAPI(id).then((response) => {
    //     const course = response.data?.data;
    //     setCourse(course);
    //     setTimeout(() => {
    //       setIsLoading(false);
    //     }, 1000);
    //   });
    // }, []);

    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await getCourseDetailsAPI(id);
          const courseData = response.data?.data;
          setCourse(courseData);
    
          const quizResponse = await getQuizByCourseIdAPI(id);
          console.log(quizResponse, 'ppppppppppppppppppppppppppppp');
          const quizzes = quizResponse.data?.data || [];
          const allQuestions = quizzes.flatMap(quiz => quiz.questions || []);

      console.log(allQuestions, "0000000000000000000000000");
      setQuizzes(allQuestions);
           // Adjust based on API response structure
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchData();
    }, [id]);
    

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
            description={`Manage Your "${course?.title}" Course`}
          />
          <HorizontalRule />
          <div className="flex flex-wrap gap-5 p-3">
            {/* Left Section */}
            <div className="flex-1 p-5 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                src={course?.thumbnail}
                className="w-full rounded-lg"
                alt="Course Thumbnail"
              />
              <h1 className="text-white mt-3 text-center text-3xl">{course.title}</h1>
              <p className="text-gray-400 mt-5">{course.tagline}</p>
              <p className="text-gray-400 mt-2">{course.about}</p>

              <div className="flex mt-5 justify-between">
                <Button onClick={handleDeleteCourse} color="red" disabled={isLoading}>
                  {isLoading ? "Deleting..." : "Delete Course"}
                </Button>
                <Button onClick={() => navigate(`/tutor/courses/edit/${id}`)} color="blue">
                  Edit Course
                </Button>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex-1">
              <div className="flex gap-5 mb-3">
                <CreateLesson course={course} />
                <AddQuiz course={course} />
              </div>
              <p className="mb-10">Add 5 Quiz Questions based on the courses</p>
              {course?.lessons?.length > 0 && (
                <>
                  <h1 className="text-amber-500 text-xl font-bold mb-5">Lessons</h1>
                  <div className="grid gap-5">
                    {course.lessons.map((lesson) => (
                      <Card key={lesson._id} className="relative">
                        <h2 className="text-lg font-bold text-white">{lesson.title}</h2>
                        <p className="text-gray-500">{lesson.description}</p>
                        <div className="flex gap-3 mt-5">
                          {/* <Button
                            color="green"
                            onClick={() => setSelectedLesson(lesson)}
                          >
                            View Lesson
                          </Button> */}
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {selectedLesson && (
                <div className="mt-10">
                  <h2 className="text-white text-2xl">{selectedLesson.title}</h2>
                  <p className="text-gray-400">{selectedLesson.description}</p>
                  <video
                    controls
                    className="w-full rounded-lg shadow-lg mt-5"
                    src={selectedLesson.videoURL}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              <div className="mt-10">
                <h1 className="text-amber-500 text-xl font-bold mb-5">Quizzes</h1>
                {quizzes.length > 0 ? (
                  quizzes.map((quiz) => (
                    <Card key={quiz._id} className="bg-gray-100 dark:bg-gray-700">
                      <h2 className="text-blue-500 font-bold">Qs: {quiz.question}</h2>
                      <p className="text-gray-500">Ans: {quiz.correctAnswer}</p>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-400">No quizzes added yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
