import { Box, Button, styled } from "@mui/material";

export const IncidentsColumnsWrapper = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
`;

export const AddIncidentWrapper = styled(Box)`
  ${(props) => props.theme.breakpoints.up("xs")} {
    display: none;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: block;
  }
`;

export const ContentWrapper = styled(Box)`
  width: 100%;
  display: flex;
`;

export const AddIncidentButtonWrapper = styled(Button)`
  margin: 8px;

  ${(props) => props.theme.breakpoints.up("xs")} {
    display: block;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    display: none;
  }
`;
