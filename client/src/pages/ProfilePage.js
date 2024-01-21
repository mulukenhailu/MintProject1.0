import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
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
import { useDispatch, useSelector } from "react-redux";
import {
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
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({});
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [errorEdit, setErrorEdit] = useState(false);
  const [responseEdit, setResponseEdit] = useState(false);
  const [errorGet, setErrorGet] = useState(false);
  const { user_name, Role } = useSelector((state) => state.user.user);
  const { uploadedImage, loadingUploadingImage, errorImage } = useSelector(
    (state) => state.upload
  );
  const { languange } = useSelector((state) => state.languange);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(removeUploadImage());
  }, []);
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    user_name: "",
    role_name: "",
    manager_username: "",
  });

  const userInformation = [
    { label: t("profile.firstname"), value: user?.first_name },
    { label: t("profile.lastname"), value: user?.last_name },
    {
      label: t("profile.email"),
      value: user?.email ? user?.email : "Email not provided",
    },
    {
      label: t("profile.phonenumber"),
      value: user?.phone_number ? user?.phone_number : "Phone not provided",
    },
    { label: t("profile.department"), value: user?.department },
    { label: t("profile.username"), value: user?.user_name },
    { label: t("profile.role"), value: user?.Role?.role_name },
    Role?.role_name !== "manager"
      ? {
          label: t("profile.manager"),
          value: user?.manager_username
            ? user?.manager_username
            : "Don't have manager",
        }
      : "",
  ];

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

  const handleUpdateProfile = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let updatedProfileInfo = { ...profileInfo };
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
          sx={{ flexGrow: 1 }}
          paddingTop={9}
          paddingRight={1}
          paddingLeft={{ xs: "70px", md: "183px" }}
        >
          <Paper sx={{ height: "fit-content", paddingBottom: "30px" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: {
                      xs: "0px",
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
                      width: { xs: "90%", md: "75%", lg: "70%" },
                      marginX: "auto",
                    }}
                  >
                    <Avatar
                      alt="User Image"
                      src={`${PF}${user?.profile_picture}`}
                      sx={{
                        width: { xs: 100, md: 120, xl: 150 },
                        height: { xs: 100, md: 120, xl: 150 },
                        alignSelf: "center",
                        marginY: 5,
                      }}
                    />

                    <Box sx={{ width: "100%" }}>
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
                      <Box sx={{ height: "fit-content", width: "100%" }}>
                        {userInformation.map((row, index) => (
                          <Box
                            key={row.label}
                            sx={{
                              "&:nth-of-type(odd)": {
                                backgroundColor: "#F6F5F5",
                              },
                              padding: 2,
                              display: {
                                xs: "block",
                                md: "flex",
                              },
                              alignItems: "center",
                            }}
                          >
                            <Box
                              sx={{
                                color: "#12596B",
                                flex: "1",
                              }}
                            >
                              <Typography
                                variant="h6"
                                textAlign={{ xs: "center", md: "left" }}
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
                                {row.label}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                color: "#12596B",
                                flex: "1",
                              }}
                            >
                              <Typography
                                variant="h6"
                                textAlign={{ xs: "center", md: "left" }}
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: languange === "en" ? 400 : 500,
                                }}
                              >
                                {row?.value}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              {/* Second Column: Profile Update Form */}
              <Grid item xs={12} md={6}>
                <Box p={5}>
                  <Typography
                    variant="h5"
                    color={"#12596B"}
                    textAlign={"center"}
                    sx={{ fontWeight: languange === "ኣማ" ? "800" : "" }}
                  >
                    {t("profile.updateprofile")}
                  </Typography>
                  {loadingUploadingImage && (
                    <Box sx={{ textAlign: "center" }}>
                      <ClipLoader
                        color={"#12596B"}
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
                        color={"#12596B"}
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
                      Please fill all field required
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
                    <InputLabel
                      htmlFor="first_name"
                      sx={{
                        color: "#12596B",
                        fontSize: "20px",
                        fontWeight: languange === "ኣማ" ? "800" : "",
                      }}
                    >
                      {t("profile.firstname")}
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="first_name"
                      name="first_name"
                      value={profileInfo?.first_name}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 2 }}
                    />
                    <InputLabel
                      htmlFor="last_name"
                      sx={{
                        color: "#12596B",
                        fontSize: "20px",
                        fontWeight: languange === "ኣማ" ? "800" : "",
                      }}
                    >
                      {t("profile.lastname")}
                    </InputLabel>
                    <TextField
                      fullWidth
                      name="last_name"
                      value={profileInfo?.last_name}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel
                      htmlFor="email"
                      sx={{
                        color: "#12596B",
                        fontSize: "20px",
                        fontWeight: languange === "ኣማ" ? "800" : "",
                      }}
                    >
                      {t("profile.email")}
                    </InputLabel>
                    <TextField
                      fullWidth
                      name="email"
                      value={profileInfo?.email}
                      onChange={handleFormChange}
                      sx={{ backgroundColor: "#F6F5F5", marginBottom: 1 }}
                    />
                    <InputLabel
                      htmlFor="phone_number"
                      sx={{
                        color: "#12596B",
                        fontSize: "20px",
                        fontWeight: languange === "ኣማ" ? "800" : "",
                      }}
                    >
                      {t("profile.phonenumber")}
                    </InputLabel>
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
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={handleUpdateProfile}
                      sx={{
                        fontSize: {
                          xs: "16px",
                          md: "18px",
                          color: "#12596B",
                          border: "1px solid #12596B",
                        },
                      }}
                    >
                      {t("profile.update")}
                    </Button>
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
