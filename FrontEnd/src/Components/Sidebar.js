import {
  AccountBox,
  Lock,
  Group,
  Home,
  Person,
  Settings,
  Storefront,
} from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
  Paper
} from "@mui/material";
import React from "react";

const Sidebar = ({ }) => {
  return (
    <Box flex={1} sx={{ display: { xs: "none", sm: "block" } }}>
      <Paper
        sx={{
          backgroundColor: "#97dce6",
          height: "100%",
          width:"18%",
          boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.3)",
          position: "fixed",
          
        }}
      >
        <List>
          <ListItem disablePadding>
            <Link
              to="/home"
              sx={{ textDecoration: "none", color: "#000" }}
              component={ListItemButton}
            >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Homepage" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile"
              sx={{ textDecoration: "none", color: "#000" }}
              component={ListItemButton}
            >
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/users"
              sx={{ textDecoration: "none", color: "#000" }}
              component={ListItemButton}
            >
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/logout"
              sx={{ textDecoration: "none", color: "#000" }}
              component={ListItemButton}
            >
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </Link>
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Sidebar;
