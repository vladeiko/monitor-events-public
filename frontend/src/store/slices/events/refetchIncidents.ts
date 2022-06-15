import { createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
import { axiosService } from "../../../services/axios";
import { RootState } from "../../store";
import { IIncidentsResponse } from "./fetchIncidents";

const refetchIncidentsThunk = createAsyncThunk<
  IIncidentsResponse,
  void,
  { state: RootState }
>("events/refetchfetchIncidents", async (_, { rejectWithValue, getState }) => {
  try {
    const state = await getState();

    const query = qs.stringify(
      {
        populate: "*",
        filters: {
          event: {
            id: {
              $eq: state.events.currentEvent?.id,
            },
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    const res = await axiosService.get<IIncidentsResponse>(
      `/incidents/?${query}`
    );
    return res.data;
  } catch {
    throw rejectWithValue("Error");
  }
});

export default refetchIncidentsThunk;
