import React, { useEffect } from "react";
import DynamicFormController from "../../../common/components/custom-forms";
import { PROFILE_CONFIG } from "../constant";
import Button from "../../../common/components/Button";
import user1 from "../../../assets/image1.png";
import Skeleton from "../../../common/components/Skeleton";
import { useProfileLogic } from "../hooks/useProfileLogic";

function ProfilePage() {
  const {
    currentUser,
    control,
    errors,
    isDirty,
    isLoading,
    handleSubmit,
    onSubmit,
  } = useProfileLogic();

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
          <p className="text-gray-300 text-sm">User ID: {currentUser?.email}</p>
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
          <Button
            variant="profileBtn"
            type="submit"
            disabled={isLoading || !isDirty}
          >
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-full">
                <Skeleton
                  variant="text"
                  width="60px"
                  height="12px"
                  className="bg-white/20" 
                >saving...</Skeleton>
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
