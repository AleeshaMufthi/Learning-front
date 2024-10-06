import { Toaster, toast } from "react-hot-toast";
import Logo from "../../components/common/Logo";
import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { adminSignInAPI } from "../../api/admin";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin } from "../../feautures/adminSlice";
import Navbar from "../../components/admin/Navbar";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


export default function SignIn() {
    const admin = useSelector((state) => state.admin);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const accessedPrivate = searchParams.get("private");
    const fromLocation = searchParams.get("from");
    const sessionExpired = searchParams.get("expired");
    const newAdmin = searchParams.get("new");
    const logout = searchParams.get("logout");
    useEffect(() => {
      if (admin.loggedIn) {
        navigate("/admin");
      }
      if (newAdmin) {
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
        console.log(accessedPrivate);
        toast.dismiss();
      }
      if (sessionExpired) {
        toast.dismiss();
        toast.error("Session timeout!,Please Login again");
      }
    }, []);
    const [formValues, setFormValues] = useState({
      email: "",
      password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const handleSignIn = (e) => {
      e.preventDefault();
      e.preventDefault();
      adminSignInAPI(formValues)
        .then((response) => {
          localStorage.setItem("isAdminAuth", true);
          toast.success(
            `Hey ${response.data.admin.name}, Welcome back To Brain Booster!`,
            {
              duration: 6000,
            }
          );
          dispatch(
            setAdmin({
              ...response.data?.admin,
              adminId: response.data.admin._id,
            })
          );
          if (fromLocation) {
            return navigate(fromLocation);
          }
          return navigate("/admin");
        })
        .catch((err) => {
          console.log(err);
          setError(err?.response?.data?.errors?.message);
        });
    };
    return (
      <>
        <Navbar />
        <div>
          <Toaster />
        </div>
        <div className="flex nexa-font min-h-full flex-1 flex-col justify-center px-6 lg:px-8 h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="flex justify-center">
            </div>
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Sign in and Explore
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email Address
                </label>
  
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="block w-full nexa-font rounded-md border-0 py-1.5 px-1 text-grey-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-grey-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                
                </div>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      })
                    }
                    required
                    className="block nexa-font w-full rounded-md border-0 py-1.5 px-1 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

              </div>
              <div className="flex justify-center">
                <span className="text-red-400 text-center font-bold nexa-font">
                  {error}
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={ handleSignIn }
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1 5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-xs text-gray-400">
              Ready to start exploring new perspectives?
              <Link
                to="../signup"
                className="font-semibold leading-6 text-gray-400 hover:text-gray-400"
              >
                Create An Account
              </Link>
            </p>
          </div>
        </div>
      </>
    );
  }
  