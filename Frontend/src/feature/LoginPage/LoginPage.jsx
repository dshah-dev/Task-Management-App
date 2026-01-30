import { useForm } from "react-hook-form";
// import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import Input from "../../components/Input";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { adduser } from "../../redux/authSlice";
import DynamicFormController from "../../Components/custom-forms";
import LOGIN_IN from "./constant/index";

function LoginPage() {
  const {
    // register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // const { login } = useAuth();                 //using redux insted of it
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 1500));
    // login();
    dispatch(adduser({ email: data.email }));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <DynamicFormController
          control={control}
          config={LOGIN_IN}
          errors={errors}
        />
        {/* <Input
          label="Email"
          type="email"
          {...register("email", { required: "Email required" })}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password required" })}
          error={errors.password?.message}
        /> */}

        <Button type="submit" disabled={isSubmitting}>
          {" "}
          {isSubmitting ? "Login, Please Wait." : "Login"}
        </Button>
        <p className="mt-3 flex text-center justify-center text-gray-500">
          Enter any email and pasword{" "}
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
