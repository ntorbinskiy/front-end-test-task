import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfo {
  email: string;
  name: string;
  id: number | null;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  data: Record<string, any>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  userInfo: UserInfo;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  data: {},
  status: 'idle',
  userInfo: {
    email: '',
    name: '',
    id: null,
    role: '',
  },
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
      state.status = 'loading';
      state.data = {};
    },
    loginSuccess(state, action: PayloadAction<UserInfo>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.status = 'succeeded';
      state.data = action.payload;
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.status = 'failed';
      state.data = {};
      state.user = null;
    },
    logout(_state) {
      return initialState;
    },
    updateUserInfo(state, action: PayloadAction<Partial<UserInfo>>) {
      state.userInfo = {
        ...state.userInfo,
        ...action.payload,
      };
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserInfo,
} = authSlice.actions;

export default authSlice.reducer;