import React, { useState } from "react";
import { styled, Button, ButtonGroup, Box } from "@mui/material";
import StoreKeeperAcceptedItems from "./StoreKeeperAcceptedItems";
import StorekeeperPendingItems from "./StorekeeperPendingItems";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const AllStoreKeeperRequest = () => {
  const [activeItem, setActiveItem] = useState("pending");
  const ButtonContainer = styled(ButtonGroup)({
    position: "sticky",
    top: "60px",
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
            Delivered
          </AcceptButton>
        </ButtonContainer>
        <Box>
          {activeItem === "pending" ? (
            <StorekeeperPendingItems />
          ) : (
            <StoreKeeperAcceptedItems />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllStoreKeeperRequest;
