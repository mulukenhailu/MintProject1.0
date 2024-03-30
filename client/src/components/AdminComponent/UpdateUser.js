import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { EDIT_USER_BY_ADMIN } from "../../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserError,
  removeEditUser,
} from "../../State/ReduxToolkit/Slices/userSlice";
import { useParams, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_ALL_MANAGERS } from "../../State/ReduxSaga/Types/mangerType";
import { useTranslation } from "react-i18next";

const EditUserButton = styled(Button)({
  marginTop: "20px",
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const EditUserComponent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { t } = useTranslation("global");
  const navigate = useNavigate();

  const username = params.username;

  const { allUser, editUser, errorUser, loadingUser } = useSelector(
    (state) => state.user
  );
  const { allManagers } = useSelector((state) => state.manager);
  const { languange } = useSelector((state) => state.languange);

  const currentUser = allUser.find((user) => user.user_name === username);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_ALL_MANAGERS });
  }, []);

  const managersList = [
    { value: null, label: "Select Manager" },
    ...allManagers?.map((item) => ({
      value: `${item.user_name}`,
      label: `${item.first_name} ${item.last_name}`,
    })),
  ];

  useEffect(() => {
    if (errorUser || editUser) {
      setTimeout(() => {
        dispatch(removeEditUser());
        dispatch(removeUserError());
      }, 5000);
    }
  }, [errorUser, editUser]);

  const [user, setUser] = useState({
    first_name: currentUser ? currentUser.first_name : "",
    last_name: currentUser ? currentUser.last_name : "",
    Password: "",
    user_name: currentUser ? currentUser.user_name : "",
    // role: currentUser ? currentUser.Role.role_name : "",
    department: currentUser ? currentUser.department : "",
    email: currentUser ? currentUser.email : "",
    phone_number: currentUser ? currentUser.phone_number : "",
    manager_username: managersList ? managersList.manager_username : null,
  });

  console.log("user", user);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch({ type: EDIT_USER_BY_ADMIN, user });
    setButtonClicked(true);
  };

  useEffect(() => {
    if (!errorUser && !loadingUser && buttonClicked && editUser) {
      setUser({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        department: "",
        manager_username: "",
        Password: "",
      });
      setTimeout(() => {
        navigate("/usersList");
      }, 6000);
    }
  }, [editUser]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 5,
        width: { xs: "100%", sm: "70%", md: "60%", lg: "40%" },
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        textAlign={"center"}
        color={"#12596B"}
        marginBottom={2}
        sx={{
          fontSize: languange === "en" ? 28 : 32,
          fontWeight: languange === "en" ? 500 : 700,
        }}
      >
        {t("userlist.updateuser")}
      </Typography>
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
          Error while edit
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

      <TextField
        id="first_name"
        type="text"
        label={t("userlist.firstname")}
        name="first_name"
        value={user.first_name}
        onChange={(e) => handleFormChange(e)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="last_name"
        type="text"
        label={t("userlist.lastname")}
        name="last_name"
        value={user.last_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="email"
        type="email"
        label={t("userlist.email")}
        name="email"
        value={user.email}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="phone_number"
        type="text"
        label={t("userlist.phonenumber")}
        name="phone_number"
        value={user.phone_number}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="department"
        type="text"
        label={t("userlist.department")}
        name="department"
        value={user.department}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="password"
        type="text"
        label={t("userlist.password")}
        name="Password"
        value={user.Password}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="manager"
        type="text"
        label={t("userlist.manager")}
        name="manager_username"
        value={user.manager_username}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
        select
      >
        {managersList?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <EditUserButton
        variant="contained"
        size="large"
        onClick={handleEditUser}
        fullWidth
        sx={{
          fontSize: languange === "en" ? 18 : 20,
          fontWeight: languange === "en" ? 500 : 500,
        }}
      >
        {t("userlist.updateuser")}
      </EditUserButton>
    </Paper>
  );
};

export default EditUserComponent;
