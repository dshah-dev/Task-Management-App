import React from "react";
import Button from "../../../common/components/Button";
import DynamicFormController from "../../../common/components/custom-forms";
import LOGIN_IN from "../constant/index";
import { useLoginLogic } from "../hooks/useLoginLogic";
import AuthSideImage from "../../../common/layout/backgroundImage";

function LoginPage() {
  const { 
    control, 
    errors, 
    isLoading, 
    handleSubmit, 
    onSubmit, 
    onSignup 
  } = useLoginLogic();

  return (
    <div className=" bg-theme flex">
      <AuthSideImage />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <header className="mb-10 text-center">
            <h1 className="text-2xl font-semibold text-white my-3">Login</h1>
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

            <Button variant="auth" type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Login"}
            </Button>

            <div className="text-center my-6">
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
