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
  styled,
} from "@mui/material";
import { GET_SINGLE_USER, EDIT_USER } from "../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserError,
  removeEditUser,
} from "../State/ReduxToolkit/Slices/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

const UpdateButton = styled(Button)({
  marginTop: "20px",
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loadingUser, errorUser, editUser } = useSelector(
    (state) => state.user
  );
  const user_name = user.logged_in_user.user_name;
  const singleUser = useSelector((state) => state.user.singleUser);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Non Selected");

  let [profileInfo, setProfileInfo] = useState({
    first_name: singleUser ? singleUser.first_name : "",
    last_name: singleUser ? singleUser.last_name : "",
    password: singleUser ? singleUser.password : "",
    user_name: singleUser ? singleUser.user_name : "",
    // role: singleUser ? singleUser.Role.role_name : "",
    department: singleUser ? singleUser.department : "",
    email: singleUser ? singleUser.email : "",
    phone_number: singleUser ? singleUser.phone_number : "",
    profile_picture: singleUser ? singleUser.profile_picture : "",
  });

  console.log(singleUser);

  const userInformation = [
    { label: "First Name", value: singleUser?.first_name },
    { label: "Last Name", value: singleUser?.last_name },
    { label: "Phone Number", value: singleUser?.phone_number },
    { label: "Email", value: singleUser?.email },
    { label: "User Name", value: singleUser?.user_name },
    { label: "Department", value: singleUser?.department },
  ];
  const handleImageUpload = (event) => {
    // Handle image upload logic here
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch({ type: GET_SINGLE_USER, user_name });
  }, [dispatch]);
  useEffect(() => {
    if (editUser) {
      dispatch({ type: GET_SINGLE_USER, user_name });
    }
  }, [dispatch, editUser, user_name]);

  useEffect(() => {
    if (errorUser || editUser) {
      setTimeout(() => {
        dispatch(removeEditUser());
        dispatch(removeUserError());
      }, 5000);
    }
  }, [errorUser, editUser, dispatch]);

  const handleprofileInfo = (e) => {
    e.preventDefault();
    dispatch({ type: EDIT_USER, profileInfo });
  };

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
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                      sx={{
                        width: { xs: 100, md: 120, xl: 150 },
                        height: { xs: 100, md: 120, xl: 150 },
                        alignSelf: "center",
                        marginBottom: 4,
                      }}
                    />
                    <Box
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      <ClipLoader
                        color={"#36d7b7"}
                        loading={loadingUser}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Box>
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
                    {loadingUser && (
                      <Box sx={{ textAlign: "center" }}>
                        <ClipLoader
                          color={"#36d7b7"}
                          loading={loadingUser}
                          size={50}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </Box>
                    )}

                    {errorUser && (
                      <Box
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          fontSize: " 18px",
                          padding: " 5px 15px",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      >
                        {errorUser}
                      </Box>
                    )}
                    {editUser && (
                      <Box
                        sx={{
                          backgroundColor: "#12596B",
                          color: "white",
                          fontSize: " 18px",
                          padding: " 5px 15px",
                          marginTop: "20px",
                          textAlign: "center",
                        }}
                      >
                        User Updated Successfully
                      </Box>
                    )}
                    <form onSubmit={handleprofileInfo}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={profileInfo.first_name}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={profileInfo.last_name}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone_number"
                        value={profileInfo.phone_number}
                        onChange={handleFormChange}
                        sx={{ backgroundColor: "#f7f7f7", marginTop: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profileInfo.email}
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

                      <UpdateButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                          marginTop: 3,
                          background: "#12596B",
                        }}
                      >
                        Update Profile
                      </UpdateButton>
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
