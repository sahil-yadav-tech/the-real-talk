import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", 
  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {
    setLoading: (state, action) => { 
      state.loading = true;
      state.error = null;
    },
    setUser: (state, action) => {
        console.log(state, action, "state, action");
        
      state.user = {
        email: action.payload.email,
        name: action.payload.name,
        username: action.payload.username,
        phoneNumber: action.payload.phoneNumber,
        role: action.payload.role,
        accountStatus: action.payload.accountStatus,
        accessToken: action.payload.accessToken,
      };
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  },
});

export const { 
  setLoading, 
  setUser, 
  setError, 
  clearUser,
  logout 
} = userSlice.actions;

export default userSlice.reducer;