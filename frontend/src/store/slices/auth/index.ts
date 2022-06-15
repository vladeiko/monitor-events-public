import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";
import { toast } from "react-toastify";
import { savedToken } from "../../../constants/savedToken";
import {
  axiosService,
  removeAxiosToken,
  setAxiosToken,
} from "../../../services/axios";
import { IInstance, IInstanceResponse } from "../instances";

export interface ISignInPayload {
  identifier: string;
  password: string;
}

export interface IUser {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: string;
  id: number;
  provider: string;
  updatedAt: string;
  username: string;
  systemRole: "admin" | "eventManger" | "default";
  instance: IInstance;
}

export interface UserResponse {
  jwt: string;
  user: IUser;
}

export interface AuthState {
  accessToken: string | null;
  isLoading: boolean;
  user: IUser | null;
  isAuthorized: boolean;
}

export const signInThunk = createAsyncThunk(
  "auth/signIn",
  async (data: ISignInPayload, { rejectWithValue }) => {
    try {
      const res = await axiosService.post<UserResponse>("/auth/local", data);

      setAxiosToken(res.data.jwt);

      const query = qs.stringify(
        {
          filters: {
            users: {
              id: {
                $eq: res.data.user.id,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const instanceRes = await axiosService.get<IInstanceResponse>(
        `/instances/?${query}`
      );
      return { user: res.data, instance: instanceRes.data.data[0] };
    } catch (_err) {
      const err = _err as any;
      throw rejectWithValue(
        err.response?.data?.error?.message || "Unknown error"
      );
    }
  }
);

export const fetchUserInfoThunk = createAsyncThunk(
  "auth/fetchUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosService.get<IUser>(`/users/me`);

      const query = qs.stringify(
        {
          filters: {
            users: {
              id: {
                $eq: res.data.id,
              },
            },
          },
        },
        {
          encodeValuesOnly: true,
        }
      );

      const instanceRes = await axiosService.get<IInstanceResponse>(
        `/instances/?${query}`
      );
      return { user: res.data, instance: instanceRes.data.data[0] };
    } catch {
      throw rejectWithValue("Error");
    }
  }
);

const initialState: AuthState = {
  accessToken: savedToken,
  isLoading: false,
  user: null,
  isAuthorized: savedToken ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthorized = false;

      removeAxiosToken();
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthorized = true;
      state.user = action.payload.user.user;
      state.accessToken = action.payload.user.jwt;
      state.user.instance = {
        id: action.payload.instance.id,
        name: action.payload.instance.attributes.name,
      };

      localStorage.setItem("accessToken", state.accessToken);
    });
    builder.addCase(signInThunk.rejected, (state, action: any) => {
      state.isLoading = false;
      
      toast.error(action.payload);
    });
    builder.addCase(fetchUserInfoThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInfoThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.user.instance = {
        id: action.payload.instance.id,
        name: action.payload.instance.attributes.name,
      };
    });
    builder.addCase(fetchUserInfoThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { actions, reducer } = authSlice;

export default reducer;
