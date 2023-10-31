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
  Stack,

} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";

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
    <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box flex={4}>
          <Box padding={1}>
            
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#12596B" }}>Id</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Name</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Email</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Phone</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Job</TableCell>
              <TableCell sx={{ color: "#12596B" }}>Actions</TableCell>
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
                  <IconButton aria-label="Edit" sx={{ color: "#12596B" }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    sx={{ color: "#EF9630" }}
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
          </Box>
        </Stack>
      </Box>
    
  );
};

export default UsersTable;
