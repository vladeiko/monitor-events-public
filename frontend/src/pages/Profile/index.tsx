import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { actions as eventsActions } from "../../store/slices/events";
import fetchEventsThunk, {
  IEvent,
} from "../../store/slices/events/fetchEvents";
import { fethcInstancesThunk } from "../../store/slices/instances";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const events = useAppSelector((state) => state.events.events);
  const isLoading = useAppSelector((state) => state.events.isLoading);

  useEffect(() => {
    dispatch(fetchEventsThunk());
    dispatch(fethcInstancesThunk());
  }, [dispatch]);

  const handleOpenEvent = (event: IEvent) => {
    dispatch(eventsActions.setCurrentEvent(event));
    navigate("/event");
  };

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events?.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>{event.id}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      onClick={() => handleOpenEvent(event)}
                    >
                      Open
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProfilePage;
