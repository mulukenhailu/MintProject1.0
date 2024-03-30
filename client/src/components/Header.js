import React, { useState, useEffect, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GET_SINGLE_USER } from "../State/ReduxSaga/Types/userTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppBar = styled(
  MuiAppBar,
  {}
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { t } = useTranslation("global");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notification, setNotification] = useState([]);
  const [notificationLength, setNotificationLength] = useState(0);

  const { user_name, Role } = useSelector((state) => state.user.user);
  const { notificationId } = useSelector((state) => state.notification);

  const { profile_picture } =
    useSelector((state) => state.user.singleUser) || {};

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const prevNotificationId = useRef(notificationId);

  useEffect(() => {
    dispatch({ type: GET_SINGLE_USER, user_name });
  }, []);

  useEffect(() => {
    const getAllOrderList = () => {
      axios
        .get("/employee/notifications", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data.notification);
          setNotification(response?.data?.notification);

          const unViewed = response?.data?.notification?.filter(
            (item) => item.isViwed === false
          );
          const realUnviewed = unViewed?.filter(
            (item) => item.Notify_Id !== notificationId
          );
          setNotificationLength(realUnviewed?.length);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllOrderList();
  }, [notificationId]);

  console.log("unviewd notificatiobs", notificationLength);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("my_app_store");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
        {t("navbar.profile")}
      </MenuItem>
      <MenuItem onClick={handleMenuClose} component={Link} to="/resetpassword">
        {t("navbar.resetpassword")}
      </MenuItem>
      <MenuItem onClick={handleLogOut} component={Link} to="/">
        {t("navbar.logout")}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {Role.role_name === "employee" || Role.role_name === "manager" ? (
        <MenuItem
          component={Link}
          to="/notification"
          onClick={handleProfileMenuOpen}
        >
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={notificationLength} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>{t("navbar.notification")}</p>
        </MenuItem>
      ) : null}

      <MenuItem component={Link} to="/profile" onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("navbar.profile")}</p>
      </MenuItem>
      <MenuItem
        component={Link}
        to="/resetpassword"
        onClick={handleProfileMenuOpen}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("navbar.resetpassword")}</p>
      </MenuItem>
      <MenuItem component={Link} to="/" onClick={handleLogOut}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("navbar.logout")}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        elevation={1}
        style={{
          backgroundColor: "white",
          color: "black",
          height: "70px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: {
                md: "flex",
                justifyContent: "flex-start",
              },
              flex: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              sx={{
                borderRadius: "0px",
              }}
            >
              <Box
                component={Link}
                to={"/home"}
                style={{
                  width: { xs: "200px", md: "350px" },
                  height: "60px",
                  marginLeft: { md: "-500px" },
                }}
              >
                <img
                  src="/assets/mint1.png"
                  alt="NaN"
                  crossOrigin="anonymous"
                  style={{ objectFit: "cover", width: "100%" }}
                />
              </Box>
            </IconButton>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
              },
              flex: 1,
            }}
          >
            {Role.role_name === "employee" || Role.role_name === "manager" ? (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                component={Link}
                to="/notification"
              >
                <Badge
                  badgeContent={notificationLength}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: "red",
                    },
                  }}
                >
                  <NotificationsIcon sx={{ color: "gray" }} />
                </Badge>
              </IconButton>
            ) : null}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {profile_picture && (
                <Avatar
                  alt="MinT"
                  src={`${PF}${profile_picture}`}
                  sx={{ width: 45, height: 45 }}
                />
              )}
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
