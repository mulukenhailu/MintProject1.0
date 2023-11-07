import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import { GET_SINGLE_USER } from "../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user_name } = useSelector((state) => state.user.user.logged_in_user);

  useEffect(() => {
    dispatch({ type: GET_SINGLE_USER, user_name });
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Non Selected");

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

  const singleUser = useSelector((state) => state.user.singleUser);

  const userInformation = [
    { label: "First Name", value: singleUser?.first_name },
    { label: "Last Name", value: singleUser?.last_name },
    { label: "Phone Number", value: singleUser?.phone_number },
    { label: "Email", value: singleUser?.email },
    { label: "User Name", value: singleUser?.user_name },
    { label: "Department", value: singleUser?.department },
  ];

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "16px 8px 32px 32px" }}
        >
          <Box paddingLeft={{ xs: 12, md: 20 }} paddingTop={3}>
            <Grid container spacing={2}>
              {/* First Column: User Profile Display */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: {
                      xs: "40px",
                      md: "0px",
                    },
                  }}
                >
                  <Box
                    textAlign="center"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <Avatar
                      alt="User Image"
                      src=""
                      sx={{
                        width: { xs: 100, md: 120, xl: 150 },
                        height: { xs: 100, md: 120, xl: 150 },
                        alignSelf: "center",
                        marginBottom: 4,
                      }}
                    />
                    <TableContainer sx={{ width: "100%" }}>
                      <Table>
                        <TableBody>
                          {userInformation.map((row, index) => (
                            <TableRow
                              key={row.label}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "#f0f0f0",
                                },
                                padding: 2,
                              }}
                            >
                              <TableCell>{row.label}</TableCell>
                              <TableCell>{row.value}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Paper>
              </Grid>
              {/* Second Column: Profile Update Form */}
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ height: "100%" }}>
                  <Box p={2}>
                    <Typography variant="h5">Update Profile</Typography>
                    <form onSubmit={handleFormSubmit}>
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
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />

                      <div
                        style={{
                          padding: "2rem",
                          background: "#f0f0f0",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                          border: "2px dashed #97dce6",
                          height: "130px",
                          width: "130px",
                          cursor: "pointer",
                          borderRadius: "5px",
                          cursor: "pointer",
                          margin: "1.5rem auto",
                        }}
                        onMouseEnter={(event) => {
                          event.target.style.border = "2px solid #97dce6";
                        }}
                        onMouseLeave={(event) => {
                          event.target.style.border = "2px dashed #97dce6";
                        }}
                      >
                        <label
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setFileName(file?.name);

                              if (file) {
                                const reader = new FileReader();

                                reader.onload = (event) => {
                                  const imageUrl = event.target.result;
                                  setImage(imageUrl);
                                };

                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          {image ? (
                            <img
                              src={image}
                              width={150}
                              height={150}
                              alt="fileName"
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <CloudUploadIcon
                                style={{
                                  color: "#12596B",
                                  fontSize: 50,
                                  cursor: "pointer",
                                }}
                              />
                              <span
                                style={{
                                  fontSize: 10,
                                  marginTop: 5,
                                  cursor: "pointer",
                                }}
                              >
                                Upload Image
                              </span>
                            </div>
                          )}
                        </label>
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          marginTop: 3,
                          background: "#12596B",
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
      </Box>
    </>
  );
};

export default ProfilePage;
