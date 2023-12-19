import { Button, List, ListItem, Typography, styled } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ACCEPT_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";

const SendButton = styled(Button)({
  marginTop: "50px",
  color: "#fff",
});
const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
});
export const AcceptedModal = () => {
  const dispatch = useDispatch();
  const { acceptedRequestId } = useSelector((state) => state.request);
  const handleAcceptedManagerRequest = () => {
    dispatch({ type: ACCEPT_REQUEST_FOR_MANAGER, id: acceptedRequestId });
  };
  return (
    <div>
      <List>
        <Typography
          variant="h5"
          textAlign={"center"}
          marginBottom={"20px"}
          sx={{ textDecoration: "underline" }}
        >
          Move Order Accept
        </Typography>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Name
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            User-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Department
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Department-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Manager-Name
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Manager-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Product-Name
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Product-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Product-Id
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Product-Id-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Quantity
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Quantity-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Model
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            Model-1
          </Typography>
        </ListItemForModal>
        <ListItemForModal>
          <Typography variant="body1" flex={2} fontWeight={500}>
            Ordered-date
          </Typography>
          <Typography variant="body2" flex={1} color={"gray"}>
            date-1
          </Typography>
        </ListItemForModal>
      </List>
      <SendButton
        variant="contained"
        sx={{ background: "#12596B" }}
        fullWidth
        onClick={handleAcceptedManagerRequest}
      >
        Accept the Order
      </SendButton>
    </div>
  );
};
