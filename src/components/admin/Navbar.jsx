import { Button, Navbar as NavBar } from "flowbite-react";
import React from "react";
import Logo from "../common/Logo";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Admin, AdminManageTutor, AdminManageUser, AdminProfile, AdminSignIn, Tutor, User } from "../../api/link";

function Navbar() {

    const { pathname } = useLocation();
    const admin = useSelector((state) => state.admin);
    
    const normalnav = [
      { name: "Home", href: Admin },
      { name: "Learn", href: User },
      { name: "Teach", href: Tutor },
      { name: "Contact" },
    ];
    const adminnav = [
      { name: "Home", href: Admin },
      { name: "Manage User", href: AdminManageUser },
      { name: "Manage Tutor", href: AdminManageTutor },
      { name: "sales" },
      { name: "Profile", href: AdminProfile },
    ];
    const navitems = admin?.loggedIn ? adminnav : normalnav;
    return (
      <NavBar
        style={{ backgroundColor: "#000000" }}
        fluid={true}
        rounded={true}
      >
        <Logo className="mr-3" to={Admin} size={1.3} admin />
        <div className="flex md:order-2">
          {admin.loggedIn ? (
            ""
          ) : (
            <Link to={AdminSignIn(pathname)}>
              <Button className="bg-gray-500 hover:bg-gray-300">
                Sign In{" "}
              </Button>
            </Link>
          )}
          <NavBar.Toggle />
        </div>
        <NavBar.Collapse>
          {navitems.map((item) => (
            <Link key={item.name} to={item.href} className="hover:text-gray-500">
              <span className={pathname === item.href ? "text-gray-600" : null}>
                {item.name}
              </span>
            </Link>
          ))}
        </NavBar.Collapse>
      </NavBar>
    );
  }
  export default React.memo(Navbar);
  