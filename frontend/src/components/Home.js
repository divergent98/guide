import React from "react";
import RegisterGuide from "./RegisterGuide";

import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="registration-background">
        <div className="center-inner-element-2">
          <div className="row">
            <div className="col-12">
              <div className="row">
                {" "}
                <div className="col-12">
                  <h1 className="franklin text-center font-weight-bold font-size-65 color-midnight-blue">
                    Share. Connect. Explore.
                  </h1>
                  <p className="franklin text-center font-size-36 color-mighty-blue">
                    Who are you?
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                <Link to='/login'  className="btn btn-primary w-100 bg-transparent color-mighty-blue franklin border border-1 border-color-mighty-blue rounded-5">
                    Guide
                  </Link>
                </div>
                <div className="col-6">
                  <Link  to="/user-login" className="btn btn-primary w-100 bg-transparent color-mighty-blue franklin border border-1 border-color-mighty-blue rounded-5">
                    User
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
