import React, { useState } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Modal,
  styled,
  ListItem,
  List,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";

const UserList = () => {
  const [detailModal, setDetailModal] = useState(false);
  const UserDetailContainer = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const UserDetailContainerWrapper = styled(Box)({
    background: "#fff",
    height: "fit-content",
    borderRadius: "20px",
    padding: "20px",
  });

  const ListItemForModal = styled(ListItem)({
    display: "flex",
    alignItems: "center",
  });
  const [users, setUsers] = useState([
    {
      UserName: "MinT - 1",
      name: "User 1",
      email: "user1@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      UserName: "MinT - 2",
      name: "User 2",
      email: "user2@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      UserName: "MinT - 3",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      UserName: "MinT - 4",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      UserName: "MinT - 5",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      UserName: " MinT - 6",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
  ]);
  // Function to handle delete user
  const handleDeleteUser = (userName) => {
    setUsers(users.filter((user) => user.UserName !== userName));
  };
  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={3} paddingBottom={5}>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell sx={{ color: "#12596B" }}>Name</TableCell>
              <TableCell sx={{ color: "#12596B" }}>UserName</TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Phone
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", lg: "table-cell" },
                }}
              >
                Department
              </TableCell>
              <TableCell sx={{ color: "#12596B" }}>Edit</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Delete</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.UserName}</TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {user.phone}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.Job}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="Edit" sx={{ color: "#EF9630" }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "red" }}
                    aria-label="Delete"
                    onClick={() => handleDeleteUser(user.UserName)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <SettingsAccessibilityIcon
                    sx={{ color: "blue" }}
                    onClick={() => setDetailModal(true)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDetailContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserDetailContainerWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ textDecoration: "underline" }}
            >
              User-Details
            </Typography>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                User-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                MinT-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Name
              </Typography>
              <Typography variant="body2" flex={1}>
                User-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Department
              </Typography>
              <Typography variant="body2" flex={1}>
                Department-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Manager-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                Manager-1
              </Typography>
            </ListItemForModal>
          </List>
        </UserDetailContainerWrapper>
      </UserDetailContainer>
    </Box>
  );
};

export default UserList;
