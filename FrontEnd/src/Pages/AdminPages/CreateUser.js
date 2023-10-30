import React, { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    job: "",
    username: "",
    password: "",
    role: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateUser = () => {
    // Handle form submission here
    console.log(formData); // You can replace this with your API call or state update logic
  };

  return (
    <Box
      sx={{
        paddingLeft: 40,
        bgcolor: "#f7f7f7",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Paper elevation={3} sx={{ padding: 2, width: "600px", margin: "20px" }}>
        <Typography variant="h6" gutterBottom>
          Create User
        </Typography>
        <form>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Job"
            name="job"
            value={formData.job}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#97dce6" }}
            onClick={handleCreateUser}
            fullWidth
          >
            Create
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateUser;
