import { Box, List, ListItem, Typography, styled } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});

const RequestDetailPageComponent = () => {
  const [notification, setNotification] = useState({});
  const [property, setProperty] = useState({});
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    {
      const getSingleNotification = () => {
        axios
          .get(`/notification/${id}`, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response?.data?.notification_by_pk);
            setNotification(response?.data?.notification_by_pk);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getSingleNotification();
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/storekeeper/getitem/${notification?.item_no}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setProperty(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [notification]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(`${PF}${notification?.senderProfilePicture}`);

  return (
    <Box
      paddingLeft={{ xs: 10, md: 20 }}
      paddingTop={3}
      paddingBottom={5}
      sx={{ position: "relative" }}
    >
      <Box
        component={Link}
        to="/notification"
        sx={{
          position: "absolute",
          top: "25px",
          left: "130px",
          background: "#12596B",
          color: "#fff",
          textDecoration: "none",
          padding: "10px 20px 10px 10px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <KeyboardBackspaceIcon />
        Back
      </Box>
      <Typography variant="h4" textAlign={"center"} color={"#12596B"}>
        Notification Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            flex: "1",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <Box>
              <Typography variant="h5" color={"#12596B"}>
                Sender Photo
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              <img
                src={`${PF}${notification?.senderProfilePicture}`}
                alt="test"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #12596B",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <Box>
              <Typography variant="h5" color={"#12596B"}>
                Product Photo
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              <img
                src={`${PF}${property?.productphoto}`}
                alt="test"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #12596B",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: "1", padding: "20px" }}>
          <List>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                Sender First Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {notification?.senderFirstName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                Sender Last Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {notification?.senderLastName}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                Product Name:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {property?.productname}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                Product Model:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {property?.productmodel}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                Quantity Requested:
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {notification?.quantity_requested}
              </Typography>
            </ListItemForModal>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestDetailPageComponent;
