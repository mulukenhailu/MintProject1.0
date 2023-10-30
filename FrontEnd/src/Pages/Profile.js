import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (event) => {
    // Handle image upload logic here
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    // <Box
    //   sx={{
    //     paddingLeft: 40,
    //     paddingTop: 5,
    //     paddingRight: 5,
    //     bgcolor: "#f7f7f7",
    //     display: "flex",
    //     height: "100vh",
    //     overflowX: "hidden",
    //   }}
    // >
    <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box flex={4}>
          <Box padding={1}>
            <Grid container spacing={2}>
              {/* First Column: User Profile Display */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                  <Box
                    p={3}
                    textAlign="center"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <Avatar
                      alt="User Image"
                      src="https://avatars.githubusercontent.com/u/110138721?s=400&u=dabde211b1a8dcbe86163b8465a9b96368c2a8ba&v=4"
                      sx={{
                        width: 100,
                        height: 100,
                        alignSelf: "center",
                        marginBottom: 3,
                      }}
                    />
                    <Typography variant="h5" sx={{ marginBottom: 3 }}>
                      User Information
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                      Full Name: Misgan Moges Dereje
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                      Phone Number: +251953263345
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                      Email: user@email.com
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                      Location: Addis Ababa, Ethiopia
                    </Typography>

                    <Typography variant="body1" sx={{ marginBottom: 3 }}>
                      Job: Computer Engineer
                    </Typography>
                    <Button
                      size="small"
                      sx={{ color: "#EF9630", marginTop: 3 }}
                    >
                      Update Profile
                    </Button>
                  </Box>
                </Paper>
              </Grid>
              {/* Second Column: Profile Update Form */}
              <Grid item xs={12} sm={6}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                  <Box p={3}>
                    <Typography variant="h5">Update Profile</Typography>
                    <form onSubmit={handleFormSubmit}>
                      <input
                        type="file"
                        accept="image/*"
                        id="image-upload"
                        name="image"
                        onChange={handleImageUpload}
                      />
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="New User Name"
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="New Email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />

                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          backgroundColor: "#97dce6",
                          color: "white",
                          marginTop: 3,
                        }}
                      >
                        Update Profile
                      </Button>
                    </form>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Stack>
    </Box>
    // </Box>
  );
};

export default UserProfile;
