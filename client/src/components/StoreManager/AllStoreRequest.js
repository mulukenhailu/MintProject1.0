import React, { useState } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import AcceptedItemsComponent from "./AcceptedItems";
import PendingItemComponent from "./PendingItem";
import DeclinedItemsComponent from "./DeclinedItems";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

const AllStoreRequest = () => {
  const [activeItem, setActiveItem] = useState("pending");
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
      <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5} paddingBottom={5}>
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
          >
            Pending
          </PendingButton>
          <AcceptButton
            onClick={() => setActiveItem("accepted")}
            startIcon={<ThumbUpAltIcon />}
          >
            Accepted
          </AcceptButton>
          <DeclineButton
            onClick={() => setActiveItem("declined")}
            startIcon={<ThumbDownAltIcon />}
          >
            Declined
          </DeclineButton>
        </ButtonContainer>
        <Box>
          {activeItem === "pending" ? (
            <PendingItemComponent />
          ) : activeItem === "accepted" ? (
            <AcceptedItemsComponent />
          ) : (
            <DeclinedItemsComponent />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllStoreRequest;
