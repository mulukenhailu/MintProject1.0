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
import { GET_ALL_PENDING_REQUEST_FOR_STOREHEAD } from "../../State/ReduxSaga/Types/storeHeadRequestTypes";

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
  marginTop: "30px",
  color: "#fff",
  "&:hover": {
    background: "#10471f",
  },
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
  padding: "20px",
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
  padding: "20px",
});

const PendingItemComponent = () => {
  const dispatch = useDispatch();
  const [detailModal, setDetailModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREHEAD });
  }, [dispatch]);

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{
            border: "2px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="250px"
            src="https://blog.yoobic.com/hubfs/supermarket-manager-giving-training-to-a-trainee-picture-id1329317588.jpg"
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Department:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Department-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Manager-name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Manager-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  StoreM-name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  StoreM-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Product-name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Product-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Quantity:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Quantity-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Approved-date:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  1 month ago
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
      <DetailModalContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ textDecoration: "underline" }}
            >
              MODEL-22-DETAILS
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
                Store-Manager-Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Store-Manager-1
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
                Product-id
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Product-id-1
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
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Approved-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-2
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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            marginBottom={"20px"}
            sx={{ textDecoration: "underline" }}
          >
            MODEL-22-ACCEPT
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
              Store-Manager-Name
            </Typography>
            <Typography variant="body2" flex={1} color={"gray"}>
              Store-Manager-1
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
              Product-id
            </Typography>
            <Typography variant="body2" flex={1} color={"gray"}>
              Product-id-1
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
          <ListItemForModal>
            <Typography variant="body1" flex={2} fontWeight={500}>
              Approved-date
            </Typography>
            <Typography variant="body2" flex={1} color={"gray"}>
              date-2
            </Typography>
          </ListItemForModal>
          <SendButton
            variant="contained"
            sx={{ background: "#12596B" }}
            fullWidth
          >
            Approve and send to store keeper
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
            MODEL-22-DECLINE
          </Typography>
          <Textarea
            minRows={5}
            sx={{ fontSize: "18px", marginBottom: "20px" }}
            placeholder="Send to decline reason to manager"
          />
          <Button variant="contained" color="error" fullWidth>
            Decline Approval and Send to Department Manager
          </Button>
        </DeclineModalWrapper>
      </DeclineModal>
    </Grid>
  );
};

export default PendingItemComponent;
