import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { userSignInAPI } from "../../api/user";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../feautures/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import GoogleSignIn from "./GoogleSignIn";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


export default function SignIn() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const accessedPrivate = searchParams.get("private");
    const fromLocation = searchParams.get("from");
    const sessionExpired = searchParams.get("expired");
    const newUser = searchParams.get("new");
    const logout = searchParams.get("logout");

    useEffect(() => {
      if (user.loggedIn) {
        navigate("/user");
      }
      if (newUser) {
        toast.dismiss();
        toast.success("Welcome to Brain Booster!", {
          duration: 2000,
        });
      }
      if (logout) {
        toast.dismiss();
        toast.success("Come Back Soon!", {
          duration: 4000,
        });
      }
      if (accessedPrivate) {
        console.log(accessedPrivate);
        toast.dismiss();
        toast.error("Please Login to continue");
      }
      if (sessionExpired) {
        toast.dismiss();
        toast.error("Session timeout! Please Login again");
      }
    }, [navigate, user.loggedIn, newUser, logout, accessedPrivate, sessionExpired]);

    // form validation
    const validationSchema = Yup.object().shape({
      email: Yup.string()
      .email("Invalid Email address")
      .required("Email is required"),
      password: Yup.string()
      .min(8,"Password must be atleast 8 charecters")
      .required("Password is required")
    })

    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = (values, { setSubmitting, setFieldError }) => {
      userSignInAPI(values)
        .then((response) => {
          localStorage.setItem("isAuth", true);
          toast.success(
            `Hey ${response.data.user.name}, Welcome back To Brain Booster!`,
            {
              duration: 6000,
            }
          );
          dispatch(
            setUser({ ...response.data?.user, userId: response.data.user._id })
          );
          if (fromLocation) {
           navigate(fromLocation);
          }else{
            navigate("/user");
          }
         
        })
        .catch((err) => {
          console.log(err);
          setFieldError("password", err?.response?.data?.errors?.message); // Setting error for password or general
        })
        .finally(() => {
          setSubmitting(false);
        });
    };

    return (
      <>
      <div>
        <Toaster />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full flex">
          <div className="w-1/2 p-8">
            <div className="flex justify-center">
            </div>
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-4">
              Log In to Dive In
            </h1>
            <div className="h-1 w-25 bg-gray-800 my-4 mx-auto" />

            <Formik 
            initialValues={{email: "", password: ""}}
            validationSchema={validationSchema}
            onSubmit={handleSignIn}
            >

            {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiFillEye className="text-gray-700" size={20} />
                  ) : (
                    <AiFillEyeInvisible className="text-gray-700" size={20} />
                  )}
                </div>

                  </div>

                  <div className="text-sm mt-2">
                    <Link
                      to="/forgetPassword"
                      className="font-semibold text-green-800 hover:text-green-600"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-5 justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                    >
                      {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
            </Form>
              )}
            </Formik>
            <div className="pt-2 text-center">
            <GoogleSignIn />
            </div>
            <p className="mt-10 text-center text-sm text-gray-500">
              Eager to learn new things!!!
              <Link
                to="/signup"
                className="font-semibold leading-6 text-green-800 hover:text-green-600"
              >
                Create An Account
              </Link>
            </p>
          </div>
          <div className="relative w-1/2">
            <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">
              <h3 className="text-lg font-extrabold text-gray-700 mb-2">
                BRAIN BOOSTER...
              </h3>
              <p className="text-gray-500 font-normal mx-5">
                What is BRAIN BOOSTER? An innovative E-learning platform designed
                to provide engaging educational experiences. It offers a wide
                range of courses across various subjects, tailored to enhance
                learners' skills.
              </p>
            </div>
            <img
              src="https://expandandthrive.com/wp-content/uploads/2022/01/test13.jpg"
              alt="Background"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </>
    );
  }
  