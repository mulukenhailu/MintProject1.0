import React from "react";
import {
  Modal,
  Box,
  styled,
  Typography,
  Button,
  TextField,
} from "@mui/material";

const EditUserModal = ({ editModal, setEditModal }) => {
  const UserEditModalContainer = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const UserEditModalWrapper = styled(Box)({
    background: "#fff",
    height: "fit-content",
    borderRadius: "5px",
    padding: "20px",
  });
  const CreateButton = styled(Button)({
    marginTop: "20px",
    background: "#12596B",
    "&:hover": {
      background: "#0F4F5F",
    },
  });
  return (
    <Box>
      <UserEditModalContainer
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserEditModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <Box sx={{ width: "80%", margin: "auto", padding: "50px 10px" }}>
            <Typography variant="h4" textAlign={"center"} color={"gray"}>
              Update User
            </Typography>
            <TextField
              label="First Name"
              name="first_name"
              // value={user.first_name}
              // onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7" }}
            />

            <TextField
              label="Last Name"
              name="last_name"
              // value={user.last_name}
              // onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7" }}
            />
            <TextField
              label="Username"
              name="user_name"
              // value={user.user_name}
              // onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7" }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              // value={user.password}
              // onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7" }}
            />
            <TextField
              label="Role"
              name="role"
              // value={user.role}
              // onChange={handleFormChange}
              fullWidth
              margin="normal"
              sx={{ backgroundColor: "#f7f7f7", borderRadius: "16px" }}
            />
            <CreateButton
              variant="contained"
              size="large"
              // onClick={handleCreateUser}
              fullWidth
            >
              Create
            </CreateButton>
          </Box>
        </UserEditModalWrapper>
      </UserEditModalContainer>
    </Box>
  );
};

export default EditUserModal;
