import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
    currentUser:savedUser|| null,
};

function addingUser(state, action) {
  state.currentUser = action.payload;
  localStorage.setItem("currentUser", JSON.stringify(action.payload));
}

export const authSlice = createSlice({                           
  name: "auth",
  initialState,
  reducers: {                                                  // it include properties and actions
    adduser: addingUser,
    removeuser: (state, action) => {                            // Always take two parameters state , action
        state.currentUser = null;
        localStorage.removeItem("currentUser");
    },
  },
});

export const { adduser, removeuser } = authSlice.actions;
export default authSlice.reducer;
