import Navbar from "../../../common/components/Navbar";
import PopUpWindow from "../../../common/components/PopUpWindow";
import LoginPage from "../../LoginPage/components/LoginPage";
import SignUp from "../../SignUp/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthState } from "../../../redux/authStateManageSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { isOpen, mode } = useSelector((state) => state.authState);

  return (
    <div className="min-h-screen bg-theme">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Task Management App
        </h1>
      </div>

      <PopUpWindow
        isOpen={isOpen}
        onClose={() => dispatch(closeAuthState())}
        variant="auth"
      >
        {mode === "login" ? <LoginPage /> : <SignUp />}
      </PopUpWindow>
    </div>
  );
}

export default Dashboard;
