import React, { useState } from "react";
import { Box, Button, ButtonGroup, Grid, styled } from "@mui/material";
import PendingItem from "./PendingItem";
import AcceptedItems from "./AcceptedItems";
import DeclinedItems from "./DeclinedItems";

const AllStoreRequest = () => {
  const [activeItem, setActiveItem] = useState("pending");
  const ButtonContainer = styled(ButtonGroup)({
    position: "sticky",
    top: "78px",
    height: "75px",
    marginBottom: "50px",
  });
  const PendingButton = styled(Button)({
    fontSize: "24px",
    borderRadius: "0px",
  });
  const AcceptButton = styled(Button)({
    fontSize: "24px",
    background: "green",
    "&:hover": {
      background: "#10471f",
    },
  });
  const DeclineButton = styled(Button)({
    fontSize: "24px",
    background: "red",
    borderRadius: "0px",
    "&:hover": {
      background: "#471010",
    },
  });
  const Item = styled(Box)({});
  return (
    <Box flex={4}>
      <Box paddingLeft={1}>
        <ButtonContainer
          disableElevation
          variant="contained"
          ariaLabel="outlined primary button group"
          size="large"
          fullWidth
        >
          <PendingButton onClick={() => setActiveItem("pending")}>
            Pending
          </PendingButton>
          <AcceptButton onClick={() => setActiveItem("accepted")}>
            Accepted
          </AcceptButton>
          <DeclineButton onClick={() => setActiveItem("declined")}>
            Declined
          </DeclineButton>
        </ButtonContainer>
        <Box
          sx={{
            height: "100vh",
          }}
        >
          {activeItem === "pending" ? (
            <PendingItem />
          ) : activeItem === "accepted" ? (
            <AcceptedItems />
          ) : (
            <DeclinedItems />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllStoreRequest;
