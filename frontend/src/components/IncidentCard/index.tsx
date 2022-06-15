import { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { axiosService } from "../../services/axios";
import { IIncident } from "../../store/slices/events/fetchIncidents";
import IncidentTitle from "./IncidentTitle";
import { IncidentCardWrapper, IncidentDetailsItem } from "./styles";
import IncidentDescription from "./IncidentDescription";

interface IncidentCardProps {
  incident: IIncident;
}

const IncidentCard = (props: IncidentCardProps) => {
  const { incident } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSolved = () => {
    if (isLoading) return;

    setIsLoading(true);

    axiosService
      .put(`/incidents/${incident.id}`, {
        data: {
          isSolved: !incident.isSolved,
        },
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <IncidentCardWrapper
      sx={{ minHeight: "240px", margin: "16px" }}
      variant="outlined"
    >
      <CardContent>
        <Box>
          <IncidentTitle incident={incident} />
          <Divider sx={{ marginBottom: "8px" }} />
          <IncidentDetailsItem>
            <IncidentDescription incident={incident} />
          </IncidentDetailsItem>
          <IncidentDetailsItem>
            <Typography variant="subtitle2">Author:</Typography>
            <Typography variant="body2">{incident.author.username}</Typography>
          </IncidentDetailsItem>
          <IncidentDetailsItem>
            <Typography variant="subtitle2">For:</Typography>
            <Typography variant="body2">
              {incident.instance?.name || "No instance"}
            </Typography>
          </IncidentDetailsItem>
        </Box>
        {!incident.isSolved && (
          <Button
            variant="outlined"
            onClick={handleChangeSolved}
            sx={{
              width: "100%",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {isLoading ? <CircularProgress /> : "Mark as Solved"}
          </Button>
        )}
        {incident.isSolved && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleChangeSolved}
            sx={{
              width: "100%",
              backgroundColor: (theme) => theme.palette.background.default,
            }}
          >
            {isLoading ? <CircularProgress /> : "Mark as Not Solved"}
          </Button>
        )}
      </CardContent>
    </IncidentCardWrapper>
  );
};

export default IncidentCard;
