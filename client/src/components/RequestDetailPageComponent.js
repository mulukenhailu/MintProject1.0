import { Box, List, ListItem, Typography, styled } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});
const ListItemForModalDescription = styled(ListItem)({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
});

const RequestDetailPageComponent = () => {
  const [notification, setNotification] = useState({});
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");
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
    setLoading(true);
    axios
      .get(`/storekeeper/getitem/${notification?.item_no}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setProperty(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [notification]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(`${PF}${notification?.senderProfilePicture}`);

  return (
    <Box
      paddingLeft={{ xs: 5, md: 20 }}
      paddingTop={3}
      paddingBottom={5}
      sx={{ position: "relative", border: "1px solid green" }}
    >
      <Box
        component={Link}
        to="/notification"
        sx={{
          position: "absolute",
          top: "25px",
          left: { xs: "12%", md: "20%", lg: "15%" },
          background: "#12596B",
          color: "#fff",
          textDecoration: "none",
          padding: "5px 10px 5px 5px",
          borderRadius: "5px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <KeyboardBackspaceIcon />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {" "}
          {t("notification.back")}
        </Box>
      </Box>
      <Typography variant="h4" textAlign={"center"} color={"#12596B"}>
        {t("notification.messagedetail")}
      </Typography>
      {loading && (
        <Box sx={{ textAlign: "center", marginY: "20px" }}>
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      )}
      <Box
        sx={{
          display: { xs: "block", lg: "flex" },
          gap: "10px",
          marginTop: "30px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
          }}
          flex={1}
        >
          <Box
            sx={{
              marginBottom: "30px",
            }}
          >
            <Box>
              <Typography variant="h5" color={"#12596B"}>
                {t("notification.senderphoto")}
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              <img
                src={`${PF}${notification?.senderProfilePicture}`}
                alt="NaN"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "contain",
                  border: "1px solid #12596B",
                }}
              />
            </Box>
          </Box>
          <hr style={{ margin: "30px" }} />
          <Box
            sx={{
              marginBottom: "30px",
            }}
          >
            <Box>
              <Typography variant="h5" color={"#12596B"}>
                {t("notification.propertyphoto")}
              </Typography>
            </Box>
            <Box sx={{ width: "300px", height: "300px" }}>
              <img
                src={`${PF}${property?.productphoto}`}
                alt="NaN"
                crossOrigin="anonymous"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "contain",
                  border: "1px solid #12596B",
                }}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ padding: "20px" }} flex={1}>
          <List>
            <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.senderfirstname")}
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
            <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.senderlastname")}
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
            <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.propertyname")}
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
            <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.propertymodel")}
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
            <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.requestedquantity")}
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
            <ListItemForModalDescription
              sx={{ display: { xs: "block", sm: "flex" } }}
            >
              <Typography
                variant="h6"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={500}
              >
                {t("notification.message")}
              </Typography>
              <Typography
                variant="body1"
                flex={4}
                sx={{ color: "#12596B" }}
                fontWeight={400}
              >
                {notification?.description}
              </Typography>
            </ListItemForModalDescription>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default RequestDetailPageComponent;
