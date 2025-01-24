import { useState } from "react";
import { Button, Label } from "flowbite-react";
import { changePasswordAPI } from "../../api/user";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import * as Yup from "yup"
import { useFormik } from "formik";

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
});

export default function ChangePassword() {

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await changePasswordAPI(values);
                toast.success("Password changed successfully");
                resetForm();
            } catch (error) {
                toast.error(
                    error.response?.data?.error || "Failed to change password"
                );
            }
        },
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-7">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Change Password</h2>
                    <p className="text-gray-400 text-sm">
                        Enter your current password and set a new one.
                    </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-6">
                        {/* Current Password */}
                        <div>
                            <Label htmlFor="currentPassword" className="text-gray-300">
                                Current Password
                            </Label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword.currentPassword ? "text" : "password"}
                                    name="currentPassword"
                                    placeholder="Enter current password"
                                    className="w-full bg-gray-700 text-gray-300 placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    value={formik.values.currentPassword}
                                    onChange={formik.handleChange}
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={() =>
                                        setShowPassword({
                                            ...showPassword,
                                            currentPassword: !showPassword.currentPassword,
                                        })
                                    }
                                >
                                    {showPassword.currentPassword ? (
                                        <AiFillEye className="text-white" size={20} />
                                    ) : (
                                        <AiFillEyeInvisible className="text-white" size={20} />
                                    )}
                                </div>
                            </div>
                            {formik.errors.currentPassword && formik.touched.currentPassword && (
                                <p className="text-red-700 text-sm mt-1">
                                    {formik.errors.currentPassword}
                                </p>
                            )}
                        </div>

                        {/* New Password */}
                        <div>
                            <Label htmlFor="newPassword" className="text-gray-300">
                                New Password

                            </Label>

                            <div className="relative mt-2">
                                <input
                                    type={showPassword.newPassword ? "text" : "password"}
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    className="w-full bg-gray-700 text-gray-300 placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                />
                                <div
                                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword({
                                        ...showPassword,
                                        newPassword: !showPassword.newPassword,
                                    })}
                                >
                                    {showPassword.newPassword ? (
                                        <AiFillEye className="text-white" size={20} />
                                    ) : (
                                        <AiFillEyeInvisible className="text-white" size={20} />
                                    )}
                                </div>
                            </div>
                            {formik.errors.newPassword && formik.touched.newPassword && (
                                <p className="text-red-700 text-sm mt-1">
                                    {formik.errors.newPassword}
                                </p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <Label htmlFor="confirmPassword" className="text-gray-300">
                                Confirm New Password
                            </Label>
                            <div className="relative mt-2">
                            <input
                                type={showPassword.confirmNewPassword ? "text" : "password"}
                                name="confirmNewPassword"
                                placeholder="Confirm new password"
                                className="w-full bg-gray-700 text-gray-300 placeholder-gray-400 border border-gray-600 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={formik.handleChange}
                                value={formik.values.confirmNewPassword}
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword({
                                    ...showPassword,
                                    confirmNewPassword: !showPassword.confirmNewPassword,
                                })}
                            >
                                {showPassword.confirmNewPassword ? (
                                    <AiFillEye className="text-white" size={20} />
                                ) : (
                                    <AiFillEyeInvisible className="text-white" size={20} />
                                )}
                            </div>
                        </div>
                    </div>
                    {formik.errors.confirmNewPassword &&
                                formik.touched.confirmNewPassword && (
                                    <p className="text-red-700 text-sm mt-1">
                                        {formik.errors.confirmNewPassword}
                                    </p>
                                )}
                    </div>
                       
                    <div className="text-sm text-gray-400 mt-2">
                                Password must be at least 8 characters long and include a mix of
                                letters, numbers, and symbols.
                            </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Change Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>

    )
}