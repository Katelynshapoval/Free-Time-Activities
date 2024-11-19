import React, { useState, useEffect, useRef } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
// Import Link component for navigation between routes
import { Link } from "react-router-dom";
// Import SidebarData array for sidebar menu items
import { SidebarData } from "./SidebarData";
import "../App.css";
import { IconContext } from "react-icons/lib";
import * as IoIcons from "react-icons/io";

function Navbar() {
  // State to track sidebar visibility, default is hidden (false)
  const [sidebar, setSidebar] = useState(false);
  const sidebarRef = useRef(null); // Ref for sidebar

  // Toggle function to show or hide the sidebar
  const showSidebar = () => setSidebar(!sidebar);

  // Effect to handle clicks outside of the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebar(false); // Close sidebar if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener on unmount
    };
  }, [sidebar]); // Dependency array ensures this effect runs when the sidebar state changes

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        {/* Top navbar section */}
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars color="white" onClick={showSidebar} />
          </Link>
        </div>

        {/* Sidebar navigation menu */}
        <nav
          className={sidebar ? "nav-menu active" : "nav-menu"}
          ref={sidebarRef}
        >
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* Close icon at the top of the sidebar */}
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose id="crossSidebar" />
              </Link>
            </li>
            {/* Map through SidebarData to create menu items */}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
