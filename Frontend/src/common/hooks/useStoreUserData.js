import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/usersSlice";
import { nanoid } from "@reduxjs/toolkit";

const useStoreUserData = () => {
  const dispatch = useDispatch();
  const storeUser = (formData) => {
    dispatch(
      createUser({
        id: nanoid(),
        ...formData,
      }),
    );
  };

  return {
    storeUser,
  };
};

export default useStoreUserData;
