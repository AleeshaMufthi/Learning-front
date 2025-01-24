import { useState } from "react";
import { Button, TextInput, Textarea, Modal } from "flowbite-react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { createQuizAPI } from "../../api/tutor";

export default function AddQuiz({ course }) {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };

  const handleSubmit = async () => {
    if (!quizTitle || questions.some(q => !q.question || q.options.some(o => !o) || !q.correctAnswer)) {
      toast.error("Please complete all fields before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = { courseId: id, title: quizTitle, questions };
      await createQuizAPI(payload);
      toast.success("Quiz added successfully!");
      setIsOpen(false); // Close modal
    } catch (error) {
      console.error("Error creating quiz:", error);
      toast.error("Failed to create quiz. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} color="blue">
        Add Quiz
      </Button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          Add Quiz for {course?.title}
        </Modal.Header>
        <Modal.Body>
          <TextInput
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="mb-5"
          />
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-5 p-5 border rounded-lg bg-gray-100">
              <Textarea
                placeholder={`Question ${qIndex + 1}`}
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <div className="mt-3 grid grid-cols-2 gap-3">
                {q.options.map((option, optionIndex) => (
                  <TextInput
                    key={optionIndex}
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optionIndex, e.target.value)
                    }
                  />
                ))}
              </div>
              <TextInput
                className="mt-3"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(qIndex, e.target.value)}
              />
            </div>
          ))}
          <Button
            className="mb-3"
            onClick={addQuestion}
            color="blue"
            disabled={isSubmitting}
          >
            Add Another Question
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color="green" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Quiz"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}