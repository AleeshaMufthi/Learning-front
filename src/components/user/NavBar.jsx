import { Button, Navbar } from "flowbite-react";
import React from "react";
import Logo from "../common/Logo";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuDropDown from "./MenuDropDown";
import { User, UserSignIn, Profile, Tutor, Explore, Enrolled, Tutors } from "../../api/link";


function NavBar() {
    const { pathname } = useLocation();
    const user = useSelector((state) => state.user);
    const NormalNav = [
      { name: "Home", href: User },
      { name: "Explore", href: Explore  },
      { name: "Teach", href: Tutor},
      { name: "Contact"},
    ];
  
    const UserNav = [
      { name: "Home", href: User },
      { name: "Explore", href: Explore },
      { name: "Enrolled", href: Enrolled },
      { name: "Profile", href: Profile },
      { name: "Tutors", href: Tutors},
    ];
    const navitems = user?.loggedIn ? UserNav : NormalNav;

    return (
          <Navbar
      style={{ backgroundColor: "#2d3748"}}
      fluid={true}
      rounded={true}
    >
      <div className="flex items-center justify-between w-full">
        <Logo className="mr-3" to={User} size={1.3} />

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
          {user.loggedIn ? (
            <MenuDropDown className="w-3" user={user} />
          ) : (
            !user.loggedIn && (
              <Link to={UserSignIn(pathname)}>
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
  