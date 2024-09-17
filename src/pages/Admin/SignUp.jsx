import { useState } from "react";
import Logo from "../../components/common/Logo";
import Otp from "../../components/common/Otp";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminOtpSendAPI, adminSignUpAPI } from "../../api/admin";

export default function SignUp() {
    const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    const [otpValues, setOtpValues] = useState("");
    const handleOtpChange = (otp) => {
      setOtpValues(otp); // Update the otpValues state in the SignUp component
    };
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [otpSection, setOtpSection] = useState(false);
    const handleOtp = (e) => {
      setIsLoading(true);
      e.preventDefault();
      console.log("rafhath reached here");
      adminOtpSendAPI(formValues)
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            setIsLoading(false);
            setOtpSection(true);
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response?.data?.errors.message);
          console.log("error", err.response);
          setError(err.message?.data?.errors.message);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    };
    const handleSignUp = (e) => {
      setIsLoading(true);
      e.preventDefault();
      const otp = otpValues.join("");
      const formValuesWithOtp = {
        ...formValues,
        otp,
      }; // Add otpValues to the formValues object
      adminSignUpAPI(formValuesWithOtp)
        .then((data) => {
          console.log(data);
          setTimeout(() => {
            setIsLoading(false);
            navigate("../signin?new=true");
          }, 1000);
        })
        .catch((err) => {
          toast.error(err.response?.data?.errors.message);
          console.log("error", err.response);
          setError(err.message?.data?.errors.message);
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        });
    };
    return (
      <>
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
              <Logo size={1.4} admin />
            </div>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create Admin account
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              {!otpSection && (
                <div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full Name
                    </label>
                    <div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone Number
                    </label>
                    <div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="phone"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email Address
                    </label>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <div>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="current-password"
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-red-400 text-center fon-bold nexa-font">
                      {error}
                    </span>
                  </div>
                  <div>
                    <button
                      type="submit"
                      onClick={handleOtp}
                      disabled={isLoading}
                      className=" mt-5 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visisble:outline-offset-2 focus-visible:outline-indigo-600"
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
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Processing
                        </>
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>
                </div>
              )}
              {otpSection && (
                <div>
                  <Otp onOtpChange={handleOtpChange} />
                  <div>
                    <button
                      type="submit"
                      onClick={handleSignUp}
                      disabled={isLoading}
                      className=" mt-5 flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visisble:outline-offset-2 focus-visible:outline-indigo-600"
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
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="#E5E7EB"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentColor"
                            />
                          </svg>
                          Processing
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mt-5">
                      <span
                        onClick={() => {
                          setOtpSection(false), setIsLoading(false);
                        }}
                        className="block font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                      >
                        Back
                      </span>
                      <div className="text-sm">
                        <div className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                          Resend Otp
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
  