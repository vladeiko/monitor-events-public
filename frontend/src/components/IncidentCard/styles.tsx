import { Box, Card, styled } from "@mui/material";

export const IncidentCardWrapper = styled(Card)`
  min-height: 240px;
  margin: 16px;
  background-color: ${(props) => props.theme.palette.grey[200]};
`;

export const IncidentDetailsItem = styled(Box)`
  margin-bottom: 12px;
`;
