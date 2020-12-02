import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./navbar.component.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <div className="navbar">
        <div className="navbar-container container">
          <Link to="/" className="navbar-brand">
            Events
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <FaTimes className="fa-icons" />
            ) : (
              <FaBars className="fa-icons" />
            )}
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links active-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;

// <header className="navbar">
//   <nav className="navbar-nav">
//     <div></div>
//     <div className="navbar-brand">
//       <a href="/">Events</a>
//     </div>
//     <div className="navbar-space"></div>
//     <div className="navbar-items">
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/">About</Link>
//         </li>
//         <li>
//           <Link to="/">Contact</Link>
//         </li>
//       </ul>
//     </div>
//   </nav>
// </header>
