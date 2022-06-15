import { Card, Typography, Divider, Box } from "@mui/material";
import { IIncident } from "../../store/slices/events/fetchIncidents";
import IncidentCard from "../IncidentCard";

interface IncidentsColumnProps {
  title?: string;
  incidents: IIncident[];
}

const IncidentsColumn = (props: IncidentsColumnProps) => {
  const { title, incidents } = props;

  return (
    <Card
      variant="outlined"
      sx={{
        margin: "8px",
        height: { xs: "calc(100vh - 220px)", lg: "calc(100vh - 104px)" },
        overflowY: "scroll",
      }}
    >
      {title && (
        <>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "center" }}
          >
            {title}
          </Typography>
          <Divider />
        </>
      )}
      <Box>
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </Box>
    </Card>
  );
};

export default IncidentsColumn;
