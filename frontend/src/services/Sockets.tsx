import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { API_SOCKET_URL } from "../constants/env";
import { IEvent } from "../store/slices/events/fetchEvents";
import { actions as eventsActions } from "../store/slices/events";
import {
  actions as instancesActions,
  IInstance,
} from "../store/slices/instances";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { IIncident } from "../store/slices/events/fetchIncidents";
import refetchIncidentsThunk from "../store/slices/events/refetchIncidents";

interface SocketsServiceProps {
  children: React.ReactChild;
}

const SocketsService = (props: SocketsServiceProps) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isAuthorized) {
      if (!socket) {
        setSocket(io(API_SOCKET_URL, { query: { token: accessToken } }));
      }

      if (socket) {
        socket.on("eventCreated", (data: IEvent) => {
          dispatch(eventsActions.addEvent(data));
        });

        socket.on("eventDeleted", (data: number) => {
          dispatch(eventsActions.deleteEvent(data));
        });

        socket.on("eventUpdated", (data: IEvent) => {
          dispatch(eventsActions.updateEvent(data));
        });

        socket.on("incidentCreated", (data: IIncident) => {
          dispatch(refetchIncidentsThunk());
        });

        socket.on("incidentDeleted", (data: number) => {
          dispatch(eventsActions.deleteIncident(data));
        });

        socket.on("incidentUpdated", (data: IIncident) => {
          dispatch(eventsActions.updateIncident(data));
        });

        socket.on("instanceCreated", (data: IInstance) => {
          dispatch(instancesActions.addInstance(data));
        });

        socket.on("instanceDeleted", (data: number) => {
          dispatch(instancesActions.deleteInstance(data));
        });

        socket.on("instanceUpdated", (data: IInstance) => {
          dispatch(instancesActions.updateInstance(data));
        });
      }
    }
  }, [accessToken, dispatch, isAuthorized, socket]);

  return <>{children}</>;
};

export default SocketsService;
