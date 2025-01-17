import { useState, useEffect } from "react";
import ProfileLayout from "../../components/user/ProfileLayout";
import PageInfo from "../../components/common/PageInfo";
import { LockClosedIcon, PencilSquareIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import profileSchema from "../../utils/validation/profileSchema";
import { getUserDetailsAPI, updateUserDetailsAPI } from "../../api/user";
import toast from "react-hot-toast";
import { Dumy } from "../../api/link";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  export default function Profile() {
    const [editMode, setEditMode] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [error, setError] = useState(null);
    const [agreed, setAgreed] = useState(false);
    const [imagePreviewURL, setImagePreviewURL] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(profileSchema),
      defaultValues: userDetails, 
    });
    
    useEffect(() => {
      
      getUserDetailsAPI()
        .then((response) => {
          
          const userDetails = response.data.userDetails;
          
          setUserDetails({
            name: userDetails.name,
            age: userDetails.age,
            about: userDetails.about,
            address: userDetails.address,
            visible: userDetails.visible,
            thumbnail: userDetails.thumbnail,
          });
          setAgreed(userDetails.visible);
          setValue("name", userDetails.name);
          setValue("age", userDetails.age);
          setValue("about", userDetails.about);
          setValue("address", userDetails.address);
          setValue("thumbnail", userDetails.thumbnail)
        })
        .catch((err) => console.log(err));
    }, []);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      setSelectedImage(file);
      setValue('thumbnail', file); // Set form value for thumbnail
      const fileReader = new FileReader();
      fileReader.onload = (e) => setImagePreviewURL(e.target.result); // Preview image
      fileReader.readAsDataURL(file); // Read file for preview
  };

    const handleOnSubmit = (data) => {
      setError(null);
      
      data.visible = agreed;

      const formData = new FormData()
      if (!selectedImage) {
        toast('Please select an image before submitting.')
        setError("Please select an image before submitting.");
        return;
    }
    
      formData.append('name', data.name)
      formData.append('age',data.age)
      formData.append('about', data.about)
      formData.append('address', data.address)
      formData.append('visible',data.visible)
      formData.append('thumbnail', selectedImage);
    
      updateUserDetailsAPI(formData)
     
      
        .then((response) => {
          console.log(response, 'update user details');
          
          toast.success("Profile Updated Successfully", {
            duration: 3000,
          });
          
          setEditMode(false);
          const updatedDetails = response.data.userDetails;
          
        setUserDetails((prevState) => ({
        ...prevState, 
        thumbnail: response.data.userDetails.thumbnail[0],
        }));
    setImagePreviewURL(response.data.userDetails.thumbnail[0]); 
        })
        .catch((err) => {
          console.log(err, 'Error updating profile');
          err.response?.data?.message || err.message || "Something went wrong";
          setError(errorMessage); 
        });
    };

    return (
      <>
      <ProfileLayout>
        <PageInfo pageName={"profile"} />
        <div className="isolate bg-gray-300 px-6 lg:px-8 rounded-md pt-10 pb-10">
          <div className="mx-auto max-w-2xl relative text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Customize Profile 
            </h2>

            <div className="absolute ml-13">
              {editMode ? (
                <h1 className="py-1 px-2 text-sm rounded-md bg-indigo-500 text-white">
                  Edit
                </h1>
              ) : (
                <h1 className="px-2 py-1 text-sm rounded-md bg-gray-500 text-white">
                  View Only
                </h1>
              )}
            </div>
            <span
              className="absolute flex flex-col justify-center items-center right-10"
              data-te-toggle="tooltip"
              title={editMode ? "Turn off Edit mode" : "Turn On Edit Mode"}
            >
              {editMode ? (
                <PencilSquareIcon className="w-6 hover:scale-105 duration-300 cursor-pointer text-primary font-extrabold" />
              ) : (
                <LockClosedIcon className="w-6 hover:scale-105 duration-300 cursor-pointer text-red-500" />
              )}
              <Switch
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                className={classNames(
                  editMode ? "bg-indigo-600" : "bg-gray-200",
                  "flex w-8 flex-none cursor-pointer mt-3 rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors durattion-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                )}
              >
                <span className="sr-only">Agree to Policies</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    editMode ? "translate-x-3.5" : "translate-x-0",
                    "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </span>
          </div>
          <form
            onSubmit={ handleSubmit(handleOnSubmit)}
            className="mx-auto mt-16 max-w-xl sm:mt-20"
          >

            <div className="mb-6">
              <label className="block text-sm font-semibold leading-6 text-gray-900">Profile Picture</label>
                        <div className="text-center">
                        <div className="flex items-center justify-center">
             <img
              src={imagePreviewURL ||userDetails.thumbnail} // Fallback image if no profile image
              alt="User Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
              />
               </div>
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="thumbnail"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2"
                            >
                              <span>Upload Picture</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange} // Handle image upload
                                className="form-input"
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP up to 1MB</p>
                          <p className="text-red-600 text-xs mt-2">{errors.thumbnail?.message}</p>
                        
                        </div>
                      
            </div>


            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2.5">
                  <input
                    {...(editMode ? null : { disabled: true })}
                    type="text"
                    id="name"
                    autoComplete="off"
                    placeholder={userDetails.name}
                    {...register("name")}
                    className={classNames(
                      errors.name
                        ? "ring-red-600 rounded-md focus:ring-red-600"
                        : "ring-gray-300 focus:ring-indigo-600",
                      "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    )}
                  />
                </div>
                <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                  {errors.name?.message}
                </p>
              </div>
  
              <div className="col-span-full">
                <label
                  htmlFor="age"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Age
                  <span className="text-xs ml-3 mb-1 text-gray-400 text-end">
                    (optional)
                  </span>
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="age"
                    {...(editMode ? null : { disabled: true })}
                    id="age"
                    placeholder={userDetails.age}
                    {...register("age")}
                    className={classNames(
                      errors.age
                        ? "ring-red-600 rounded-md focus:ring-red-600"
                        : "ring-gray-300 focus:ring-indigo-600",
                      "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    )}
                  />
                  <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                    {errors.age?.message}
                  </p>
                </div>
              </div>
            
              <div className="col-span-full">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Address
                  <span className="text-xs ml-3 mb-1 text-gray-400 text-end">
                    (optional)
                  </span>
                </label>
                <div className="mt-2">
                  <textarea
                    name="address"
                    id="address"
                    {...(editMode ? null : { disabled: true })}
                    rows={3}
                    {...register("address")}
                    placeholder={userDetails.address}
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                      errors.address?.message && "ring-red-600 ring-1 rounded-md"
                    }`}
                    defaultValue={""}
                  />
                </div>
                <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                  {errors.address?.message}
                </p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Bio/About Me
                <span className="text-xs ml-3 mb-1 text-gray-400 text-end">
                  (optional)
                </span>
              </label>
              <div className="mt-2.5">
                <textarea
                  {...(editMode ? null : { disabled: true })}
                  name="message"
                  id="message"
                  autoComplete="off"
                  placeholder={userDetails.about}
                  rows={4}
                  {...register("about")}
                  className={classNames(
                    errors.about
                      ? "ring-red-600 rounded-md focus:ring-red-600"
                      : "ring-gray-300 focus:ring-indigo-600",
                    "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  )}
                  // className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="text-red-600 nexa-font text-xs mt-2 ml-1">
                {errors.about?.message}
              </p>
            </div>
           
            <div className="flex justify-center"></div>
            <div className="mt-10">
              <button
                {...(editMode ? null : { disabled: true })}
                type="submit"
                className={`${
                  editMode
                    ? "bg-indigo-600 hover:bg-indigo-500"
                    : "bg-gray-400 cursor-not-allowed"
                } ${
                  error
                    ? "ring-1 ring-opacity-40 ring-red-700 ring-offset-2"
                    : null
                } block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Update Profile
              </button>
              <p className="text-red-600 nexa-font text-xs text-center mt-3 ml-1">
                {error}
              </p>
            </div>
          </form>
        </div>
      </ProfileLayout>
      </>
    );
  }
  