import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Typography variant="h2" color="textPrimary" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        The page you are looking for does not exist or may have been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        size="large"
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
