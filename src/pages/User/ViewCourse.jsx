import { useState, useEffect } from "react";
import { getCourseEnrolledDetailsAPI } from "../../api/user";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLessonDetailsAPI } from "../../api/common";
import timeAgo from "../../utils/timeAgo";
import HorizontalRule from "../../components/common/HorizontalRule";
import { ChevronUpIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { Disclosure } from "@headlessui/react";

export default function ViewCourse() {
    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [formattedDate, setFormattedDate] = useState({});
    const [lesson, setLesson] = useState("");
    const [formatVideo, setFormatVideo] = useState(true);
    const params = useParams();
    const myCallback = () => console.log("Video has ended");
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const courseDetails = await getCourseEnrolledDetailsAPI(params.id);
        console.log(courseDetails, "courseDetailssssss");
        
        if (!courseDetails) navigate("/courses/params.id");
        setCourse(courseDetails.data.data);
        console.log(courseDetails.data.data);
        setTimeout(() => setIsLoading(false), 1000);
      })();
    }, []);

    useEffect(() => {
      if (course?.lessons?.length) {
        playLesson(course.lessons[0]._id);
      }
    }, [course._id]);

    // const playLesson = (lessonId) => {
    //   getLessonDetailsAPI(lessonId).then((response) => {
    //     setLesson(response.data.lesson);
    //     setFormatVideo(response.data.lesson?.videoFormat);
    //   });
    // };
    const playLesson = (lessonId) => {
      getLessonDetailsAPI(lessonId).then((response) => {
        const lessonData = response.data.lesson;
        setLesson({
          ...lessonData,
          videoURL: lessonData.file, // Use the accessible file URL for playback
        });
        setFormatVideo(lessonData?.videoFormat);
      });
    };
    

    useEffect(() => {
      const courseDate = new Date(course.createdAt).toDateString();
      const courseTimeAgo = timeAgo(course.createdAt);
      setFormattedDate({ timeAgo: courseTimeAgo, createdAt: courseDate });
    }, [course.createdAt]);
    
    return (
<>
  {/* Hero Section */}
  <div className="hero-section bg-gradient-to-r from-purple-500 to-indigo-400 text-white py-10 px-6">
    <div className="container mx-auto text-center">
      <h1 className="text-3xl md:text-4xl font-bold">
        Complete All Lessons to Unlock Your Quiz and Certificate!
      </h1>
      <p className="text-lg mt-4">
        Once you've finished watching all the lessons, you can take the quiz to test your knowledge and earn your certificate of achievement.
      </p>
     
    </div>
  </div>

  {/* Main Content */}
  <div className="flex flex-col md:flex-row container mx-auto py-10">
    {/* Left Section */}
    <div className="md:w-3/5 px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">{course.title}</h2>
        <p className="text-md text-gray-500 mt-2">{course.tagline}</p>
        <div className="mt-6">
          {formatVideo !== "pdf" ? (
            <video
              className="w-full rounded-lg shadow-md"
              controls
              src={lesson.videoURL || lesson.file}
              type={`video/${lesson.videoFormat || "mp4"}`}
              controlsList="nodownload"
            />
          ) : (
            <object
              data={lesson.videoURL}
              type="application/pdf"
              className="w-full rounded-lg shadow-md"
              height="800px"
            >
              <p>
                Alternative text - <a href={lesson.videoURL}>View the PDF</a>
              </p>
            </object>
          )}
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="md:w-2/5 px-4 mt-10 md:mt-0">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800">
          Total Lessons - {course?.lessons?.length}
        </h3>
        <div className="mt-4">
          {course?.lessons ? (
            course.lessons.map((lesson, index) => (
              <Disclosure as="div" key={lesson._id} className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100 px-4 py-4 text-sm font-medium text-indigo-800 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                      <span>
                        {index + 1}. {lesson.title}
                      </span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } h-5 w-5 text-indigo-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel
                      className="px-4 pt-4 pb-2 text-gray-600 hover:text-blue-500 cursor-pointer"
                      onClick={() => playLesson(lesson._id)}
                    >
                      <div className="flex justify-between">
                        <span>{lesson.description}</span>
                        <span>{timeAgo(lesson.createdAt)}</span>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))
          ) : (
            <p>No Lessons Found</p>
          )}
        </div>
        
       <div className="mt-5">
       <Link
        to = { `/quiz/${course._id}`}  // Pass the course ID as part of the URL
        className="px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md shadow-md w-full"
        >
          Go to Quiz
        </Link>
       </div>
      </div>
    </div>
  </div>
</>

    );
  }
  