import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 1500));
    login();
    navigate("/dashboard");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-md w-100"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <Input
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
        />
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
