import React, { useState } from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import UserDetailModal from "./UserDetailModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserList = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [users, setUsers] = useState([
    {
      UserName: "MinT - 1",
      name: "User 1",
      email: "user1@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
    {
      UserName: "MinT - 2",
      name: "User 2",
      email: "user2@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
    {
      UserName: "MinT - 3",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
    {
      UserName: "MinT - 4",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
    {
      UserName: "MinT - 5",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
    {
      UserName: " MinT - 6",
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      department: "computer Engineer",
    },
  ]);

  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={3} paddingBottom={5}>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                First Name
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Last Name
              </TableCell>
              <TableCell sx={{ color: "#12596B" }}>UserName</TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", lg: "table-cell" },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  display: { xs: "none", lg: "table-cell" },
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
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  {user.name}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  {user.name}
                </TableCell>
                <TableCell>{user.UserName}</TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.email}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.phone}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                  {user.department}
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "#EF9630" }}
                    onClick={() => setEditModal(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    sx={{ color: "red" }}
                    onClick={() => setDeleteModal(true)}
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
      <UserDetailModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
      />
      <EditUserModal editModal={editModal} setEditModal={setEditModal} />
      <DeleteUserModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </Box>
  );
};

export default UserList;
