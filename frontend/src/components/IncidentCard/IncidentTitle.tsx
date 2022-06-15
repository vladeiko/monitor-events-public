import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IIncident } from "../../store/slices/events/fetchIncidents";
import { axiosService } from "../../services/axios";
import FormInput from "../shared/FormInput";

interface IncidentTitleProps {
  incident: IIncident;
}

const IncidentTitle = (props: IncidentTitleProps) => {
  const { incident } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [inputValue, setInputValue] = useState(incident.name);

  const handleDelete = () => {
    if (isLoading) return;

    setIsLoading(true);

    axiosService.delete(`/incidents/${incident.id}`).then(() => {
      setIsLoading(false);
    });
  };

  const handleSave = () => {
    if (isLoading) return;

    setIsLoading(true);

    axiosService
      .put(`/incidents/${incident.id}`, {
        data: {
          name: inputValue,
        },
      })
      .then(() => {
        setIsLoading(false);
        setIsEdit(false);
      });
  };

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {isEdit ? (
        <FormInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          sx={{ marginBottom: "4px" }}
        />
      ) : (
        <Typography gutterBottom variant="h6" component="div">
          {incident.name} {incident.isSolved && "✅"}
        </Typography>
      )}
      <Box sx={{ display: "flex" }}>
        {isEdit && (
          <IconButton sx={{ marginBottom: "8px" }} onClick={handleSave}>
            <CheckCircleIcon />
          </IconButton>
        )}
        <IconButton sx={{ marginBottom: "8px" }} onClick={handleEdit}>
          {isEdit ? <CancelIcon /> : <EditIcon />}
        </IconButton>
        {!isEdit && (
          <IconButton sx={{ marginBottom: "8px" }} onClick={handleDelete}>
            <DeleteForeverIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default IncidentTitle;
