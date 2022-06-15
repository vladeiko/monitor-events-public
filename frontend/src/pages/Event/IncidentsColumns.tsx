import { useMemo } from "react";
import IncidentsColumn from "../../components/IncidentsColumn";
import { useAppSelector } from "../../store/hooks";
import { IncidentsColumnsWrapper } from "./styles";

const IncidentsColumns = () => {
  const incidents = useAppSelector((state) => state.events.incidents);
  const userInstance = useAppSelector((state) => state.auth.user?.instance);

  const instanceIncidents = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          incident.instance?.id === userInstance?.id && !incident.isSolved
      ),
    [incidents, userInstance?.id]
  );

  const notSolvedIncidents = useMemo(
    () =>
      incidents.filter(
        (incident) =>
          incident.instance?.id !== userInstance?.id && !incident.isSolved
      ),
    [incidents, userInstance?.id]
  );

  const solvedIncidents = useMemo(
    () => incidents.filter((incident) => incident.isSolved),
    [incidents]
  );

  return (
    <IncidentsColumnsWrapper>
      <IncidentsColumn
        title={userInstance?.name || ""}
        incidents={instanceIncidents.reverse()}
      />
      <IncidentsColumn
        title="Not solved"
        incidents={notSolvedIncidents.reverse()}
      />
      <IncidentsColumn title="Solved" incidents={solvedIncidents.reverse()} />
    </IncidentsColumnsWrapper>
  );
};

export default IncidentsColumns;
