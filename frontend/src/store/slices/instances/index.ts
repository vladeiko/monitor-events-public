import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosService } from "../../../services/axios";

export interface IInstanceResponse {
  data: {
    id: number;
    attributes: {
      name: string;
    };
  }[];
}

export interface IInstance {
  id: number;
  name: string;
}

export const fethcInstancesThunk = createAsyncThunk(
  "instances/fetchInstances",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosService.get<IInstanceResponse>(`/instances`);
      return res.data;
    } catch {
      throw rejectWithValue("Error");
    }
  }
);

export interface InstancesState {
  isLoading: boolean;
  instances: IInstance[];
}

const initialState: InstancesState = {
  isLoading: false,
  instances: [],
};

const instancesSlice = createSlice({
  name: "instances",
  initialState,
  reducers: {
    addInstance: (state, action: PayloadAction<IInstance>) => {
      state.instances.push(action.payload);
    },
    deleteInstance: (state, action: PayloadAction<number>) => {
      state.instances.splice(
        state.instances.findIndex((instance) => instance.id === action.payload),
        1
      );
    },
    updateInstance: (state, action: PayloadAction<IInstance>) => {
      const index = state.instances.findIndex(
        (instance) => instance.id === action.payload.id
      );

      if (index > -1) {
        state.instances[index] = {
          ...state.instances[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fethcInstancesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fethcInstancesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.instances = action.payload.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
      }));
    });
    builder.addCase(fethcInstancesThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { actions, reducer } = instancesSlice;

export default reducer;
