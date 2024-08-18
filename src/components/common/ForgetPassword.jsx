import React from 'react'

const ForgetPassword = () => {
  return (

    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <div className="space-y-1 text-center mb-4">
          <h2 className="text-3xl font-bold text-green-600">Forgot Password</h2>
          <div className="h-1 w-16 bg-green-600 my-4 mx-auto" />
          <p className='text-gray-600'>Enter your email address and we'll send you a link to reset your password.</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              id="confirm"
              type="checkbox"
              required
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <label htmlFor="confirm" className="text-sm font-medium text-gray-700">
              I want to receive the password reset link via email.
            </label>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Verify Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
