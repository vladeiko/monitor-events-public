import { IEvent } from "../store/slices/events/fetchEvents";

export const savedCurrentEvent = JSON.parse(
  localStorage.getItem("currentEvent") || "null"
) as IEvent;
