import React, { useState } from "react";
import { Button, TextField, Typography, Box, styled } from "@mui/material";

const ErrorComponent = styled(Box)({
  background: "red",
  color: "#fff",
});

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordReset, setPasswordReset] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Add your logic here to reset the password
      setPasswordReset(true);
    } else {
      setPasswordNotMatch(true);
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box width={{ xs: "80%", sm: "50%", lg: "30%" }}>
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {passwordNotMatch && (
          <ErrorComponent>
            <Typography>Password does not match</Typography>
          </ErrorComponent>
        )}
        {passwordReset ? (
          <Typography variant="body1">
            Your password has been successfully reset.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Reset Password
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
