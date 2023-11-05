import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { CREATE_USER } from "../../State/ReduxSaga/Types/userTypes";
import { useDispatch } from "react-redux";

const CreateUser = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    role_id: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    dispatch({type:CREATE_USER,user})
    setUser({first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    role_id: "",})
  };
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 5,
        width: { xs: "100%", sm: "70%", md: "60%", lg: "40%" },
        margin: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create User
      </Typography>

      <TextField
        label="First Name"
        name="first_name"
        value={user.first_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />

      <TextField
        label="Last Name"
        name="last_name"
        value={user.last_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      {/* <TextField
        label="Phone Number"
        name="phoneNumber"
        value={user.phoneNumber}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      /> */}
      <TextField
        label="Username"
        name="user_name"
        value={user.user_name}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      {/* <TextField
        label="Job"
        name="job"
        value={user.job}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      /> */}
      {/* <TextField
        label="Department"
        name="department"
        value={user.department}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      /> */}

      <TextField
        label="Password"
        name="password"
        type="password"
        value={user.password}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7" }}
      />
      <TextField
        label="Role"
        name="role_id"
        value={user.role_id}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
        sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
      />
      {/* <div
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
      </div> */}
      <Button
        variant="contained"
        size="large"
        onClick={handleCreateUser}
        fullWidth
        sx={{ marginTop: "20px", background: "#12596B" }}
      >
        Create
      </Button>
    </Paper>
  );
};

export default CreateUser;
