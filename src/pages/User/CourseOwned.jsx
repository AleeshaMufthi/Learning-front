import { useEffect, useState } from "react";
import ProfileLayout from "../../components/user/ProfileLayout";
import Loading from "../../components/common/Loading";
import { Badge, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getUserEnrolledCoursesAPI } from "../../api/user";
import { addReviewAPI, getReviewAPI } from "../../api/user";
import Pagination from "../../components/common/Pagination";

export default function CourseOwned() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState({});
  const [rating, setRating] = useState({});
  const [reviewText, setReviewText] = useState({});
  const [feedback, setFeedback] = useState({ error: "", success: "" });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const { data: coursesData } = await getUserEnrolledCoursesAPI();
        setCourses(coursesData.data);
        console.log(coursesData.data.length, 'hgiuxysgcusyhd');
        
        setTotal(coursesData.data.length)
        const reviewsData = {};
        for (const course of coursesData.data) {
          const { data: courseReviews } = await getReviewAPI(course._id);
          // Assuming data.hasReviewed is coming from the backend
          reviewsData[course._id] = { 
            reviews: courseReviews.reviews,
            hasReviewed: courseReviews.hasReviewed, // Directly use hasReviewed from the backend
          };
          console.log(courseReviews.reviews, 'reviewsssss');
          console.log(courseReviews.hasReviewed, 'has reviewewed');
        }
        setReviews(reviewsData);
      } catch (err) {
        setFeedback({ error: "Failed to load courses or reviews", success: "" });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCourses();
  }, []);

  const handleSubmitReview = async (e, courseId) => {
    e.preventDefault();
    if (!rating[courseId] || rating[courseId] < 1 || rating[courseId] > 5) {
      setFeedback({ error: "Rating must be between 1 and 5", success: "" });
      return;
    }

    try {
      const newReview = { rating: rating[courseId], reviewText: reviewText[courseId] };
      const { data } = await addReviewAPI(courseId, newReview);
      console.log(data, 'dataaaaaaa');
      
      if (data.hasReviewed) {
        setFeedback({ error: "You have already reviewed this course", success: "" });
      } else {
        setFeedback({ error: "", success: data.message });

        const { data: courseReviews } = await getReviewAPI(courseId);
        setReviews((prev) => ({ ...prev, [courseId]: courseReviews.data }));

        setRating((prev) => ({ ...prev, [courseId]: "" }));
        setReviewText((prev) => ({ ...prev, [courseId]: "" }));
      }
    } catch (err) {
      setFeedback({ error: "Failed to submit review", success: "" });
    }
  };

  return (
    <ProfileLayout>
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ratings and Reviews</h2>
        <p className="mt-2 text-lg text-gray-600">
          Give feedback for the courses you have enrolled in
        </p>
      </div>

      <div className="mt-16">
        {isLoading ? (
          <Loading />
        ) : courses.length ? (
          <div className="flex flex-col gap-4">
            {courses.map((course) => (
              <div key={course._id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-40 rounded-lg object-cover"
                    />
                    <div className="ml-4">
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-500">{course.tagline}</p>
                    </div>
                  </div>
                  <Button onClick={() => navigate(`/courses/enrolled/${course._id}`)}>
                    View Course
                  </Button>
                </div>

                <div className="mt-4">
                {reviews[course._id]?.hasReviewed ? (
                     <div>
 
                     <p>Your review: {reviews[course._id]?.reviews[0]?.reviewText}</p>
                     <p>Rating: {reviews[course._id]?.reviews[0]?.rating}</p> {/* Display the rating */}
                     </div>
                    ) : (
                    <form
                      onSubmit={(e) => handleSubmitReview(e, course._id)}
                      className="space-y-2"
                    >
                      <div>
                        <label className="block">
                          Rating (1-5):
                          <input
                            type="number"
                            value={rating[course._id] || ""}
                            onChange={(e) =>
                              setRating((prev) => ({ ...prev, [course._id]: e.target.value }))
                            }
                            min="1"
                            max="5"
                            required
                            className="mt-1 block w-full border rounded px-2 py-1"
                          />
                        </label>
                      </div>
                      <div>
                        <label className="block">
                          Review:
                          <textarea
                            value={reviewText[course._id] || ""}
                            onChange={(e) =>
                              setReviewText((prev) => ({
                                ...prev,
                                [course._id]: e.target.value,
                              }))
                            }
                            required
                            className="mt-1 block w-full border rounded px-2 py-1"
                          />
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                            {feedback.error && <p className="text-red-600">{feedback.error}</p>}
                            {feedback.success && <p className="text-green-600">{feedback.success}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't enrolled in any courses yet.</p>
        )}
      </div>
    </div>
              {/* Pagination */}
              <div className="mt-10">
              <Pagination
                page={page}
                total={total} // Pass total pages
                limit={limit}
                setPage={(action) => {
                 if (action === "prev") setPage((prev) => Math.max(prev - 1, 1));
                    else if (action === "next")
                  setPage((prev) => Math.min(prev + 1, Math.ceil(total / limit)));
                  else setPage(action);
                }}
              />
              </div>

  </ProfileLayout>

  );
}