import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../redux/authSlice";
import Button from "../../../common/components/Button";
import DynamicFormController from "../../../common/components/custom-forms";
import LOGIN_IN from "../constant/index";
import AuthSideImage from "../../../common/layout/backgroundImage";
import { fetchUsers } from "../../../redux/usersSlice";
import {
  switchToSignup,
  closeAuthState,
} from "../../../redux/authStateManageSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1000));
    const existingUser = users.find((u) => u.email === data.email);
    if (!existingUser) {
      setError("email", { message: "User does not exist" });
      return;
    }
    if (existingUser.password !== data.password) {
      setError("password", { message: "Incorrect password" });
      return;
    }
    dispatch(adduser(existingUser));
    dispatch(closeAuthState());
    navigate("/dashboard");
  };

  const onSignup = (e) => {
    e.preventDefault();
    dispatch(switchToSignup());
  };

  return (
    <div className=" bg-theme flex">
      <AuthSideImage />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <header className="mb-10 text-center">
            <h1 className="text-2xl font-semibold text-white mb-3">Login</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-white" />
              <p className="text-white text-sm whitespace-nowrap">
                Login with email
              </p>
              <span className="h-px w-20 bg-white" />
            </div>
          </header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DynamicFormController
              control={control}
              config={LOGIN_IN}
              errors={errors}
            />

            <div className="text-right">
              <button
                type="button"
                className="text-white text-xs hover:underline text-center"
              >
                Forgot Your Password?
              </button>
            </div>

            <Button variant="auth" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Login"}
            </Button>

            <div className="text-center mt-6">
              <p className="text-gray-300 text-xs">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={onSignup}
                  className="text-gold font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
