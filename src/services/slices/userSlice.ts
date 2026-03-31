import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  updateUserApi,
  getUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

interface IUser {
  user: TUser | null;
  isLogin: boolean;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: IUser = {
  user: null,
  isLogin: false,
  isLoading: false,
  error: undefined
};

const login = createAsyncThunk(
  'user/login',
  async (loginData: { email: string; password: string }) => {
    const data = await loginUserApi(loginData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

const registration = createAsyncThunk(
  'user/registration',
  async (registerData: { email: string; name: string; password: string }) => {
    const data = await registerUserApi(registerData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

const edit = createAsyncThunk(
  'user/edit',
  async (registerData: { email: string; name: string; password: string }) => {
    const data = await updateUserApi(registerData);
    return data;
  }
);

export const getDataUser = createAsyncThunk('user/getDataUser', async () => {
  const data = await getUserApi();
  return data;
});

const exit = createAsyncThunk('user/exit', async () => {
  const data = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return data;
});

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
        state.isLogin = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = undefined;
        state.isLogin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = undefined;
        state.isLogin = true;
      })
      .addCase(registration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(getDataUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLogin = true;
      })
      .addCase(exit.fulfilled, (state, action) => {
        state.user = null;
        state.isLogin = false;
      });
  },
  selectors: {
    getUser: (state) => {
      state.user;
    },
    isAuth: (state) => {
      state.isLogin;
    }
  }
});

export const { getUser, isAuth } = userSlice.selectors;
export default userSlice.reducer;
