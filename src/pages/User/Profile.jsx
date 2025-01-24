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
import { Link } from "react-router-dom";


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
          console.log(userDetails, 'user details');
          
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

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreviewURL(reader.result);
          setSelectedImage(file);
        };
        reader.readAsDataURL(file);
      }
    };

  useEffect(() => {
    if (selectedImage) {
      console.log('Selected image updated:--------', selectedImage);
      // Your API call logic here
      handleOnSubmit();  // Assuming handleOnSubmit sends the form data
    }
  }, [selectedImage]);

  const handleOnSubmit = async (data) => {
    setError(null);
    try {
      // data.visible = agreed;
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("age", data.age);
      formData.append("about", data.about);
      formData.append("address", data.address);
      // formData.append("visible", data.visible);
  
      // Check if selectedImage exists before appending to formData
      if (selectedImage) {
        formData.append("thumbnail", selectedImage);
      } else {
        // Handle the case where no image is selected
        console.log('No image selected');
      }
  
      const response = await updateUserDetailsAPI(formData);
      console.log(response); // Check API response
  
      const updatedDetails = response.data.data;
      setUserDetails((updatedDetails));
      if (updatedDetails.thumbnail?.length > 0) {
        setImagePreviewURL(updatedDetails.thumbnail);
      }
  
      toast.success("Profile Updated Successfully");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
      toast.error(err.message || "Something went wrong");
    }
  };
   
  

    return (
      <>
      <ProfileLayout>
        <PageInfo pageName={"Customize profile"} />
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="relative h-48 bg-gradient-to-r from-gray-700 to-purple-300">
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
            <h2 className="text-3xl mb-20 font-bold text-white">
              {userDetails.name}
            </h2>
            <p className="text-white/80 mb-10">{userDetails.email}</p>
          </div>
        </div>
        <div className="relative px-6 py-10">
          <div className="absolute -top-20 left-6">
            <div className="relative">
              <img
                src={imagePreviewURL || userDetails.thumbnail || "/placeholder-avatar.png"}
                alt="User Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {editMode && (
                <label
                  htmlFor="thumbnail"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {editMode ? "Edit Mode" : "View Mode"}
              </span>
              <Switch
                checked={editMode}
                onChange={() => setEditMode(!editMode)}
                className={classNames(
                  editMode ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Enable edit mode</span>
                <span
                  className={classNames(
                    editMode ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                >
                  <span
                    className={classNames(
                      editMode
                        ? "opacity-0 duration-100 ease-out"
                        : "opacity-100 duration-200 ease-in",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  >
                    <LockClosedIcon className="h-3 w-3 text-gray-400" />
                  </span>
                  <span
                    className={classNames(
                      editMode
                        ? "opacity-100 duration-200 ease-in"
                        : "opacity-0 duration-100 ease-out",
                      "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
                    )}
                    aria-hidden="true"
                  >
                    <PencilSquareIcon className="h-3 w-3 text-indigo-600" />
                  </span>
                </span>
              </Switch>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  disabled={!editMode}
                  className={classNames(
                    "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      : "border-transparent bg-gray-100",
                    errors.name ? "border-red-300" : ""
                  )}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  {...register("age")}
                  disabled={!editMode}
                  className={classNames(
                    "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      : "border-transparent bg-gray-100",
                    errors.age ? "border-red-300" : ""
                  )}
                />
                {errors.age && (
                  <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
                )}
              </div>
             
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  {...register("address")}
                  rows={3}
                  disabled={!editMode}
                  className={classNames(
                    "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      : "border-transparent bg-gray-100",
                    errors.address ? "border-red-300" : ""
                  )}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                  Bio/About Me
                </label>
                <textarea
                  id="about"
                  {...register("about")}
                  rows={4}
                  disabled={!editMode}
                  className={classNames(
                    "mt-1 block w-full rounded-md shadow-sm sm:text-sm",
                    editMode
                      ? "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                      : "border-transparent bg-gray-100",
                    errors.about ? "border-red-300" : ""
                  )}
                />
                {errors.about && (
                  <p className="mt-2 text-sm text-red-600">{errors.about.message}</p>
                )}
              </div>
            </div>
            {editMode && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
          {error && (
            <p className="mt-4 text-sm text-center text-red-600">{error}</p>
          )}
        </div>
      </div>
      <p className="mb-4 mt-2">Wanna change password!</p>
      <Link
      to="/changePassword"
              className="text-white mt-4 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-md px-11 py-2 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
            change password
        </Link>
      </ProfileLayout>
      </>
    );
  }
  