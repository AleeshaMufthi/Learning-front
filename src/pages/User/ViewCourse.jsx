import { useState, useEffect } from "react";
import { getCourseEnrolledDetailsAPI } from "../../api/user";
import { useNavigate, useParams } from "react-router-dom";
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
        <div className="flex nexa-font flex-col md:flex-row">
          <div className="md:w-3/5 mx-3">
            <div className="p-5 mt-5">
              <div className="ml-5 flex justify-between">
                <div>
                  <h3 className="text-3xl">{course.title}</h3>
                  <h3 className="text-md text-gray-500">{course.tagline}</h3>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xs text-gray-500">
                    {formattedDate?.createdAt}
                  </h3>
                  <h3 className="text-xs text-gray-500">
                    {formattedDate?.timeAgo}
                  </h3>
                </div>
              </div>
              <HorizontalRule />
              {formatVideo != "pdf" ? (
                <div className="flex justify-center pb-4 h-98">
                  <video
                    className="w-full rounded-lg h-full"
                    controls
                    onEnded={() => myCallback()}
                    src={lesson.videoURL|| lesson.file}
                    type={`video/${lesson.videoFormat || "mp4"}`} 
                    controlsList="nodownload"
                  ></video>
                </div>
              ) : (
                
                <div className="flex justify-center pb-4" height="800px">
                
                  {/* <iframe
                    src={lesson.videoURL}
                    className="w-full rounded-lg h-full"
                  ></iframe> */}
                  <object
                    data={lesson.videoURL}
                    type="application/pdf"
                    className="w-full rounded-lg h-full"
                    height="800px"
                  >
                    <p>
                      Alternative text - include a link{" "}
                      <a href={lesson.videoURL}>to the PDF!</a>
                    </p>
                  </object>
                </div>
              )}
              <div className="ml-3 flex justify-between">
                <h1 className="text-3xl">{lesson.title}</h1>
                <span className="text-xl">{lesson.description}</span>
              </div>
              <HorizontalRule />
              <div className="text-justify">
                <span className="text-justify">{course.about}</span>
              </div>
            </div>
            {/* left section 1 */}
          
          
          </div>
          {/* Right Lessons section  */}
          <div className="md:w-2/5 mx-3 mt-3 md:mt-20 md:mr-10">
            <div className="rounded-2xl bg-white py-5 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-16">
              <div className="px-5">
                <div className="md:ml-5 flex justify-between">
                  <div>
                    <h3 className="md:text-2xl">
                      Total Lessons - {course?.lessons?.length}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xs text-gray-500">
                      {formattedDate.createdAt}
                    </h3>
                    <h3 className="text-xs text-gray-500 text-end">
                      {formattedDate.timeAgo} ago
                    </h3>
                  </div>
                </div>
                <HorizontalRule />
                <div className="w-full md:px-4">
                  <div className="mx-auto w-full rounded-2xl bg-white">
                    {course?.lessons ? (
                      course.lessons.map((lesson, index) => (
                        <Disclosure as="div" className="mt-2" key={lesson._id}>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-indigo-100  px-4 py-4 text-left text-sm font-medium text-purple-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <span>
                                  {index + 1}. {lesson.title}
                                </span>
                                <div className="flex items-center gap-2">
                                  <div>10:00</div>
                                  <ChevronUpIcon
                                    className={`${
                                      open ? "transform" : "rotate-180"
                                    } h-5 w-5 text-purple-500`}
                                  />
                                </div>
                              </Disclosure.Button>
                              <Disclosure.Panel
                                className="px-4 pt-4 pb-2 text-gray-500 flex justify-between hover:text-blue-500 hover:cursor-alias"
                                onClick={() => playLesson(lesson._id)}
                              >
                                <div className="flex justify-center">
                                  <PlayCircleIcon className="w-5 mr-2 hover:rotate-180 duration-300" />
                                  <span className="line-clamp-1">
                                    {lesson.description}
                                  </span>
                                </div>
                                <div>{timeAgo(lesson.createdAt)}</div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))
                    ) : (
                      <>No Course Found</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  