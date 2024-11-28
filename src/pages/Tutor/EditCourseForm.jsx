import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetailsAPI, updateCourseAPI } from '../../api/tutor';
import toast from 'react-hot-toast';
import Loading from '../../components/common/Loading';
import { Button } from 'flowbite-react';

export default function EditCourseForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({  
    title: '',
    tagline: '',
    about: '',
    price: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await getCourseDetailsAPI(id);

        const courseData = response.data.data || response.data;
        setCourse({
          title: courseData.title,
          tagline: courseData.tagline,
          about: courseData.about,
          price: courseData.price,
        });

        console.log("Course data set in state:", {
          title: courseData.title,
          tagline: courseData.tagline,
          about: courseData.about,
          price: courseData.price,
        });
        
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to load course details.");
      } finally {
        setIsLoading(false); 
      }
    }

    fetchCourseDetails();
  }, [id]);

  // useEffect(() => {
  //   getCourseDetailsAPI(id).then((response) => {
  //     setCourse({  title: response.data.title,
  //       tagline: response.data.tagline,
  //       about: response.data.about,
  //       price: response.data.price,});
  //     setIsLoading(false);
  //   });
  // }, [id]);

  const handleInputChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleUpdateCourse = async () => { 
    try {

      setIsLoading(true);
      await updateCourseAPI(id, course); 
      toast.success("Course updated successfully!");
      navigate(`/tutor/courses/${id}`);
    } catch (error) {
      console.error("Error updating course:", error); // Log any caught errors
      toast.error("Failed to update course. Please try again.");
    } finally {
      setIsLoading(false);
    }
};

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Edit Course</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={course.title || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-5"
          />

          <label className="block mb-2">Tagline:</label>
          <input
            type="text"
            name="tagline"
            value={course.tagline || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-5"
          />

          <label className="block mb-2">About:</label>
          <textarea
            name="about"
            value={course.about || ''}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mb-5"
          />

          {/* Add any other course fields here */}

          <Button onClick={handleUpdateCourse} color="blue" variant="contained">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      )}
    </div>
  );
}