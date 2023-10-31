// import { Mail, Notifications, Pets } from "@mui/icons-material";
// import MenuIcon from "@mui/icons-material/Menu";
// import {
//   AppBar,
//   Avatar,
//   Badge,
//   Box,
//   InputBase,
//   Menu,
//   MenuItem,
//   styled,
//   Toolbar,
//   Typography,
//   Link,
//   Drawer
// } from "@mui/material";
// import React, { useState } from "react";
// const StyledToolbar = styled(Toolbar)({
//   display: "flex",
//   justifyContent: "space-between",
// });

// const Search = styled("div")(({ theme }) => ({
//   backgroundColor: "#fcffff",
//   padding: "0 10px",
//   borderRadius: theme.shape.borderRadius,
//   width: "30%",
// }));

// const Icons = styled(Box)(({ theme }) => ({
//   display: "none",
//   alignItems: "center",
//   gap: "20px",
//   [theme.breakpoints.up("sm")]: {
//     display: "flex",
//   },
// }));

// const UserBox = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   gap: "10px",
//   [theme.breakpoints.up("sm")]: {
//     display: "none",
//   },
// }));

// const Sidebar = styled(Drawer)(({ theme }) => ({
//   [theme.breakpoints.up("sm")]: {
//     display: "none",
//   },
// }));
// const Header = () => {
//   const [open, setOpen] = useState(false);

//   const toggleSidebar = () => {
//     setOpen(!open);
//   };
//   return (
//     <AppBar position="sticky" sx={{ bgcolor: "#f7f7f7" }}>
//       <StyledToolbar>
//         <Link href="/">
//           <Box
//             component="img"
//             sx={{
//               display: { xs: "none", sm: "block" },
//               height: 100,
//               width: 100,
//               borderRadius: 50,
//             }}
//             alt="Logo"
//             src="/assets/Logo.jpg"
//           />
//         </Link>
//         {/* <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
//           MinT
//         </Typography> */}
//         <MenuIcon
//           onClick={toggleSidebar}
//           sx={{
//             color: "#000",
//             height: 30,
//             width: 30,
//             display: { xs: "block", sm: "none" },
//           }}
//         />
//         <Search>
//           <InputBase placeholder="search..." />
//         </Search>
//         <Icons>
//           <Badge badgeContent={4} color="error">
//             <Mail sx={{ color: "#12596B" }} />
//           </Badge>
//           <Badge badgeContent={2} color="error">
//             <Notifications sx={{ color: "#12596B" }} />
//           </Badge>
//           <Avatar
//             sx={{ width: 30, height: 30, color: "#12596B" }}
//             src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//             onClick={(e) => setOpen(true)}
//           />
//         </Icons>
//         <UserBox onClick={(e) => setOpen(true)}>
//           <Avatar
//             sx={{ width: 30, height: 30 }}
//             src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//           />
//           <Typography variant="span">John</Typography>
//         </UserBox>
//       </StyledToolbar>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         open={open}
//         onClose={(e) => setOpen(false)}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <MenuItem>Profile</MenuItem>
//         <MenuItem>My account</MenuItem>
//         <MenuItem>Logout</MenuItem>
//       </Menu>
//     </AppBar>
//   );
// };
// export default Header
import React, { useState } from "react";
import {
  AppBar,
  Typography,
  styled,
  InputBase,
  Box,
  InputAdornment,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Toolbar,
  MenuList,
  Link
} from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
// icons for the menu @ small screens
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [open, setOpen] = useState(false);
  const NavBarLeft = styled(Box)({});

  const NavBarMiddle = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "20px",
  });

  const NavBarRight = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "20px",
  });

  const MenuItemContainer = styled(MenuItem)({
    width: "150px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: "76px",
        display: "flex",
        alignItems: "center",
        padding: "0px 20px",
        bgcolor: "#12596B",
        borderBottom: "0.5px solid black",
      }}
    >
      <Toolbar
        sx={{
          width: "99%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
       
        <Link href="/home">
          <Box
            component="img"
            sx={{
              display: { xs: "none", sm: "block" },
              height: 60,
              width: 60,
              borderRadius: 50,
            }}
            alt="Logo"
            src="/assets/Logo.jpg"
          />
        </Link>

        <NavBarMiddle>
          <StorefrontIcon style={{ fontSize: "40px" }} />
          <Typography variant="h5">MinT_Store</Typography>
        </NavBarMiddle>
        <NavBarRight>
          <Badge
            badgeContent={3}
            color="secondary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <ChatIcon color="white" />
          </Badge>
          <Badge
            badgeContent={4}
            color="secondary"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <NotificationsIcon color="white" />
          </Badge>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            User_Name
          </Typography>
          <Avatar
            src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            sx={{
              width: "50px",
              height: "50px",
              display: { xs: "none", md: "block" },
            }}
          />
          <MenuIcon
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          />
        </NavBarRight>
        <Menu
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ width: "550px" }}
        >
          <MenuItemContainer>
            <HomeIcon />
            <Typography>Home</Typography>
          </MenuItemContainer>
          <MenuItemContainer>
            <PersonIcon />
            <Typography>Profile</Typography>
          </MenuItemContainer>
          <MenuItemContainer>
            <GroupIcon />
            <Typography>Users</Typography>
          </MenuItemContainer>
          <MenuItemContainer>
            <RequestPageIcon />
            <Typography>Requests</Typography>
          </MenuItemContainer>
          <MenuItemContainer>
            <StorefrontIcon />
            <Typography>Store</Typography>
          </MenuItemContainer>
          <MenuItemContainer>
            <HistoryIcon />
            <Typography>History</Typography>
          </MenuItemContainer>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
