import { useState } from "react";
import { AppBar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import Logo from "../../components/shared/Logo";
import { useAppDispatch } from "../../store/hooks";
import { LogoWrapper, ProfileContentWrapper } from "./styles";
import { actions as authActions } from "../../store/slices/auth";

const ProfileLayout = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </LogoWrapper>
      </AppBar>
      <ProfileContentWrapper>
        <Outlet />
      </ProfileContentWrapper>
    </Box>
  );
};

export default ProfileLayout;
