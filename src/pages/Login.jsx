import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSignInAPI } from '../api/user'
import { setUser } from '../feautures/userSlice'

const Login = () => {

  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const accessedPrivate = searchParams.get("private");
  const fromLocation = searchParams.get("from");
  const sessionExpired = searchParams.get("expired");
  const newUser = searchParams.get("new");
  const logout = searchParams.get("logout");

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
    if (newUser) {
      toast.dismiss();
      toast.success("Welcome to Brain Booster! Please Login", {
        duration: 2000,
      });
    }
    if (logout) {
      toast.dismiss();
      toast.success("Come Back Soon!", {
        icon: "😪",
        duration: 4000,
      });
    }
    if (accessedPrivate) {
      toast.dismiss();
      toast.error("Please Login to continue");
    }
    if (sessionExpired) {
      toast.dismiss();
      toast.error("Session timeout! Please Login again");
    }
  }, []);

  // Handle Form Submission

  const handleSignIn = (e) => {
    e.preventDefault();
    userSignInAPI(formValues)
      .then((response) => {
        localStorage.setItem("isAuth", true);
        toast.success(
          `Hey ${response.data.user.name}, Welcome back to Brain Booster!`,
          {
            duration: 6000,
          }
        );
        dispatch(
          setUser({ ...response.data?.user, userId: response.data.user._id })
        );
        if (fromLocation) {
          return navigate(fromLocation);
        }
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.errors?.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl w-full flex">
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-green-600">Login to Dive in</h1>
        <div className="h-1 w-38 bg-green-600 my-4" />
        <form className="space-y-4">
          <div>
            <label htmlFor="user-id" className="block text-sm font-medium text-gray-700">
              E-MAIL
            </label>
            <input 
            id="email" 
            name='email'
            type='email'
            placeholder="Enter your email" 
            className="mt-1"
            onChange={(e) => 
            setFormValues({
              ...formValues,
              email: e.target.value
            })
            } 
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              PASSWORD
            </label>
            <input 
            id="password"
            name='password' 
            type="password" 
            placeholder="Enter your password" 
            className="mt-1" 
            onChange={(e) =>
              setFormValues({
                ...formValues,
                password: e.target.value,
              })
            }
            />
          </div>
          <div className={`flex justify-center ${error ? '' : 'hidden'}`}>
              <span className="text-red-400 text-center font-bold nexa-font">
                {error}
              </span>
            </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div id="remember-me" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember Me
              </label>
            </div>
            <Link href="#" className="text-sm text-green-600 hover:underline" prefetch={false}>
              Forgot password?
            </Link>
          </div>
          <button 
          className="w-full h-8 bg-green-600 text-white rounded-lg"
          onClick={handleSignIn}
          >Login</button>
          <p className='text-center'>Eager to open your mind to fresh ideas?</p>
          <Link to="/signup" className="block text-sm text-center text-green-600 hover:underline" prefetch={false}>
              Create an Account.
            </Link>
        </form>
      </div>
      <div className="relative w-1/2">
        <div className="absolute inset-0 bg-white bg-opacity-50 flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-extrabold text-gray-700 mb-2">BRAIN BOOSTER...</h3>
          <p className='text-gray-500 font-normal ml-5 mr-5'>What is BRAIN BOOSTER? An innovative E-learning platform designed to provide engaging educational experiences. It offers a wide range of courses across various subjects, tailored to enhance learners' skills.</p>
        </div>
        <img src="src\assets\login-page-img.webp" alt="Background" className="object-cover w-full h-full" />
      </div>
    </div>
  </div>

  )
}

export default Login
