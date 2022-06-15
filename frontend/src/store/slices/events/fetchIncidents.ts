import { createAsyncThunk } from "@reduxjs/toolkit";
import qs from "qs";
import { axiosService } from "../../../services/axios";
import { RootState } from "../../store";
import { IInstance } from "../instances";

export interface IIncidentAuthor {
  id: number;
  username: string;
}

export interface IIncidentsResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      description: string;
      name: string;
      isSolved: boolean;
      instance?: {
        data: {
          id: number;
          attributes: {
            name: string;
          };
        };
      };
      author: {
        data: {
          id: number;
          attributes: {
            username: string;
          }
        }
      }
    };
  }[];
}

export interface IIncident {
  id: number;
  name: string;
  description: string;
  instance?: IInstance;
  createdAt: string;
  updatedAt: string;
  isSolved: boolean;
  author: IIncidentAuthor;
}

const fetchIncidentsThunk = createAsyncThunk<
  IIncidentsResponse,
  void,
  { state: RootState }
>("events/fetchIncidents", async (_, { rejectWithValue, getState }) => {
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

export default fetchIncidentsThunk;
