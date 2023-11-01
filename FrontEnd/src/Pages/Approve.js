import React, { useState } from "react";
import { Box, TextField, Button, Grid, Paper, Typography, Stack } from "@mui/material";
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

const Approve = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    model: "",
    username: "",
    password: "",
    role: "",
    userRole: "",
    directorRole:"",
    directorFirstName: "",
    directorLastName: "",

  });



  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [deviceData,setDeviceData]=useState({
    serial:"",
    type:"",
    model:"",
    quantity:"",
    description:"",
  })
  const handleDeviceFormChange=(event)=>{
    const {name,value}=event.target;
    setDeviceData({
      ...deviceData,
      [name]:value,
    });
  }
  const handleApprove = () => {
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
                      Approval For Device
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
                            name="directorFirstName"
                            value={formData.directorFirstName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                            label="Last Name"
                            name="directorLastName"
                            value={formData.directorLastName}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                          />
                          <TextField
                          label="Role"
                          name="directorRole"
                          value={formData.directorRole}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        </Grid>
                      </Grid>




                      <Typography sx={{ marginLeft: 47, marginTop: 7,marginBottom:1 }} variant="h6" gutterBottom>
                      Approved For
                    </Typography>



                      <Grid item xs={12} sx={{ p: 7 }}>
                        <TextField
                          label="User First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="User Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="User Phone Number"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                       
                        <TextField
                          label="User Role"
                          name="userRole"
                          value={formData.userRole}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                      </Grid>
                     




                      <Typography sx={{ marginLeft: 47, marginTop: 7,marginBottom:1 }} variant="h6" gutterBottom>
                      Property Issued
                    </Typography>



                      <Grid item xs={12} sx={{ p: 7 }}>
                        <TextField
                          label="Serial Number"
                          name="serial"
                          value={deviceData.serial}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Enter Type of Property"
                          name="type"
                          value={deviceData.type}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Enter Model"
                          name="model"
                          value={deviceData.model}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Enter Quantity"
                          name="quantity"
                          value={deviceData.quantity}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                        <TextField
                          label="Enter Description"
                          name="description"
                          value={deviceData.description}
                          onChange={handleFormChange}
                          fullWidth
                          margin="normal"
                        />
                       
                       
                      </Grid>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "#EF9630" }}
                        onClick={handleApprove}
                        fullWidth
                      >
                        Approve
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

export default Approve;
