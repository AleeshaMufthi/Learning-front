import { Button, Modal, Progress } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { createLessonAPI } from "../../api/tutor";
import * as yup from "yup"
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const LoadingFallback = ({ progress, message }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="w-96 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">{message}</h2>
      <div className="flex justify-center mb-4">
        <Loader2 className="w-12 h-12 animate-spin text-teal-500" />
      </div>
      <Progress value={progress} className="mb-4" />
      <p className="text-center text-gray-600">{progress.toFixed(0)}% Complete</p>
    </div>
  </div>
); 

const lessonSchema = yup.object({
    title: yup.string().required().trim().min(3).max(30),
    description: yup.string().required().min(5).max(50),
  });

  export default function CreateLesson({ course, setCourse }) {   
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();
    const {
      handleSubmit,
      register,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(lessonSchema),
    });

  const handleFileSelect = async (e) => {
    setError(null);
    const fileSizeInBytes = e.target.files[0].size;
    // const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
    // if (fileSizeInMB > 30) {
    //   return setError("file size exceeded 30Mb");
    // }
    setFileName(e.target.files[0].name);
  };
  const removeSelectedFile = async () => {
    setFileName(null);
  };
    
    const onSubmit = async (data) => {
      if (error) {
        console.log(error);
        return false;
      }

      setLoading(true); 
      setUploadProgress(0);
      setProcessing(false);

      const formData = new FormData(); // Declare formData inside onSubmit
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("lesson", Array.from(data.files)[0]); 
      formData.append("courseId", course._id);
      
      try {
        const response = await createLessonAPI(formData);
        setUploadProgress(100); 
        setProcessing(false);
        setIsOpen(false);

       
      if (setCourse) {
        const newLesson = response; // Adjust this based on your API response
        setCourse((prevCourse) => ({
          ...prevCourse,
          lessons: [...prevCourse.lessons, newLesson],
        }));
      }
      toast.success("Lesson created successfully", {
        duration: 6000,
      });
        navigate(`/tutor/courses/${course._id}`);
      } catch (err) {
        console.error(err);
        toast.error("Failed to create lesson.");
      } finally {
        setLoading(false);
      }
};
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)} color="blue">
          Add New Lesson
        </Button>
        <Modal
          dismissible={true}
          show={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-black">
            <Modal.Header>
              <span className="text-amber-500 nexa-font">
                {course.title} - Attach New Lesson
              </span>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-white">
                    Lesson No - {course.lessons.length + 1}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what
                    you share.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-300"
                      >
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-">
                          <input
                            type="text"
                            {...register("title")}
                            id="username"
                            autoComplete="username"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-400 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="lesson title"
                          />
                        </div>
                        <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                          {errors.title?.message}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-300"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          name="about"
                          id="about"
                          rows={3}
                          {...register("description")}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leaading-6"
                          defaultValue={""}
                        />
                      </div>
                    {loading && (
                      <LoadingFallback
                        progress={uploadProgress}
                        message={
                          processing
                            ? "Finalizing your lesson..."
                            : fileName
                            ? "Uploading Video..."
                            : "Adding Lesson..."
                        }
                      />
                    )}
                      <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                        {errors.description?.message}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about this lesson.
                      </p>
                    </div>
                    <div className="col-span-full">
                      {!fileName && (
                        <>
                          <label
                            htmlFor="file"
                            className="block text-sm font-medium leading-6 text-gray-300"
                          >
                            Upload File
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <PhotoIcon
                                className="mx-auto h-12 w-12 text-gray-300"
                                aria-hidden="true"
                              />
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span>Upload a Video</span>
                                  <input
                                    type="file"
                                    id="file-upload"
                                    name="file-upload"
                                    accept=".mp4, .heic, .mov, .pdf, .jpg, .jpeg , .avi , .wmv" // Allow specified file types
                                    {...register("files", 
                                      { onChange: handleFileSelect,
                                    })}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or Drag and Drop</p>
                              </div>
                              <p className="text-xs leading-5 text-gray-600">
                                MP4, HEIC, MOV, AVI, WMV, PDF, JPG OR JPEG
                              </p>
                            </div>
                            {errors.files && errors.files.message}
                          </div>
                        </>
                      )}
                      <span className="text-red-600">{error}</span>
                      {fileName && (
                        <div className="flex justify-between items-center bg-indigo-100 rounded-md mt-3 hover:bg-indigo-50">
                          <div className="nexa-font ml-3 p-2">{fileName}</div>
                          <div>
                            <XCircleIcon
                              className="w-6 mr-2 hover:cursor-pointer hover:text-red-300 hover:rotate-90 duration-200"
                              onClick={removeSelectedFile}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="flex justify-end">
              <Button color="blue" type="submit" disabled={loading}>
              {loading ? `Uploading...` : "Create Lesson"} 
              </Button>
              <Button color="blue" onClick={() => setIsOpen(!isOpen)} disabled={loading}>
                Go Back
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
  CreateLesson.propTypes = {
    course: PropTypes.object,
  };
  