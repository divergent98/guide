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
                  <h1 className="franklin text-center font-weight-bold font-size-65 color-mighty-blue">
                    Share. Connect. Explore.
                  </h1>
                  <p className="franklin font-size-16 color-mighty-blue letter-spacing text-center text-bold">
                    WHO ARE YOU?
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                <Link to='/login'  className="btn btn-primary w-100 bg-blured color-midnight-blue franklin border border-1 border-midnight-blue rounded-5">
                    Guide
                  </Link>
                </div>
                <div className="col-6">
                  <Link  to="/user-login" className="btn btn-primary w-100 bg-blured color-midnight-blue franklin border border-1 border-midnight-blue rounded-5">
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
