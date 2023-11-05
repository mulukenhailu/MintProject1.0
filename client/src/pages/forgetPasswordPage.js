import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to send a password reset email
    setEmailSent(true);
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
          Forgot Password
        </Typography>
        {emailSent ? (
          <Typography variant="body1">
            An email with instructions to reset your password has been sent to
            your email address.
          </Typography>
        ) : (
          <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ForgetPasswordPage;
