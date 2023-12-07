import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PENDING_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";

const DeclineButton = styled(Button)({
  marginRight: "10px",
  background: "red",
  borderRadius: "2px",
  "&:hover": {
    background: "#471010",
  },
});
const AcceptButton = styled(Button)({
  marginRight: "10px",
  background: "#12596B",
  "&:hover": {
    background: "#10471f",
  },
});
const DetailButton = styled(Button)({
  marginRight: "10px",
  background: "orange",
  "&:hover": {
    background: "#473c10",
  },
});
const SendButton = styled(Button)({
  marginTop: "50px",
  color: "#fff",
});
const DetailModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DetailModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});
const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
});
const AcceptModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const AcceptModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px 20px 50px 20px",
});
const DeclineModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DeclineModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px 20px 40px 20px",
});

const ManagerRequestPending = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_MANAGER });
  }, [dispatch]);

  const { loadingRequest, errorRequest, allRequest } = useSelector(
    (state) => state.request
  );

  console.log(allRequest);

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {allRequest?.map((item) => (
        <Grid item xs={12} sm={6} lg={4}>
          <Card
            sx={{
              border: "2px solid black",
              borderRadius: "10px",
              padding: "20px 5px",
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="250px"
              src="https://www.simplilearn.com/ice9/free_resources_article_thumb/How_to_become_a_marketing_manager.jpg"
            />
            <CardContent>
              <List>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography variant="body1" marginRight={1} fontWeight={600}>
                    First Name:
                  </Typography>
                  <Typography variant="body3" color={"gray"}>
                    {item.User?.first_name}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Typography variant="body1" marginRight={1} fontWeight={600}>
                    Last Name:
                  </Typography>
                  <Typography variant="body3" color={"gray"}>
                    {item.User?.last_name}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography variant="body1" marginRight={1} fontWeight={600}>
                    Property-Name:
                  </Typography>
                  <Typography variant="body3" color={"gray"}>
                    {item.item_name}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography variant="body1" marginRight={1} fontWeight={600}>
                    Quantity Requested:
                  </Typography>
                  <Typography variant="body3" color={"gray"}>
                    {item.quantity_requested}
                  </Typography>
                </ListItem>
                <ListItem
                  sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <Typography variant="body1" marginRight={1} fontWeight={600}>
                    Order Date:
                  </Typography>
                  <Typography variant="body3" color={"gray"}>
                    Date-1
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <ButtonGroup fullWidth>
                <DeclineButton
                  variant="contained"
                  size="small"
                  onClick={() => setDeclineModal(true)}
                >
                  Decline
                </DeclineButton>
                <AcceptButton
                  variant="contained"
                  onClick={() => setAcceptModal(true)}
                >
                  Accept
                </AcceptButton>
                <DetailButton
                  variant="contained"
                  onClick={() => setDetailModal(true)}
                >
                  Details
                </DetailButton>
              </ButtonGroup>
            </CardActions>
          </Card>
        </Grid>
      ))}
      <DetailModalContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ textDecoration: "underline" }}
            >
              Move Order Details
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
        </DetailModalWrapper>
      </DetailModalContainer>
      <AcceptModal
        open={acceptModal}
        onClose={() => setAcceptModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AcceptModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
        >
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
          >
            Accept the Order
          </SendButton>
        </AcceptModalWrapper>
      </AcceptModal>
      <DeclineModal
        open={declineModal}
        onClose={() => setDeclineModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeclineModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            marginBottom={"20px"}
            sx={{ textDecoration: "underline" }}
          >
            Move Order Decline
          </Typography>
          <Textarea
            minRows={5}
            sx={{ fontSize: "18px" }}
            placeholder="Send decline reason to user"
          />
          <SendButton variant="contained" color="error" fullWidth>
            Decline Order
          </SendButton>
        </DeclineModalWrapper>
      </DeclineModal>
    </Grid>
  );
};

export default ManagerRequestPending;
