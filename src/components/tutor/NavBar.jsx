import { Button, Navbar } from "flowbite-react";
import Logo from "../common/Logo";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tutor, TutorSignIn, TutorProfile, TutorDashboard, CreateCourse, ManageCourse } from "../../api/link";
import { useSelector } from "react-redux";
import MenuDropDown from "./MenuDropDown";

function NavBar() {
  const { pathname } = useLocation();
  const tutor = useSelector((state) => state.tutor);
  const normalnav = [
    { name: "Home", href: Tutor },
    { name: "About" },
    { name: "Contact" },
  ];
  const tutornav = [
    { name: "Home", href: Tutor },
    { name: "Manage Course", href: ManageCourse },
    { name: "Create Course", href: CreateCourse },
    { name: "Profile", href: TutorProfile },
  ];
  const navitems = tutor?.loggedIn ? tutornav : normalnav;
  return (
    <Navbar
    style={{ backgroundColor: "#2d3748"}}
    fluid={true}
    
  >
    <div className="flex items-center justify-between w-full">
      <Logo className="mr-3" to={Tutor} size={1.3} tutor />

      <div className="flex space-x-6 text-white">
        {navitems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`hover:text-white ${
              pathname === item.href ? "text-white" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        {tutor.loggedIn ? (
          <MenuDropDown className="w-3" user={tutor} />
        ) : (
          !tutor.loggedIn && (
            <Link to={TutorSignIn(pathname)}>
              <Button>Sign In</Button>
            </Link>
          )
        )}
      </div>
    </div>
  </Navbar>
  );
}
export default React.memo(NavBar);
