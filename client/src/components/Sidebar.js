import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StoreIcon from "@mui/icons-material/Store";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import InventoryIcon from "@mui/icons-material/Inventory";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../appStore";
import { useSelector, useDispatch } from "react-redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useTranslation } from "react-i18next";
import { removeCurrentRequestPage } from "../State/ReduxToolkit/Slices/requestSlice";

const drawerWidth = "fit-content";

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  minWidth: 56,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: 56,
  [theme.breakpoints.up("sm")]: {
    width: 56,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  width: 56,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: "ease-in-out 0.5s",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LogOutContainer = styled(ListItem)({
  position: "absolute",
  bottom: "0",
  left: "0",
});

export default function Sidebar() {
  const theme = useTheme();
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useAppStore((state) => state.dopen);
  const location = useLocation();
  const { languange } = useSelector((state) => state.languange);
  const isActive = (route) => location.pathname.startsWith(`/${route}`);
  const user = useSelector((state) => state.user.user);
  const role_name = user.Role ? user.Role.role_name : null;

  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("my_app_store");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open} transitionDuration={600}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List
          sx={{
            height: "100%",
            position: "relative",
            padding: "2",
          }}
        >
          <ListItem
            disablePadding
            sx={{
              display: "block",
              padding: { md: "0px 15px 0px 0px" },
              color: "black",
              background: isActive("home") ? "lightgray" : "transparent",
              borderLeft: isActive("home") ? "3px solid #12596B" : "null",
            }}
            component={Link}
            to="/home"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 1,
                fontSize: "3.2rem",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <HomeIcon sx={{ color: "#12596B" }} />
              </ListItemIcon>
              <ListItemText
                primary={t("sidebar.home")}
                sx={{
                  opacity: open ? 1 : 0,
                  display: { xs: "none", md: "block" },
                  color: "#12596B",
                }}
                primaryTypographyProps={{
                  fontSize: "20px",
                  fontWeight: languange === "en" ? 400 : 900,
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              display: "block",
              padding: { md: "0px 5px 0px 0px" },
              color: "black",
              background: isActive("profile") ? "lightgray" : "transparent",
              borderLeft: isActive("profile") ? "3px solid #12596B" : "null",
            }}
            component={Link}
            to="/profile"
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "#12596B" }} />
              </ListItemIcon>
              <ListItemText
                primary={t("sidebar.profile")}
                sx={{
                  opacity: open ? 1 : 0,
                  display: { xs: "none", md: "block" },
                  color: "#12596B",
                }}
                primaryTypographyProps={{
                  fontSize: "20px",
                  fontWeight: languange === "en" ? 400 : 900,
                }}
              />
            </ListItemButton>
          </ListItem>
          {role_name === "employee" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("userorder") ? "lightgray" : "transparent",
                borderLeft: isActive("userorder")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/userorder"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <LocalGroceryStoreIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.order")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {role_name === "manager" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("userorder") ? "lightgray" : "transparent",
                borderLeft: isActive("userorder")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/userorder"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <BorderColorIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.order")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "admin" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("usersList") ? "lightgray" : "transparent",
                borderLeft: isActive("usersList")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/usersList"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.userlist")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "admin" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("createUser")
                  ? "lightgray"
                  : "transparent",
                borderLeft: isActive("createUser")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/createUser"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PersonAddAlt1Icon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.createuser")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {role_name === "storekeeper" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("history") ? "lightgray" : "transparent",
                borderLeft: isActive("history") ? "3px solid #12596B" : "null",
              }}
              component={Link}
              to="/history"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <InventoryIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.history")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "storehead" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("storemanager")
                  ? "lightgray"
                  : "transparent",
                borderLeft: isActive("storemanager")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/storemanager"
              onClick={() => dispatch(removeCurrentRequestPage())}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <RequestPageIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.request")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "storekeeper" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("storekeeper")
                  ? "lightgray"
                  : "transparent",
                borderLeft: isActive("storekeeper")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/storekeeper"
              onClick={() => dispatch(removeCurrentRequestPage())}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <RequestPageIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.request")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "manager" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("manager") ? "lightgray" : "transparent",
                borderLeft: isActive("manager") ? "3px solid #12596B" : "null",
              }}
              component={Link}
              to="/manager"
              onClick={() => dispatch(removeCurrentRequestPage())}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <RequestPageIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.request")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "storekeeper" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("createproduct")
                  ? "lightgray"
                  : "transparent",
                borderLeft: isActive("createproduct")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/createproduct"
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AddBusinessIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.productcreate")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          {role_name === "storekeeper" && (
            <ListItem
              disablePadding
              sx={{
                display: "block",
                padding: { md: "0px 5px 0px 0px" },
                color: "black",
                background: isActive("allproperty")
                  ? "lightgray"
                  : "transparent",
                borderLeft: isActive("allproperty")
                  ? "3px solid #12596B"
                  : "null",
              }}
              component={Link}
              to="/allproperty"
              onClick={() => dispatch(removeCurrentRequestPage())}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 1,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2.5 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <StoreIcon sx={{ color: "#12596B" }} />
                </ListItemIcon>
                <ListItemText
                  primary={t("sidebar.properties")}
                  sx={{
                    opacity: open ? 1 : 0,
                    display: { xs: "none", md: "block" },
                    color: "#12596B",
                  }}
                  primaryTypographyProps={{
                    fontSize: "20px",
                    fontWeight: languange === "en" ? 400 : 900,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )}

          <LogOutContainer
            disablePadding
            sx={{ display: "block" }}
            onClick={handleLogOut}
          >
            <Divider />
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 1,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2.5 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary={t("sidebar.logout")}
                sx={{
                  opacity: open ? 1 : 0,
                  display: { xs: "none", md: "block" },
                  color: "red",
                }}
                primaryTypographyProps={{
                  fontSize: "20px",
                  fontWeight: languange === "en" ? 400 : 900,
                }}
              />
            </ListItemButton>
          </LogOutContainer>
        </List>
      </Drawer>
    </Box>
  );
}
