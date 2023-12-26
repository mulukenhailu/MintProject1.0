import { Box, Typography, styled, ListItem } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});
export const UserDetailsModal = ({ userId, userName }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const findSingleUser = async () => {
      setLoading(true);
      await axios
        .get("/user", {
          params: {
            id: userId,
            username: userName,
          },
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(true);
          setLoading(false);
          setTimeout(() => {
            setError(false);
          }, 5000);
          console.log(error);
        });
    };

    findSingleUser();
  }, [userId, userName]);
  console.log("user", user);

  return (
    <Box>
      <Typography
        variant="h5"
        textAlign={"center"}
        marginBottom={"20px"}
        sx={{ textDecoration: "underline", color: "#12596B" }}
      >
        User Deatils
      </Typography>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      )}
      {error && (
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
          Can't get user's data
        </Box>
      )}
      <Box sx={{ width: "100%" }}>
        <ListItemForModal>
          <Typography
            variant="body1"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            First Name
          </Typography>
          <Typography
            variant="body2"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {user[0]?.first_name}
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography
            variant="body1"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Last Name
          </Typography>
          <Typography
            variant="body2"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {user[0]?.last_name}
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography
            variant="body1"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Email
          </Typography>
          <Typography
            variant="body2"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {user[0]?.email}
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography
            variant="body1"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Department
          </Typography>
          <Typography
            variant="body2"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {user[0]?.department}
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography
            variant="body1"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Phone Number
          </Typography>
          <Typography
            variant="body2"
            flex={2}
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {user[0]?.phone_number}
          </Typography>
        </ListItemForModal>
      </Box>
    </Box>
  );
};