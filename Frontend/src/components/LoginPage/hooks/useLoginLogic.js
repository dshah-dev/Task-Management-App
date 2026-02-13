import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adduser } from "../../../redux/authSlice";
import { useFetchUsersQuery } from "../../../redux/services/UsersApiSlice";
import {
  switchToSignup,
  closeAuthState,
} from "../../../redux/authStateManageSlice";

export const useLoginLogic = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: users = [], isLoading } = useFetchUsersQuery();

  const onSubmit = async (data) => {
    await new Promise((res) => setTimeout(res, 500));
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
    if (e) e.preventDefault();
    dispatch(switchToSignup());
  };

  return {
    control,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    onSignup,
  };
};