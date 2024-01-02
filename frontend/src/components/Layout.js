import * as Icon from "react-bootstrap-icons";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Layout = ({ image, firstName, lastName, id }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">YourGuide</span>
          </a>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <img src={image} alt="Profile " className="rounded-circle" />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {firstName} {lastName}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>
                    {" "}
                    {firstName} {lastName}
                  </h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    to={"/"}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Layout;
