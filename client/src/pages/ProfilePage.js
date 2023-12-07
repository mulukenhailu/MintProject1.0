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
                      src="data:image/png;base64,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"
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
