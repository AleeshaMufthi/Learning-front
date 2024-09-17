import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Otp from "../../components/common/Otp";
import { tutorOtpSendAPI, tutorSignUpAPI } from "../../api/tutor";
import LoginPageImg from '../../assets/login-page-img.webp'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Toaster, toast } from "react-hot-toast";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short!')
    .required('Full name is required'),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number is not valid")
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function SignUp() {
  const [otpValues, setOtpValues] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(null);
  const [otpSection, setOtpSection] = useState(false);

  const navigate = useNavigate();

  const handleOtpChange = (otp) => {
    setOtpValues(otp);
  };

  const handleOtp = (values, { setSubmitting }) => {
    setIsLoading(true);
    tutorOtpSendAPI(values)
      .then((data) => {
        console.log(data);
        setTimer(60);
        setOtpSection(true);
        setTimeout(() => {
          setIsLoading(false);
          setSubmitting(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error in handleOtp", err);
        setError(err.message?.data?.errors?.message || "Email or phone aldready taken");
        setIsLoading(false);
        setSubmitting(false);
      });
  };

  const handleResendOtp = (values) => {
    setIsLoading(true);
    tutorOtpSendAPI(values)
      .then((data) => {
        console.log("OTP resent", data);
        setTimer(60);  // Reset the timer to 60 seconds
        setIsLoading(false);
        toast.success("OTP resent successfully!");
      })
      .catch((err) => {
        console.error("Error in resending OTP", err);
        setError("Failed to resend OTP.");
        setIsLoading(false);
      });
  };

  const handleSignUp = (values, { setSubmitting }) => {
    if (!otpValues) {
      setError("Please enter OTP.");
      setSubmitting(false);
      return;
    }
    setIsLoading(true);
    const otp = otpValues.join("");
    const formValuesWithOtp = {
      ...values,
      otp,
    };
    tutorSignUpAPI(formValuesWithOtp)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          setIsLoading(false);
          navigate("../signin?new=true");
        }, 1000);
      })
      .catch((err) => {
        console.error("Error in handleSignUp", err);
        toast.error("Invalid OTP");
        const errorMessage = err.response?.data?.message || "An error occurred";
        setIsLoading(false);
        setSubmitting(false);
      });
  };

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setTimer(null);
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex">
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
            Create a New Account
          </h1>
          <div className="h-1 w-25 bg-gray-800 my-4 mx-auto" />
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={(values, { setSubmitting }) => {
              if (!otpSection) {
                handleOtp(values, { setSubmitting });
              } else {
                handleSignUp(values, { setSubmitting });
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form className="space-y-4">
                {!otpSection && (
                  <>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                      />
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div className="flex justify-center mt-2">
                      <span className="text-red-400 text-center font-bold">
                        {error}
                      </span>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full mt-2 justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="#E5E7EB" />
                              <path fill="currentColor" />
                            </svg>
                            Processing
                          </>
                        ) : (
                          "Send OTP"
                        )}
                      </button>
                    </div>
                  </>
                )}
                {otpSection && (
                  <div>
                    <Otp otp={otpValues} onOtpChange={handleOtpChange} />
        
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full mt-2 justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                      >
                        {isLoading ? (
                          <>
                            <svg
                              aria-hidden="true"
                              role="status"
                              className="inline w-4 h-4 mr-3 text-white animate-spin"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path fill="#E5E7EB" />
                              <path fill="currentColor" />
                            </svg>
                            Processing
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button
                        type="button"
                        onClick={() => handleResendOtp(values)}
                        disabled={isLoading || timer > 0}
                        className="text-sm text-green-600 hover:text-green-700 focus:outline-none"
                      >
                        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <div className="relative w-1/2">
      <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-extrabold text-gray-700 mb-2">
          BRAIN BOOSTER...
        </h3>
        <p className="text-gray-500 font-normal mx-5">
          What is BRAIN BOOSTER? An innovative E-learning platform designed to
          provide engaging educational experiences. It offers a wide range of
          courses across various subjects, tailored to enhance learners' skills.
        </p>
      </div>
      <img
        src={LoginPageImg}
        alt="Background"
        className="object-cover w-full h-full"
      />
    </div>
  </div>
  <Toaster />
</div>      

  );
}
