import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DynamicFormController from "../../common/components/custom-forms";
import { PROFILE_CONFIG } from "./constant";
import Button from "../../common/components/Button";
import user1 from "../../assets/image1.png";
import { updateUser } from "../../redux/usersSlice";
import { adduser } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

function ProfilePage() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm();

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      PROFILE_CONFIG.forEach((field) => {
          setValue(field.name, currentUser[field.name] || "");
      });
    }
  }, [currentUser, setValue]);

  const onSubmit = async (data) => {
    const updatedPayload = {
    fullName: data.fullName,
    username: data.username,
    email: data.email,
    phone_no: data.phone_no,
    gender: data.gender,
    dob: data.dob,
    street: data.street,
    state: data.state,
    zip: data.zip,

  };

    const resultAction = await dispatch(
      updateUser({ id: currentUser.id, data: updatedPayload }),
    );

    if (updateUser.fulfilled.match(resultAction)) {
      dispatch(adduser(resultAction.payload));
      alert("Profile updated successfully!");
    }
  };

  return (
      <div className="w-full max-w-4xl mx-auto py-2">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-white mb-4">
            Personal Information
          </h1>

          <div className="flex flex-col items-center gap-2">
            <img
              src={user1}
              alt="profile pic"
              className="w-24 h-24 rounded-full border-3 border-light-purple group-hover:border-hover-purple object-cover"
            />
            <h2 className="text-white text-lg font-semibold">
              {currentUser?.fullName || "User Name"}
            </h2>
            <p className="text-gray-300 text-sm">
              User ID: {currentUser?.email}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 px-2 "
        >
          <DynamicFormController
            control={control}
            config={PROFILE_CONFIG}
            errors={errors}
          />

          <div className="col-span-1 md:col-span-2 flex justify-center mt-6 pb-4">
            <Button variant="profileBtn" type="submit" disabled={isSubmitting} >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
  );
}

export default ProfilePage;
