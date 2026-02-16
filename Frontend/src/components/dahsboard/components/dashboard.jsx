import PopUpWindow from "../../../common/components/PopUpWindow";
import LoginPage from "../../LoginPage/components/LoginPage";
import SignUp from "../../SignUp/components/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthState } from "../../../redux/authStateManageSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { isOpen, mode } = useSelector((state) => state.authState);

  return (
    <div className="min-h-screen bg-theme">

      <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4 ">
        <h1 className="sm:text-5xl text-3xl font-bold text-white">
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
