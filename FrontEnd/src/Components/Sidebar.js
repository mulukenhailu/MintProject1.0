// import React from "react";
// import {
//   AccountBox,
//   Lock,
//   Group,
//   Home,
//   AddCircle
// } from "@mui/icons-material";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Link,
//   Paper
// } from "@mui/material";


import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import StorefrontIcon from "@mui/icons-material/Storefront";
import HistoryIcon from "@mui/icons-material/History";

const SideBar = () => {
  const [activeItem, setActiveItem] = useState("Home");
console.log(activeItem)
  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <Box
      flex={1}
      height={"100vh"}
      width={"20%"}
      bgcolor={"#12596B"}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <Box
        position={"fixed"}
        bgcolor={"#12596B"}
        width={"20%"}
        height={"calc(100vh - 75px)"}
      >
        <List>
          <ListItem disablePadding>
            <Link
              to="/home"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background: activeItem === "Home" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Home")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <HomeIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Home"
                  color="secondary"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/profile"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "Profile" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Profile")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <PersonIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/users"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background: activeItem === "User" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("User")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <GroupIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/request"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "Request" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Request")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <RequestPageIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Requests"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/store"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "Store" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Store")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <StorefrontIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Store"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/history"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "History" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("History")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <HistoryIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="History"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/create"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "Create" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Create")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <HistoryIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Create"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <Link
              to="/logout"
              sx={{ textDecoration: "none", color: "#12596B" }}
              component={ListItemButton}
            >
              <ListItemButton
                sx={{
                  background:
                    activeItem === "Logout" ? "#00695F" : "transparent",
                }}
                onClick={() => handleItemClick("Logout")}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  <HistoryIcon sx={{ fontSize: "30px" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{ fontSize: "25px", color: "white" }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SideBar;
// const Sidebar = ({ }) => {
//   return (
//     <Box flex={1} sx={{ display: { xs: "none", md: "block" } }}>
//       <Paper
//         sx={{
//           backgroundColor: "#fff",
//           height: "100%",
//           width: "18%",
//           boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.3)",
//           position: "fixed",
//           border: "2px solid #f0a94d",
//         }}
//       >
//         <List>
//           <ListItem disablePadding>
//             <Link
//               to="/"
//               sx={{ textDecoration: "none", color: "#12596B" }}
//               component={ListItemButton}
//             >
//               <ListItemIcon sx={{ color: "#EF9630" }}>
//                 <Home />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Home"
//                 primaryTypographyProps={{ fontSize: "24px" }}
//               />
//             </Link>
//           </ListItem>
//           <ListItem disablePadding>
//             <Link
//               to="/profile"
//               sx={{ textDecoration: "none", color: "#12596B" }}
//               component={ListItemButton}
//             >
//               <ListItemIcon sx={{ color: "#EF9630" }}>
//                 <AccountBox />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Profile"
//                 primaryTypographyProps={{ fontSize: "24px" }}
//               />
//             </Link>
//           </ListItem>
//           <ListItem disablePadding>
//             <Link
//               to="/users"
//               sx={{ textDecoration: "none", color: "#12596B" }}
//               component={ListItemButton}
//             >
//               <ListItemIcon sx={{ color: "#EF9630" }}>
//                 <Group />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Users"
//                 primaryTypographyProps={{ fontSize: "24px" }}
//               />
//             </Link>
//           </ListItem>
//           <ListItem disablePadding>
//             <Link
//               to="/create"
//               sx={{ textDecoration: "none", color: "#12596B" }}
//               component={ListItemButton}
//             >
//               <ListItemIcon sx={{ color: "#EF9630" }}>
//                 <AddCircle />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Create"
//                 primaryTypographyProps={{ fontSize: "24px" }}
//               />
//             </Link>
//           </ListItem>
//           <ListItem disablePadding>
//             <Link
//               to="/logout"
//               sx={{ textDecoration: "none", color: "#12596B" }}
//               component={ListItemButton}
//             >
//               <ListItemIcon sx={{ color: "#EF9630" }}>
//                 <Lock />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Log out"
//                 primaryTypographyProps={{ fontSize: "24px" }}
//               />
//             </Link>
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default Sidebar;
