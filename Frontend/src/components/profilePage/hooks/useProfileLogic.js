import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../../../redux/authSlice";
import toast from "react-hot-toast";
import { useUpdateUserMutation } from "../../../redux/services/UsersApiSlice";

export const useProfileLogic = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },   //is dirty check , user has modified any of the inputs compared to their original values.
  } = useForm();

  useEffect(() => {
    if (currentUser) {
      reset(currentUser);
    }
  }, [currentUser, reset]);

  const onSubmit = async (data) => {
    if (!isDirty) {
      toast("No changes detected");
      return;
    }

    try {
      const result = await updateUser({
        id: currentUser.id,
        data: data,
      }).unwrap();

      dispatch(adduser(result));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return {
    currentUser,
    control,
    errors,
    isDirty,
    isLoading,
    handleSubmit,
    onSubmit,
  };
};