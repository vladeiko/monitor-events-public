import { Typography, styled } from "@mui/material";

export const LogoTypography = styled(Typography)`
  font-size: 32px;
  &:before {
    content: "Monitor";
    color: ${(props) => props.theme.palette.primary.main};
    font-weight: bold;
  }
  &:after {
    content: "Events";
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    &:before {
      content: "M";
    }
    &:after {
      content: "E";
    }
  }
`;
