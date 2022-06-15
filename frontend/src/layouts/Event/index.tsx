import { useState } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  LogoWrapper,
  EventContentWrapper,
  InfoTitleWrapper,
  InfoWrapper,
} from "./styles";
import { actions as authActions } from "../../store/slices/auth";
import { actions as eventsActions } from "../../store/slices/events";

const EventLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentEvent = useAppSelector((state) => state.events.currentEvent);
  const userInstance = useAppSelector((state) => state.auth.user?.instance);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    dispatch(eventsActions.setCurrentEvent(null));
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    handleClose();
  };

  return (
    <Box>
      <AppBar position="static" color="default">
        <LogoWrapper>
          <Logo />
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ marginRight: "16px" }}>
              <InfoTitleWrapper>Event:</InfoTitleWrapper>
              <InfoWrapper>{currentEvent?.name}</InfoWrapper>
            </Typography>
            <Typography>
              <InfoTitleWrapper>Instance:</InfoTitleWrapper>
              <InfoWrapper>{userInstance?.name}</InfoWrapper>
            </Typography>
          </Box>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </LogoWrapper>
      </AppBar>
      <EventContentWrapper>
        <Outlet />
      </EventContentWrapper>
    </Box>
  );
};

export default EventLayout;
