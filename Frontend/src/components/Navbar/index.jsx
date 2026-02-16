import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeuser } from "../../redux/authSlice";
import user1 from "../../assets/image1.png";
import {
  openLogin,
  openSignup,
  openProfile,
} from "../../redux/authStateManageSlice";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeuser());
    navigate("/");
  };

  return (
    <header className="top-0 left-0 w-full bg-light-purple p-4  sm:px-6 sm:py-5 shadow-md flex justify-between items-center z-50">
      <>
        <h1 className="flex justify-start text-lg font-bold text-white md:text-2xl whitespace-nowrap">
          Task Management App
        </h1>
      </>
      {!currentUser ? (
        <div className="">
          <div className="">
            <button
              onClick={() => dispatch(openLogin())}
              className="text-white hover:text-purple-700 font-medium"
            >
              Login
            </button>
            <button
              onClick={() => dispatch(openSignup())}
              className="ml-4 text-white hover:text-purple-700 font-medium"
            >
              SignUp
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2 sm:gap-4 md:gap-6 pr-2">
            <div className="relative">
              <button
                onClick={() => setOpenMenu((e) => !e)}
                className="h-11 w-11 rounded-full p-0.5"
              >
                <img
                  src={user1}
                  alt="profile"
                  className="rounded-full border-2 border-light-purple hover:border-hover-purple"
                />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-32 task-card-sigma border-gold shadow-lg z-10 h-auto">
                  <button
                    onClick={() => {
                      dispatch(openProfile());
                      setOpenMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-hover-purple text-white border-transparent rounded-lg"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-hover-purple border-transparent rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
