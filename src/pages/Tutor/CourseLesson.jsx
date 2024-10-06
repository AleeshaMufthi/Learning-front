import { useEffect, useState } from "react";
import { Badge } from "flowbite-react";
import CreateLesson from "../../components/tutor/CreateLesson";
import { Link, useParams } from "react-router-dom";
import { getCourseDetailsAPI } from "../../api/tutor";
import SectionTitle from "../../components/common/SectionTitle";

export default function CourseLesson() {
    const { id } = useParams();
    const [course, setCourse] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      setIsLoading(true);
      getCourseDetailsAPI(id).then((response) => {
        const course = response.data?.data;
        console.log(course);
        setCourse(course);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
    }, []);
    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SectionTitle
              title={course?.title}
              description={`Providing Learnt Course Management tool = Manage Your ${course?.title} course`}
            />
            <div className="flex nexa-font p-3">
              <div className="flex-1 p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img
                  src={course?.thumbnailURL}
                  className="w-125 card ml-10 rounded"
                  alt="alternate image"
                />
                <div className="mt-5 ml-10 flex gap-3 justify-center">
                  <Badge color="info" className="w-fit capitalize">
                    {course.category}
                  </Badge>
                  <Badge color="warning" className="w-fit capitalize">
                    {course.difficulty}
                  </Badge>
                </div>
                <h1 className="text-amber-500 text-3xl p-5">{course.title}</h1>
                <h3>{course.tagline}</h3>
                <h3 className="mt-5">Description -{course.about}</h3>
              </div>
              <div className="flex-1 p-10">
                <img src="" alt="" />
                <div className="flex justify-center">
                  <CreateLesson course={course} />
                </div>
                {course?.lessons?.length ? (
                  <>
                    <h1 className="text-amber-500 drop-shadow-sm  nexa-font text-start text-xl md:text-1xl ml-3 mt-10 mb-10 font-black">
                      View Lessons
                    </h1>
                  </>
                ) : null}
                <div
                  className={`flex ${
                    course?.lessons?.length ? "justify-center" : ""
                  } flex-col  gap-3 items-center h-30 mb-5`}
                >
                  {course?.lessons?.length ? (
                    course.lessons.map((lesson, index) => (
                      <Link
                        key={lesson._id}
                        className="flex justify-between items-center min-w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <div className="rounded">
                          <div>
                            <span className="text-red-300 mr-2">{index + 1}</span>
                            <span> - {lesson.title}</span>
                          </div>
                        </div>
                        <div>
                          <span>10:00</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-red-500 flex flex-col items-center gap-8 justify-center">
                      <div className="mt-10">
                        'No Lessons created for this Course'
                      </div>
                      <div>
                        <img
                          src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg?w=2000"
                          alt="image"
                          className="w-132.5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
  