import React from "react";
import DynamicFormController from "../../../common/components/custom-forms";
import { SIGNUP_CONFIG } from "../constent/index";
import Button from "../../../common/components/Button";
import AuthSideImage from "../../../common/layout/backgroundImage";
import { useSignUpLogic } from "../hooks/useSignUpLogic";

function SignUp() {
  const { 
    control, 
    errors, 
    isLoading, 
    handleSubmit, 
    onSubmit, 
    onLogin 
  } = useSignUpLogic();

  return (
    <div className="flex">
      <AuthSideImage />
      <div className="flex-1 flex items-center justify-center mt-2">
        <div className="w-full max-w-sm">
          <header className="mb-10 text-center">
            <h1 className="text-2xl font-semibold text-white my-3">Sign Up</h1>

            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-white" />
              <p className="text-white text-sm whitespace-nowrap">
                Sign Up with email
              </p>
              <span className="h-px w-20 bg-white" />
            </div>
          </header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DynamicFormController
              control={control}
              config={SIGNUP_CONFIG}
              errors={errors}
            />
            <div className="flex items-start gap-2 text-xs text-gray-300 mb-3">
              <input type="checkbox" className="mt-1 accent-gold" required />
              <p>
                I confirm that I am 18 years or older and legally allowed to
                participate in online gaming.
              </p>
            </div>
            <Button variant="auth" type="submit" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            <div className="text-center mb-6">
              <p className="text-gray-300 text-xs">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={onLogin}
                  className="text-gold font-semibold pt-2 hover:underline"
                >
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
