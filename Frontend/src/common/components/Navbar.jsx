import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { removeuser } from "../../redux/authSlice";
import Input from "./Input";
import Button from "./Button";
import user1 from "../../assets/image1.png";
import { openLogin, openSignup , openProfile} from "../../redux/authStateManageSlice";

function Navbar({ searchTask, setSearchTask, onAddTaskClick }) {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeuser());
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center mb-4 bg-white shadow-sm p-4 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold text-black">Task Management App</h1>
      </Link>

      {!currentUser ? (
        <>
          <div>
            <button
              onClick={()=>dispatch(openLogin())}
              className="text-black hover:text-purple-700 font-medium"
            >
              Login
            </button>
            <button
              onClick={()=>dispatch(openSignup())}
              className="ml-4 text-black hover:text-purple-700 font-medium"
            >
              SignUp
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 max-w-md mx-4">
            <Input
              type="text"
              placeholder="Search tasks or names..."
              variant="searchBar"
              value={searchTask}
              onChange={(e) => setSearchTask(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={()=>dispatch(openProfile())}
              className=" h-auto w-25 cursor-pointer focus:outline-none rounded-full p-0.5 transition-all duration-300 hover:bg-purple-300"
            >
              <img
                src={user1}
                alt="profile pic"
                className="rounded-full border-2 border-purple-200 hover:border-purple-300 transition-colors"
              />
            </button>
            <Button onClick={onAddTaskClick}>Add Task</Button>
            <button
              onClick={handleLogout}
              className="border rounded-lg px-4 py-2 border-gray-200 shadow-sm hover:bg-red-50 hover:text-red-600 transition-all"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
