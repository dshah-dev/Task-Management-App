import { createSlice, nanoid } from "@reduxjs/toolkit";
// nanoid : it just genrate a unique id .

const savedUser = JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
//   users: [{ id: "1", email: "a@gmail.com", password: "123456" }],
    currentUser:savedUser|| null,
};

function addingUser(state, action) {
  const user = {
    id: nanoid(),
    email: action.payload,
  };
  state.currentUser = user;
//   state.users.push(user);
  localStorage.setItem("currentUser", JSON.stringify(user));
  console.log("user added.");
}

export const authSlice = createSlice({                           
  name: "auth",
  initialState,
  reducers: {                                                  // it include properties and actions
    adduser: addingUser,
    removeuser: (state, action) => {                            // Always take two parameters state , action
        // state.users = state.users.filter((user) => user.id !== action.payload);
        state.currentUser = null;
        localStorage.removeItem("currentUser");
    },
  },
});

export const { adduser, removeuser } = authSlice.actions;
export default authSlice.reducer;
