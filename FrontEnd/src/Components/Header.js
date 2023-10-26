import { Mail, Notifications, Pets } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
  Link,
  Drawer
} from "@mui/material";
import React, { useState } from "react";
import logo from "../assets/Logo.jpg";
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "#fcffff",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "30%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Sidebar = styled(Drawer)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));
const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#f7f7f7" }}>
      <StyledToolbar>
        <Link href="/">
          <Box
            component="img"
            sx={{
              display: { xs: "none", sm: "block" },
              height: 100,
              width: 100,
              borderRadius: 50,
            }}
            alt="Logo"
            src={logo}
          />
        </Link>
        {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          MinT
        </Typography> */}
        <MenuIcon
          onClick={toggleSidebar}
          sx={{
            color: "#000",
            height: 30,
            width: 30,
            display: { xs: "block", sm: "none" },
          }}
        />
        <Search>
          <InputBase placeholder="search..." />
        </Search>
        <Icons>
          <Badge badgeContent={4} color="error">
            <Mail sx={{ color: "#97dce6" }} />
          </Badge>
          <Badge badgeContent={2} color="error">
            <Notifications sx={{ color: "#97dce6" }} />
          </Badge>
          <Avatar
            sx={{ width: 30, height: 30, color: "#97dce6" }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            onClick={(e) => setOpen(true)}
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
          <Typography variant="span">John</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;
