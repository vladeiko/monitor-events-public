import { Card, CardContent, Divider, Typography } from "@mui/material";
import AddIncidentForm from "../AddIncidentForm";

const AddIncidentCard = () => {
  return (
    <Card variant="outlined" sx={{ margin: "8px", width: { lg: "320px" } }}>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        sx={{ textAlign: "center" }}
      >
        Add Incident
      </Typography>
      <Divider />
      <CardContent>
        <AddIncidentForm />
      </CardContent>
    </Card>
  );
};

export default AddIncidentCard;
