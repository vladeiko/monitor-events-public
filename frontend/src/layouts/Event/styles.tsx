import { Box, styled } from "@mui/material";

export const LogoWrapper = styled(Box)`
  height: 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
`;

export const EventContentWrapper = styled(Box)`
  padding: 16px;
`;

export const InfoTitleWrapper = styled("b")`
  ${(props) => props.theme.breakpoints.down("sm")} {
    display: none;
  }
`;

export const InfoWrapper = styled("span")`
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-weight: bold;
  }
`;
