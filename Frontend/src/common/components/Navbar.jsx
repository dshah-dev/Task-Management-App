import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeuser } from "../../redux/authSlice";
import Input from "./Input";
import Button from "./Button";
import user1 from "../../assets/image1.png";
import {
  openLogin,
  openSignup,
  openProfile,
} from "../../redux/authStateManageSlice";

function Navbar({ searchTask, setSearchTask, onAddTaskClick }) {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeuser());
    navigate("/");
  };

  return (
    <header className="bg-white p-4 rounded-lg shadow-md mb-2">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-bold text-black md:text-2xl whitespace-nowrap">
            Task Management App
          </h1>
        {!currentUser ? (
          <>
            <div>
              <button
                onClick={() => dispatch(openLogin())}
                className="text-black hover:text-purple-700 font-medium"
              >
                Login
              </button>
              <button
                onClick={() => dispatch(openSignup())}
                className="ml-4 text-black hover:text-purple-700 font-medium"
              >
                SignUp
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full md:max-w-md ">
              <Input
                type="text"
                placeholder="Search tasks or names..."
                variant="searchBar"
                value={searchTask}
                onChange={(e) => setSearchTask(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-2">
              <Button onClick={onAddTaskClick}>Add Task</Button>
              <button
                onClick={() => dispatch(openProfile())}
                className="h-auto w-25 cursor-pointer rounded-full p-0.5 "
              >
                <img
                  src={user1}
                  alt="profile pic"
                  className="rounded-full border-2 border-light-purple hover:border-hover-purple"
                />
              </button>
              <button
                onClick={handleLogout}
                className="border rounded-lg px-4 py-2 border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-600 transition-all"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
