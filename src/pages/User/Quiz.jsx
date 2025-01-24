import React, { useEffect, useState } from 'react';
import { getQuizDetailsAPI } from '../../api/user';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { createCertificateAPI } from '../../api/user';

const Quiz = () => {

  const { courseId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizDetailsAPI(courseId);
        if (response.data.success) {
          const courseQuizzes = response.data.data.filter(
            (quiz) => quiz.courseId._id === courseId
          );
          setQuizzes(courseQuizzes);

          // Initialize answers array with null values for all questions
          const initialAnswers = courseQuizzes.flatMap((quiz) =>
            Array(quiz.questions.length).fill(null)
          );
          setAnswers(initialAnswers);
          setTotalQuestions(courseQuizzes.reduce((sum, quiz) => sum + quiz.questions.length, 0));
        } else {
          setError('Failed to load quizzes');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  const handleClaimCertificate = async () => {
    try {
      const totalMarks = totalQuestions * 10;
      const obtainedMarks = totalScore * 10;
      const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);
      const data = {
        userId: user.userId,
        user: user.name,
        courseId,
        score: totalScore,
        totalMarks,
        percentage
      };
     console.log(data, 'dataa for handleClaimCertificate');
     
      const response = await createCertificateAPI(data);
      console.log(response, 'responseeeeeeee');
      
      if (response.status == 201) {
        alert("Certificate claimed successfully!");
        navigate("/certificates"); // Redirect to certificates page
      }
    } catch (error) {
      console.error("Error claiming certificate:", error.message);
      alert("Failed to claim certificate. Please try again.");
    }
  };

  const handleAnswerChange = (quizIndex, questionIndex, answer) => {
    const globalIndex = quizzes
      .slice(0, quizIndex)
      .reduce((sum, quiz) => sum + quiz.questions.length, 0) + questionIndex;
    const updatedAnswers = [...answers];
    updatedAnswers[globalIndex] = answer;
    setAnswers(updatedAnswers);
  };

  const handleSubmitAll = () => {
    console.log("Submit button clicked");
    console.log("Quizzes:", quizzes);
    console.log("Answers:", answers);
    let score = 0;
    quizzes.forEach((quiz, quizIndex) => {
      quiz.questions.forEach((question, questionIndex) => {
        const globalIndex = quizzes
          .slice(0, quizIndex)
          .reduce((sum, quiz) => sum + quiz.questions.length, 0) + questionIndex;

        if (answers[globalIndex] === question.correctAnswer) {
          score += 1;
        }
      });
    });
    setTotalScore(score);
    setShowResults(true);
  };

  const renderResults = () => {
    const totalMarks = totalQuestions * 10;
    const obtainedMarks = totalScore * 10;
    const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overall Quiz Results</h2>
       <div className='text-md font-semibold'>
       <p>Total Questions: {totalQuestions}</p>
        <p>Correct Answers: {totalScore}</p>
        <p>Total Marks: {obtainedMarks} / {totalMarks}</p>
        <p>Your Score: {percentage}%</p>
       </div>
        {percentage >= 75 ? (
          <div>
            <p className='text-xl mt-3 font-bold text-green-950'>Congratulations! You passed the quizzes. 🎉</p>
            <button  onClick={handleClaimCertificate} className='text-lg font-bold bg-gray-500 hover:bg-gray-600 rounded py-2 px-5 mt-3'>Claim your certificate</button>
          </div>
          
        ) : (
          <p className='text-lg font-bold text-red-950'>Review the material and try again. 👍</p>
        )}
      </div>

    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
      <div className="max-w-6xl mx-auto p-6">
        {showResults ? (
          renderResults()
        ) : (
          <div>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
              <h1 id="quiz-heading" className="text-4xl font-bold text-white text-center mb-6">
                Test Your Knowledge!
              </h1>
              <p className="text-lg text-white text-center">
                Put your skills to the test with these challenging questions.
                <br />
                Can you conquer them all and earn your certificate?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {quizzes.map((quiz, quizIndex) => (
                <div key={quiz._id} className="p-6 bg-gray-100 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                    {quiz.title}
                  </h2>
                  {quiz.questions.map((question, questionIndex) => (
                    <div
                      key={question._id}
                      className="p-4 bg-white rounded-lg shadow-md mb-6"
                    >
                      <h3 className="text-lg font-semibold mb-3 text-gray-800">
                        {questionIndex + 1}. {question.question}
                      </h3>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="block text-gray-600 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`quiz-${quizIndex}-question-${questionIndex}`}
                              value={option}
                              checked={
                                answers[
                                  quizzes
                                    .slice(0, quizIndex)
                                    .reduce((sum, q) => sum + q.questions.length, 0) +
                                  questionIndex
                                ] === option
                              }
                              onChange={() =>
                                handleAnswerChange(quizIndex, questionIndex, option)
                              }
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={handleSubmitAll}
                className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow-md"
              >
                Submit All Quizzes
              </button>
            </div>
          </div>
        )}
      </div>

  )
}

export default Quiz;