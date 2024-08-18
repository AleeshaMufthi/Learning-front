import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  // Access the loggedIn state from the Redux store
  const { loggedIn, username } = useSelector((state) => state.user);

  return (
    <div>
      <header className="px-4 lg:px-6 h-24 flex items-center bg-lime-900 shadow-md">
        <Link to="/" className="flex items-center justify-center">
          <div className="h-7 w-7 text-white ml-6">BRAIN BOOSTER</div>
          <span className="sr-only">Brain Booster</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6">
          <Link to="/" className="text-md font-medium hover:underline underline-offset-4 text-white">
            <div className="inline mr-4" /> Categories
          </Link>
          <Link to="/" className="text-md font-medium hover:underline underline-offset-4 text-white">
            <div className="inline mr-4" /> Courses
          </Link>
          <Link to="/" className="text-md font-medium hover:underline underline-offset-4 text-white">
            <div className="inline mr-4" /> Tutors
          </Link>
          <Link to="/" className="text-md font-medium hover:underline underline-offset-4 text-white">
            <div className="inline mr-4" /> About
          </Link>
          <Link to="/" className="text-md font-medium hover:underline underline-offset-4 text-white">
            <div className="inline mr-4" /> Contact
          </Link>
        </nav>
        {/* Conditional rendering based on whether the user is logged in */}
        <div className="ml-auto flex items-center">
          {loggedIn ? (
            <Link to="/profile" className="text-white font-medium hover:underline">
              {username ? `Hello, ${username}` : "Profile"}
            </Link>
          ) : (
            <Link to="/signin" className="text-md font-medium hover:underline underline-offset-4 text-white">
              Login
            </Link>
          )}
        </div>
      </header>
    </div>
  )
}

export default Header
