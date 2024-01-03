import React, { useState } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import ManagerRequestAccepted from "./ManagerRequestAccepted";
import ManagerRequestPending from "./ManagerRequestPending";
import ManagerRequestDeclined from "./ManagerRequestDeclined";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useTranslation } from "react-i18next";

const AllManagersRequest = () => {
  const [activeItem, setActiveItem] = useState("pending");
  const { t } = useTranslation("global");
  const ButtonContainer = styled(ButtonGroup)({
    position: "sticky",
    top: "73px",
    height: "35px",
    marginBottom: "30px",
    zIndex: "10",
  });
  const PendingButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    borderRadius: "0px",
    background:
      activeItem === "pending" ? theme.palette.primary.main : "#666666",
    color: "#fff",
  }));
  const AcceptButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    background:
      activeItem === "accepted" ? theme.palette.primary.main : "#666666",
    color: "#fff",
  }));
  const DeclineButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    background:
      activeItem === "declined" ? theme.palette.primary.main : "#666666",
    color: "#fff",
  }));
  return (
    <Box>
      <Box paddingLeft={{ xs: 5, md: 19 }} paddingTop={5} paddingBottom={5}>
        <ButtonContainer
          disableElevation
          variant="contained"
          ariaLabel="outlined primary button group"
          size="large"
          fullWidth
        >
          <PendingButton
            onClick={() => setActiveItem("pending")}
            startIcon={<PendingIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {t("status.pending")}
            </Box>
          </PendingButton>
          <AcceptButton
            onClick={() => setActiveItem("accepted")}
            startIcon={<ThumbUpAltIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {t("status.accepted")}
            </Box>
          </AcceptButton>
          <DeclineButton
            onClick={() => setActiveItem("declined")}
            startIcon={<ThumbDownAltIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {t("status.declined")}
            </Box>
          </DeclineButton>
        </ButtonContainer>
        <Box>
          {activeItem === "pending" ? (
            <ManagerRequestPending />
          ) : activeItem === "accepted" ? (
            <ManagerRequestAccepted />
          ) : (
            <ManagerRequestDeclined />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllManagersRequest;
