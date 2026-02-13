import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { switchToLogin } from "../../../redux/authStateManageSlice";
import { useCreateUserMutation } from "../../../redux/services/UsersApiSlice";

export const useSignUpLogic = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data) => {
    const userPayload = {
      id: nanoid(),
      username: data.username,
      email: data.email,
      password: data.password,
      phone_no: data.phone_no,
    };

    try {
      await createUser(userPayload).unwrap();
      toast.success("User created successfully!");
      dispatch(switchToLogin());
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create account. Try again.");
    }
  };

  const onLogin = (e) => {
    if (e) e.preventDefault();
    dispatch(switchToLogin());
  };

  return {
    control,
    errors,
    isLoading,
    handleSubmit,
    onSubmit,
    onLogin,
  };
};