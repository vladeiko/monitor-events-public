import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IIncident } from "../../store/slices/events/fetchIncidents";
import FormInput from "../shared/FormInput";
import { axiosService } from "../../services/axios";

interface IncidentDescriptionProps {
  incident: IIncident;
}

const IncidentDescription = (props: IncidentDescriptionProps) => {
  const { incident } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [inputValue, setInputValue] = useState(incident.description);

  const truncate = (str: string, n = 200) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const getDescription = () => {
    if (incident.description) {
      return truncate(incident.description);
    }

    return "No description";
  };

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleSave = () => {
    if (isLoading) return;

    setIsLoading(true);

    axiosService
      .put(`/incidents/${incident.id}`, {
        data: {
          description: inputValue,
        },
      })
      .then(() => {
        setIsLoading(false);
        setIsEdit(false);
      });
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 0",
        }}
      >
        <Typography variant="subtitle2">Description:</Typography>
        <Box>
          {isEdit && (
            <IconButton sx={{ padding: "0px" }} onClick={handleSave}>
              <CheckCircleIcon />
            </IconButton>
          )}
          <IconButton sx={{ padding: "0px" }} onClick={handleEdit}>
            {isEdit ? <CancelIcon /> : <EditIcon />}
          </IconButton>
        </Box>
      </Box>
      {isEdit ? (
        <FormInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          multiline
          rows={4}
        />
      ) : (
        <Typography sx={{ wordWrap: "break-word" }} variant="body2">
          {getDescription()}
        </Typography>
      )}
    </Box>
  );
};

export default IncidentDescription;
