import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { savedCurrentEvent } from "../../../constants/savedCurrentEvent";
import fetchEventsThunk from "./fetchEvents";
import { IEvent } from "./fetchEvents";
import fetchIncidentsThunk, { IIncident } from "./fetchIncidents";
import refetchIncidentsThunk from "./refetchIncidents";

export interface EventsState {
  isLoading: boolean;
  events: IEvent[];
  currentEvent: IEvent | null;
  incidents: IIncident[];
}

const initialState: EventsState = {
  isLoading: false,
  events: [],
  currentEvent: savedCurrentEvent,
  incidents: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<IEvent | null>) => {
      state.currentEvent = action.payload;

      localStorage.setItem("currentEvent", JSON.stringify(state.currentEvent));
    },
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events.splice(
        state.events.findIndex((event) => event.id === action.payload),
        1
      );
    },
    updateEvent: (state, action: PayloadAction<IEvent>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id
      );

      if (index > -1) {
        state.events[index] = { ...state.events[index], ...action.payload };
      }
    },
    addIncident: (state, action: PayloadAction<IIncident>) => {
      state.incidents.push(action.payload);
    },
    deleteIncident: (state, action: PayloadAction<number>) => {
      state.incidents.splice(
        state.incidents.findIndex((incident) => incident.id === action.payload),
        1
      );
    },
    updateIncident: (state, action: PayloadAction<IIncident>) => {
      const index = state.incidents.findIndex(
        (incident) => incident.id === action.payload.id
      );

      if (index > -1) {
        state.incidents[index] = {
          ...state.incidents[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchEventsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
      }));
    });
    builder.addCase(fetchEventsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchIncidentsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIncidentsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.incidents = action.payload.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        isSolved: item.attributes.isSolved,
        instance: item.attributes.instance?.data && {
          id: item.attributes.instance.data.id,
          name: item.attributes.instance.data.attributes.name,
        },
        author: {
          id: item.attributes.author.data?.id || -1,
          username:
            item.attributes.author.data?.attributes.username || "No author",
        },
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      }));
    });
    builder.addCase(fetchIncidentsThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(refetchIncidentsThunk.fulfilled, (state, action) => {
      state.incidents = action.payload.data.map((item) => ({
        id: item.id,
        name: item.attributes.name,
        description: item.attributes.description,
        isSolved: item.attributes.isSolved,
        instance: item.attributes.instance?.data && {
          id: item.attributes.instance.data.id,
          name: item.attributes.instance.data.attributes.name,
        },
        author: {
          id: item.attributes.author.data?.id || -1,
          username:
            item.attributes.author.data?.attributes.username || "No author",
        },
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      }));
    });
  },
});

export const { actions, reducer } = eventsSlice;

export default reducer;
