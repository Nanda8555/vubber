import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/auth';

interface UserInfoState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: UserInfoState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    }
  },
});

export const { setUserInfo, logout } = userInfoSlice.actions;
export default userInfoSlice.reducer; 