import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-lime-900 text-white py-10">
        <div className="container mx-auto px-4 md:px-6 flex flex-wrap justify-between">
          {/* Logo and Contact Info */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center text-2xl font-bold">
              <span className="h-7 w-7 text-white pb-20">BRAIN BOOSTER</span>
            </Link>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>info@brainbooster.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="mr-2" />
              <span>+1 234 567 890</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>123 Main Street, Anytown, USA</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold">Home</h3>
            <Link to="/" className="hover:underline">
              Benefits
            </Link>
            <Link to="/" className="hover:underline">
              Our Courses
            </Link>
            <Link to="/" className="hover:underline">
              Testimonials
            </Link>
            <Link to="/" className="hover:underline">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col space-y-2">
            <h3 className="font-bold">About Us</h3>
            <Link to="/" className="hover:underline">
              Company
            </Link>
            <Link to="/" className="hover:underline">
              Achievements
            </Link>
            <Link to="/" className="hover:underline">
              Goals
            </Link>
          </div>

          {/* Social Profiles */}
          <div className="flex flex-col space-y-2">
            <h3 className="font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </Link>
              <Link to="/" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </Link>
              <Link to="/" className="hover:text-blue-700">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-xs">
          <p>&copy; 2024 Brain Booster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
