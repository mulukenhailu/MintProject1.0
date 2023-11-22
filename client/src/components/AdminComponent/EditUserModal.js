import React, { useState, useEffect } from "react";
import {
  Box,
  styled,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { EDIT_USER_BY_ADMIN } from "../../State/ReduxSaga/Types/userTypes";
import {
  removeEditUser,
  removeUserError,
} from "../../State/ReduxToolkit/Slices/userSlice";
import ClipLoader from "react-spinners/ClipLoader";

const EditUserModal = ({ currentUserId }) => {
  const dispatch = useDispatch();
  const CreateButton = styled(Button)({
    marginTop: "20px",
    background: "#12596B",
    "&:hover": {
      background: "#0F4F5F",
    },
  });

  const roleType = [
    { value: "manager", label: "Manager" },
    { value: "storehead", label: "Store Head" },
    { value: "storekeeper", label: "Store Keeper" },
    { value: "employee", label: "Employee" },
  ];

  const { allUser, editUser, errorUser, loadingUser } = useSelector(
    (state) => state.user
  );
  const currentUser = allUser.find((user) => user.user_name === currentUserId);

  useEffect(() => {
    if (errorUser || editUser) {
      setTimeout(() => {
        dispatch(removeEditUser());
        dispatch(removeUserError());
      }, 5000);
    }
  }, [errorUser, editUser, dispatch]);

  let [user, setUser] = useState({
    first_name: currentUser ? currentUser.first_name : "",
    last_name: currentUser ? currentUser.last_name : "",
    password: currentUser ? currentUser.password : "",
    user_name: currentUser ? currentUser.user_name : "",
    // role: currentUser ? currentUser.Role.role_name : "",
    department: currentUser ? currentUser.department : "",
    email: currentUser ? currentUser.email : "",
    phone_number: currentUser ? currentUser.phone_number : "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    dispatch({ type: EDIT_USER_BY_ADMIN, user });
  };

  return (
    <Box sx={{ width: "80%", margin: "auto", padding: "10px 10px" }}>
      <Typography variant="h4" textAlign={"center"} color={"gray"}>
        Update User
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
        label="First Name"
        name="first_name"
        value={user.first_name}
        onChange={(e) => handleFormChange(e)}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="last_name"
        label="Last Name"
        name="last_name"
        value={user.last_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        value={user.email}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="phone_number"
        label="Phone Number"
        name="phone_number"
        value={user.phone_number}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        id="department"
        label="Department"
        name="department"
        value={user.department}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />

      {/* <TextField
        id="role"
        label="Role"
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
      </TextField> */}
      <CreateButton
        variant="contained"
        size="large"
        onClick={handleEditUser}
        fullWidth
      >
        Update
      </CreateButton>
    </Box>
  );
};

export default EditUserModal;
