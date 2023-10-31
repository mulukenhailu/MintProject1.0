import React, { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography, Stack } from "@mui/material";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";
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
   
     <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box flex={4}>
          <Box padding={1}>
            
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
              sx={{ backgroundColor: "#f7f7f7" }}
            />
          
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            label="Job"
            name="job"
            value={formData.job}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
            />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
            />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
            />
          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
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
                      </Box>
                    </Stack>
                  </Box>
    
  );
};

export default CreateUser;
