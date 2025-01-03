import React ,{ useRef, useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Logo from "../common/Logo";
import { UserIcon, BookIcon, GroupIcon, DollarSignIcon, BookOpenIcon } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

    const location = useLocation();
    const { pathname } = location;
  
    const trigger = useRef(null);
    const sidebar = useRef(null);
  
    const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
    const [sidebarExpanded, setSidebarExpanded] = useState(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
    );
  
    useEffect(() => {
      const clickHandler = ({ target }) => {
        if (!sidebar.current || !trigger.current) return;
        if (
          !sidebarOpen ||
          sidebar.current.contains(target) ||
          trigger.current.contains(target)
        )
          return;
        setSidebarOpen(false);
      };
      document.addEventListener("click", clickHandler);
      return () => document.removeEventListener("click", clickHandler);
    });
  
    useEffect(() => {
      const keyHandler = ({ keyCode }) => {
        if (!sidebarOpen || keyCode !== 27) return;
        setSidebarOpen(false);
      };
      document.addEventListener("keydown", keyHandler);
      return () => document.removeEventListener("keydown", keyHandler);
    });
  
    useEffect(() => {
      localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
      if (sidebarExpanded) {
        document.querySelector("body")?.classList.add("sidebar-expanded");
      } else {
        document.querySelector("body")?.classList.remove("sidebar-expanded");
      }
    }, [sidebarExpanded]);
  
    return (
      <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{
        zIndex: "9999",
        backgroundColor: "rgb(34, 43, 62)",
      }}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <span className={"mt-5"}>
          <Logo size={1.5} to="/admin" admin />
        </span>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
           

            <ul className="mb-6 flex flex-col gap-1.5">
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/" || pathname.includes("dashboard")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                        
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Courses
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              
              <li>
                <NavLink
                  to="/admin/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname.endsWith("admin/") ||
                      pathname.endsWith("admin")) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                 <UserIcon />
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/category"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("category") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <BookIcon />
                  Categories
                </NavLink>
              </li>
              <SidebarLinkGroup
                activeCondition={
                  pathname === "/forms" || pathname.includes("forms")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && "hidden"
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Form Elements
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white duration-300 ease-in-out hover:text-white " +
                                (isActive && "!text-white")
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <li>
                <NavLink
                  to="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("users") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                 <GroupIcon />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/tutors"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("tutors") && "bg-gray dark:bg-meta-4"
                  }`}
                >
                 <GroupIcon />
                  Tutors
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/revenue"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("revenue") && "bg-gray dark:bg-meta-4"
                  }`}
                >
                 <DollarSignIcon />
                  Revenue
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/courses"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-white duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("courses") && "bg-gray dark:bg-meta-4"
                  }`}
                >
                 <BookOpenIcon />
                  Courses
                </NavLink>
              </li>
             
            
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};
  
  export default Sidebar;
  