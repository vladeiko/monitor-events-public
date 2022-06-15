import { Box, Button, Typography, styled } from "@mui/material";

export const PageWrapper = styled(Box)`
  width: 100%;
  ${(props) => props.theme.breakpoints.up("lg")} {
    padding-top: 128px;
  }
  ${(props) => props.theme.breakpoints.up("xs")} {
    padding-top: 80px;
  }
`;

export const FormWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`;

export const LogoWrapper = styled(Box)`
  margin-bottom: 32px;
`;

export const WelcomeWrapper = styled(Box)`
  width: 100%;
`;

export const WelcomeTitle = styled(Typography)`
  font-weight: bold;
`;

export const WelcomeSubtitle = styled(Typography)`
  color: ${(props) => props.theme.palette.grey[600]};
`;

export const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 32px;
`;
