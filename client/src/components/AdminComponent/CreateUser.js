import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { CREATE_USER } from "../../State/ReduxSaga/Types/userTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  removeUserError,
  removeNewUser,
} from "../../State/ReduxToolkit/Slices/userSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_ALL_MANAGERS } from "../../State/ReduxSaga/Types/mangerType";
import { useTranslation } from "react-i18next";

const CreateUserButton = styled(Button)({
  marginTop: "20px",
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const CreateUser = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    department: "",
    role: "",
    manager_username: "",
  });

  useEffect(() => {
    dispatch({ type: GET_ALL_MANAGERS });
  }, []);

  const { errorUser, newUser, loadingUser } = useSelector(
    (state) => state.user
  );

  const { allManagers } = useSelector((state) => state.manager);
  const { languange } = useSelector((state) => state.languange);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCreateUser = (e) => {
    console.log(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
    e.preventDefault();
    dispatch({ type: CREATE_USER, user });
  };

  useEffect(() => {
    setUser({
      first_name: "",
      last_name: "",
      user_name: "",
      password: "",
      department: "",
      role: "",
      manager_username: "",
    });
  }, [newUser]);
  useEffect(() => {
    if (errorUser || newUser) {
      setTimeout(() => {
        dispatch(removeNewUser());
        dispatch(removeUserError());
      }, 5000);
    }
  }, [errorUser, newUser, dispatch]);

  const roleType = [
    { value: "manager", label: t("createuser.manager") },
    { value: "storehead", label: t("createuser.storehead") },
    { value: "storekeeper", label: t("createuser.storekeeper") },
    { value: "employee", label: t("createuser.employee") },
  ];

  const managersList = [];

  allManagers?.forEach((item) => {
    managersList.push({
      value: `${item.user_name}`,
      label: `${item.first_name} ${item.last_name}`,
    });
  });

  return (
    <Paper
      elevation={3}
      sx={{
        padding: { xs: 1, md: 5 },
        paddingY: { xs: 4, md: 5 },
        width: { xs: "100%", sm: "70%", md: "60%", lg: "50%" },
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
        {t("createuser.create")}
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
          {errorUser}
        </Box>
      )}
      {newUser && (
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
          New User Created Successfully
        </Box>
      )}
      <TextField
        label={t("createuser.firstname")}
        name="first_name"
        value={user.first_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />

      <TextField
        label={t("createuser.lastname")}
        name="last_name"
        value={user.last_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        label={t("createuser.username")}
        name="user_name"
        value={user.user_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        label={t("createuser.password")}
        name="password"
        type="password"
        value={user.password}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        label={t("createuser.department")}
        name="department"
        type="department"
        value={user.department}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        label={t("createuser.role")}
        name="role"
        value={user.role}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
        select
      >
        {roleType.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label={t("createuser.managername")}
        name="manager_username"
        type="text"
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

      <CreateUserButton
        variant="contained"
        size="large"
        onClick={handleCreateUser}
        fullWidth
        sx={{
          fontSize: languange === "en" ? 18 : 20,
          fontWeight: languange === "en" ? 500 : 500,
        }}
      >
        {t("createuser.create")}
      </CreateUserButton>
    </Paper>
  );
};

export default CreateUser;
