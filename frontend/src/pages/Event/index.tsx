import { Box, CircularProgress, MenuItem } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIncidentCard from "../../components/AddIncidentCard";
import AddIncidentDialog from "../../components/AddIncidentDialog";
import IncidentsColumn from "../../components/IncidentsColumn";
import FormInput from "../../components/shared/FormInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import fetchIncidentsThunk from "../../store/slices/events/fetchIncidents";
import { fethcInstancesThunk } from "../../store/slices/instances";
import IncidentsColumns from "./IncidentsColumns";
import {
  AddIncidentButtonWrapper,
  AddIncidentWrapper,
  ContentWrapper,
} from "./styles";

const EventPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentEvent = useAppSelector((state) => state.events.currentEvent);
  const isLoading = useAppSelector((state) => state.events.isLoading);
  const instances = useAppSelector((state) => state.instances.instances);
  const incidents = useAppSelector((state) => state.events.incidents);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState("solved");

  const filteredIncidents = useMemo(() => {
    if (selectedInstance === "solved") {
      return incidents.filter((incident) => incident.isSolved);
    }

    return incidents.filter(
      (incident) =>
        incident.instance?.id === +selectedInstance && !incident.isSolved
    );
  }, [incidents, selectedInstance]);

  useEffect(() => {
    if (!currentEvent) {
      navigate("/");
    } else {
      dispatch(fetchIncidentsThunk());
      dispatch(fethcInstancesThunk());
    }
  }, [currentEvent, dispatch, navigate]);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  return (
    <Box>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <AddIncidentButtonWrapper
            variant="contained"
            onClick={handleDialogOpen}
          >
            Add Incident
          </AddIncidentButtonWrapper>
          {!!instances.length && (
            <FormInput
              id="instance"
              name="instance"
              select
              label="Instance"
              variant="filled"
              defaultValue="solved"
              onChange={(e) => setSelectedInstance(e.target.value)}
              sx={{
                margin: "8px",
                minWidth: "300px",
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              {instances.map((instance) => (
                <MenuItem key={instance.id} value={instance.id}>
                  {instance.name}
                </MenuItem>
              ))}
              <MenuItem value="solved">Solved</MenuItem>
            </FormInput>
          )}
          <ContentWrapper>
            <AddIncidentWrapper>
              <AddIncidentCard />
            </AddIncidentWrapper>
            <Box sx={{ width: "100%", display: { xs: "none", md: "block" } }}>
              <IncidentsColumns />
            </Box>
            <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
              <IncidentsColumn incidents={filteredIncidents} />
            </Box>
          </ContentWrapper>
          <AddIncidentDialog
            open={isDialogOpen}
            handleClose={handleDialogClose}
          />
        </Box>
      )}
    </Box>
  );
};

export default EventPage;
