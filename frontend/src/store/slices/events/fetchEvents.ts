import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosService } from "../../../services/axios";

export interface IEventsResponse {
  data: {
    id: number;
    attributes: {
      name: string;
    };
  }[];
}

export interface IEvent {
  id: number;
  name: string;
}

const fetchEventsThunk = createAsyncThunk(
  "events/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosService.get<IEventsResponse>("/events");
      return res.data;
    } catch {
      throw rejectWithValue("Error");
    }
  }
);

export default fetchEventsThunk;
