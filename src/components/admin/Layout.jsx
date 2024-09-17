import React ,{ useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* page wrapper */}
        <div className="flex h-screen overflow-hidden">
          {/* sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
  
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* content area */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };
  
  export default Layout;