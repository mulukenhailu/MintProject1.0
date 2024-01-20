import {
  Box,
  Paper,
  TextField,
  Typography,
  styled,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SetPasswordButton = styled(Button)({
  transition: "transform 0.3s ease-in-out",
  background: "#12596b",
  "&:hover": {
    transform: "scale(0.98)",
    background: "#12596b",
  },
});

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  const handleSetOldPassword = () => {
    if (!password) {
      setError("Password required");
      return;
    }
    axios
      .post("/oldpassword/confirm", { password }, { withCredentials: true })
      .then((response) => {
        console.log("reset pasword", response);
        setResetPasswordModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordReset = () => {
    if (!newPassword) {
      toast.error("New password is required");
      return;
    }
    if (!confirmPassword) {
      toast.error("Please set password again");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setResetPasswordModal(false);
  };

  return (
    <Box paddingLeft={{ xs: 5, md: 18.5 }} paddingTop={5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", lg: "50%" },
            padding: { xs: "25px 15px", lg: "30px 50px" },
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            color="#12596b"
            marginBottom={1}
          >
            Reset Password
          </Typography>
          {error && (
            <Typography
              variant="body1"
              color={"white"}
              textAlign={"center"}
              sx={{
                background: "red",
                padding: "5px 10px",
                margin: "10px 0px 10px 0px",
              }}
            >
              {error}
            </Typography>
          )}
          <TextField
            required
            id="password"
            label="Enter your password"
            type="text"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SetPasswordButton
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={handleSetOldPassword}
          >
            Set Password
          </SetPasswordButton>
        </Paper>
      </Box>
      <Modal
        open={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
          sx={{
            background: "#fff",
            height: "fit-content",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
          }}
        >
          <Typography variant="h5" textAlign={"center"} color={"#12596b"}>
            Reset Password
          </Typography>
          <TextField
            required
            id="newPassword"
            label="Enter new password"
            type="text"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            required
            id="confirmPassword"
            label="Enter password again"
            type="text"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SetPasswordButton
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={handlePasswordReset}
          >
            Submit
          </SetPasswordButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResetPassword;
