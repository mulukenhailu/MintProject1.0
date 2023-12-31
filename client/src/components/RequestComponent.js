import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const RequestComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const { t } = useTranslation("global");
  useEffect(() => {
    {
      const getAllNotificationList = () => {
        axios
          .get("/employee/notifications", {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data.notification);
            setNotifications(response?.data?.notification);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      getAllNotificationList();
    }
  }, []);

  const handleUpdateNotification = async (id) => {
    await axios
      .get(`/employee/notifications/update/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (notifications.length === 0) {
    return (
      <Box sx={{ padding: "20px 0px 0px 195px" }}>No notification yet</Box>
    );
  }
  return (
    <Box paddingLeft={{ xs: 10, md: 22 }} paddingTop={3} paddingBottom={5}>
      <Box
        sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
      >
        {sortedNotifications?.map((item, index) => (
          <Box
            sx={{
              width: "60%",
              height: "fit-content",
              background: "lightgray",
              padding: "10px",
              marginBottom: "20px",
              display: "flex",
              gap: "30px",
              position: "relative",
              textDecoration: "none",
            }}
            component={Link}
            to={`/notification/${item?.Notify_Id}`}
            key={index}
            onClick={() => handleUpdateNotification(item?.Notify_Id)}
          >
            {item?.isViwed ? null : (
              <Box
                sx={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  background: "red",
                  position: "absolute",
                  top: "10px",
                  right: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                1
              </Box>
            )}

            <Box
              sx={{
                flex: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={`${PF}${item?.senderProfilePicture}`}
                alt="NaN"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid #112846",
                }}
              />
            </Box>
            <Box sx={{ flex: "4" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography flex={1} color={"#12596B"} variant="h6">
                  {t("notification.from")}
                </Typography>
                <Typography flex={4} color={"#12596B"} variant="body1">
                  {item?.senderFirstName + " " + item?.senderLastName}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography flex={1} color={"#12596B"} variant="h6">
                  {t("notification.message")}
                </Typography>
                <Typography flex={4} color={"#12596B"} variant="body1">
                  {item?.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RequestComponent;
