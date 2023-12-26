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
  InputLabel,
} from "@mui/material";
import { GET_SINGLE_USER, EDIT_USER } from "../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserError,
  removeEditUser,
  removeSingleUser,
  getSingleUserStart,
  getSingleUserSuccess,
  getSingleUserFail,
  editUserStart,
  editUserSuccess,
  editUserFail,
} from "../State/ReduxToolkit/Slices/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { UPLOAD_IMAGE } from "../State/ReduxSaga/Types/uploadImageType";
import axios from "axios";
import { removeUploadImage } from "../State/ReduxToolkit/Slices/uploadImageSlice";

const UpdateButton = styled(Button)({
  marginTop: "20px",
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const [responseEdit, setResponseEdit] = useState(false);
  const [errorGet, setErrorGet] = useState(false);
  const { uploadedImage, loadingUploadingImage, errorImage } = useSelector(
    (state) => state.upload
  );

  useEffect(() => {
    dispatch(removeUploadImage());
  }, []);

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
    const sendImage = formData.get("image");
    dispatch({ type: UPLOAD_IMAGE, sendImage });
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const [profileInfo, setProfileInfo] = useState({});
  const userInformation = [
    { label: "First Name", value: user?.first_name },
    { label: "Last Name", value: user?.last_name },
    { label: "Email", value: user?.email ? user?.email : "Email not provided" },
    {
      label: "Phone Number",
      value: user?.phone_number ? user?.phone_number : "Phone not provided",
    },
    { label: "Department", value: user?.department },
    { label: "User Name", value: user?.user_name },
    { label: "Role", value: user?.Role?.role_name },
    { label: "Manager ", value: user?.manager_username },
  ];

  const { user_name } = useSelector((state) => state.user.user);
  console.log("user", user);
  console.log("profileInfo", profileInfo);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(getSingleUserStart());
    setLoadingGet(true);
    axios
      .post(`/getuserinfo/${user_name}`, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(getSingleUserSuccess(response.data));
        setUser(response.data);
        setProfileInfo({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email || "",
          phone_number: response.data.phone_number || "",
          profile_picture: response.data.profile_picture || "",
          user_name: response.data.user_name,
          department: response.data.department || "",
          Role: response.data.Role.role_name,
          manager_username: response.data.manager_username || "",
        });
        setLoadingGet(false);
        console.log(response.data);
      })
      .catch((error) => {
        dispatch(getSingleUserFail());
        setLoadingGet(false);
        setErrorGet(true);
        setTimeout(() => {
          setErrorGet(false);
        }, 5000);
        console.log(error);
      });
  }, []);

  console.log("set profile", profileInfo);

  const handleUpdateProfile = () => {
    let updatedProfileInfo = { ...profileInfo };

    console.log("updatedProfile", updatedProfileInfo);
    if (uploadedImage) {
      updatedProfileInfo = {
        ...updatedProfileInfo,
        profile_picture: uploadedImage,
      };
    }
    dispatch(editUserStart());
    setLoadingEdit(true);
    axios
      .post("/updateprofile", updatedProfileInfo, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        dispatch(editUserSuccess(response.data));
        setUser(response.data.update_User_by_pk);
        setLoadingEdit(false);
        setResponseEdit(true);
        setTimeout(() => {
          setResponseEdit(false);
        }, 5000);
      })
      .catch((error) => {
        dispatch(editUserFail());
        setLoadingEdit(false);
        setErrorEdit(true);
        setTimeout(() => {
          setErrorEdit(false);
        }, 5000);
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "66px 8px 32px 170px" }}
        >
          <Paper sx={{}}>
            <Grid container spacing={2}>
              {/* First Column: User Profile Display */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: "80%",
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
                      src={`${PF}${user?.profile_picture}`}
                      sx={{
                        width: { xs: 100, md: 120, xl: 150 },
                        height: { xs: 100, md: 120, xl: 150 },
                        alignSelf: "center",
                        marginBottom: 4,
                      }}
                    />

                    <TableContainer sx={{ width: "100%", overflowY: "hidden" }}>
                      {loadingGet && (
                        <Box sx={{ textAlign: "center" }}>
                          <ClipLoader
                            color={"#36d7b7"}
                            loading={loadingGet}
                            size={50}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        </Box>
                      )}
                      {errorGet && (
                        <Box
                          sx={{
                            backgroundColor: "red",
                            color: "white",
                            fontSize: " 18px",
                            padding: " 5px 15px",
                            marginY: "10px",
                            textAlign: "center",
                          }}
                        >
                          Can not get your data
                        </Box>
                      )}
                      <Table>
                        <TableBody>
                          {userInformation.map((row, index) => (
                            <TableRow
                              key={row.label}
                              sx={{
                                "&:nth-of-type(odd)": {
                                  backgroundColor: "#F6F5F5",
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
                </Box>
              </Grid>
              {/* Second Column: Profile Update Form */}
              <Grid item xs={12} md={6}>
                <Box p={5}>
                  <Typography
                    variant="h5"
                    color={"#112846"}
                    textAlign={"center"}
                  >
                    Update Profile
                  </Typography>
                  {loadingUploadingImage && (
                    <Box sx={{ textAlign: "center" }}>
                      <ClipLoader
                        color={"#36d7b7"}
                        loading={loadingUploadingImage}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Box>
                  )}
                  {loadingEdit && (
                    <Box sx={{ textAlign: "center" }}>
                      <ClipLoader
                        color={"#36d7b7"}
                        loading={loadingEdit}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Box>
                  )}
                  {errorEdit && (
                    <Box
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        fontSize: " 18px",
                        padding: " 5px 15px",
                        marginY: "10px",
                        textAlign: "center",
                      }}
                    >
                      Error Occurred
                    </Box>
                  )}
                  {responseEdit && (
                    <Box
                      sx={{
                        backgroundColor: "#12596B",
                        color: "white",
                        fontSize: " 18px",
                        padding: " 5px 15px",
                        marginY: "10px",
                        textAlign: "center",
                      }}
                    >
                      Updated Successfully
                    </Box>
                  )}

                  <Box>
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <TextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      value={profileInfo?.first_name}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 2 }}
                    />
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <TextField
                      fullWidth
                      name="last_name"
                      value={profileInfo?.last_name}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextField
                      fullWidth
                      name="email"
                      value={profileInfo?.email}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                    <TextField
                      fullWidth
                      name="phone_number"
                      value={profileInfo?.phone_number}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
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
                          onChange={(e) => handleImageUpload(e)}
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
                      onClick={handleUpdateProfile}
                    >
                      Update Profile
                    </UpdateButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
