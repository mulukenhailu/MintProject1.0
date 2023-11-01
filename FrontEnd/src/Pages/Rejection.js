import React, { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography, Stack } from "@mui/material";
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

const Rejection = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    managerFirstName: "",
    managerLastName: "",
    phoneNumber: "",
    role: "",
    reason:"",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = () => {
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
            {/* <Paper elevation={3} sx={{ height: "100%" }}> */}
              {/* <Box
                sx={{
                  
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  height: "100vh",
                  overflowX: "hidden",
                }}
              > */}
                <Grid container>
                  <Paper sx={{ p: 7 }}>
                    <Typography sx={{ marginLeft: 47 }} variant="h6" gutterBottom>
                      Reason for Rejected Request
                    </Typography>
                    
                    <form>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <Grid>
                       
                       <Typography variant="h6" gutterBottom>
                     From
                   </Typography>
                   </Grid>
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
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                          />
                        </Grid>

                     
                    <Grid item xs={12} sm={6}>
                    <Grid>
                       
                       <Typography variant="h6" gutterBottom>
                     To
                   </Typography>
                   </Grid>
                          <TextField
                            label="First Name"
                            name="managerFirstName"
                            value={formData.managerFirstName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Last Name"
                            name="managerLastName"
                            value={formData.managerLastName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                          />
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sx={{ p: 4 }}>
                      <TextField
                            label="Reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            multiline
          rows={4}
                          />

                      </Grid>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#EF9630" }}
                        onClick={handleOrder}
                        fullWidth
                      >
                        Send
                      </Button>
                    </form>
                  </Paper>
                </Grid>
              {/* </Box>
            </Paper> */}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Rejection;
