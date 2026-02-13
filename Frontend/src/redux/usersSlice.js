// CREATED RTK QUERY INSTED OF IT ...

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../utils/api"

// export const createUser = createAsyncThunk(
//   "users/createUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/users", userData);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const res = await api.patch(`/users/${id}`, data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async () => {
//     const res = await api.get("/users");
//     return res.data;
//   }
// );


// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(createUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.users.push(action.payload);
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(updateUser.fulfilled, (state, action) => {
//         const index = state.users.findIndex(
//           (u) => u.id === action.payload.id
//         );
//         if (index !== -1) {
//           state.users[index] = action.payload;
//         }
//       })

//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.users = action.payload;
//       });
//   },
// });

// export default userSlice.reducer;
