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
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const UsersTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "User 1",
      email: "user1@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      id: 2,
      name: "User 2",
      email: "user2@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      id: 3,
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      id: 4,
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },
    {
      id: 5,
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },{
      id: 6,
      name: "User 3",
      email: "user3@example.com",
      phone: "+251241472518",
      Job: "computer Engineer",
    },

  ]);

  // Function to handle delete user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <Box
      sx={{
        paddingLeft: 30,

        bgcolor: "#f7f7f7",
        display: "flex",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.Job}</TableCell>
                <TableCell>
                  <IconButton aria-label="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UsersTable;
