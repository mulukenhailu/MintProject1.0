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
// import { format } from "timeago.js";
import { GET_ALL_PENDING_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";
import {
  removeAllRequest,
  setAcceptedRequestId,
} from "../../State/ReduxToolkit/Slices/requestSlice";
import { AcceptedModal } from "./AcceptedModal";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const DeclineButton = styled(Button)({
  marginRight: "10px",
  background: "#D32F2F",
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#D32F2F",
    transform: "scale(1.1)",
  },
});

const AcceptButton = styled(Button)({
  marginRight: "10px",
  background: "#12596B",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#12596B",
    transform: "scale(1.05)",
  },
});

const DetailButton = styled(Button)({
  marginRight: "10px",
  background: "#E5953D",
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#E5953D",
    transform: "scale(1.05)",
  },
});

const SendButton = styled(Button)({
  marginTop: "10px",
  background: "#12596B",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#12596B",
    transform: "scale(0.98)",
  },
});
const RejectButton = styled(Button)({
  background: "#D32F2F",
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#D32F2F",
    transform: "scale(0.98)",
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
  gap: "20px",
});
const ListItemForModalDescription = styled(ListItem)({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
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

const ManagerRequestPending = () => {
  const [detailModals, setDetailModals] = useState([]);
  const [acceptModals, setAcceptModals] = useState([]);
  const [declineModal, setDeclineModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_MANAGER });
  }, []);

  const { loadingRequest, errorRequest, allRequest } = useSelector(
    (state) => state.request
  );

  if (allRequest.length === 0) {
    return <Box>No requests available</Box>;
  }

  const handleAcceptRequest = async (id) => {
    setLoading(true);
    await axios
      .post(`/manager/requestToApprove/${id}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        console.log("rejected", response);
        setResponse(true);
        setTimeout(() => {
          setResponse(false);
          setAcceptModals(false);
        }, 5000);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
          setAcceptModals(false);
        }, 5000);
        console.log(error);
      });
  };
  const handleDeclineRequest = async (request) => {
    setLoading(true);
    await axios
      .post(
        `/manager/rejectedrequest/${request.id}/${request.item_no}/${request.quantity_requested}`,
        null,
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        console.log("rejected", response);
        setResponse(true);
        setTimeout(() => {
          setResponse(false);
          setDeclineModal(false);
        }, 5000);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
          setDeclineModal(false);
        }, 5000);
        console.log(error);
      });
  };

  const handleDetailModalOpen = (index) => {
    const updatedDetailModals = [...detailModals];
    updatedDetailModals[index] = true;
    setDetailModals(updatedDetailModals);
  };

  const handleDetailModalClose = (index) => {
    const updatedDetailModals = [...detailModals];
    updatedDetailModals[index] = false;
    setDetailModals(updatedDetailModals);
  };

  const handleAcceptModalOpen = (index) => {
    const updatedAcceptedModals = [...acceptModals];
    updatedAcceptedModals[index] = true;
    setAcceptModals(updatedAcceptedModals);
  };

  const handleAcceptModalClose = (index) => {
    const updatedAcceptedModals = [...acceptModals];
    updatedAcceptedModals[index] = false;
    setAcceptModals(updatedAcceptedModals);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log(allRequest);
  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No requests available</Box>;
  }

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                border: "1px solid #12596B",
                borderRadius: "10px",
                padding: "20px 5px",
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="250px"
                src={`${PF}${item?.Item?.productphoto}`}
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
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      First Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.User?.first_name}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Last Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.User?.last_name}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Property Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.Item?.productname}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{ display: "flex", alignItems: "center", gap: "5px" }}
                  >
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Quantity Requested:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.quantity_requested}
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
                    onClick={() => handleAcceptModalOpen(index)}
                  >
                    Accept
                  </AcceptButton>
                  <DetailButton
                    variant="contained"
                    onClick={() => handleDetailModalOpen(index)}
                  >
                    Details
                  </DetailButton>
                </ButtonGroup>
              </CardActions>
            </Card>
          </Grid>

          <DetailModalContainer
            open={detailModals[index] || false}
            onClose={() => handleDetailModalClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DetailModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
            >
              <List>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{ textDecoration: "underline", color: "#12596B" }}
                >
                  Move Order Details
                </Typography>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee First Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.first_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Last Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.last_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Email:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.email
                      ? item?.User?.email
                      : "Email not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Phone Number:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.phone_number
                      ? item?.User?.phone_number
                      : "Phone not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Department
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.department
                      ? item?.User?.department
                      : "Depar... not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productname}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Model:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productmodel}
                  </Typography>
                </ListItemForModal>
                <ListItemForModalDescription>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Description
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productdescription}
                  </Typography>
                </ListItemForModalDescription>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Quantity Requested
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.quantity_requested}
                  </Typography>
                </ListItemForModal>
              </List>
            </DetailModalWrapper>
          </DetailModalContainer>
          <AcceptModal
            open={acceptModals[index] || false}
            onClose={() => handleAcceptModalClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AcceptModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "70%" }}
            >
              <List>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{ textDecoration: "underline", color: "#12596B" }}
                >
                  Request Deatils
                </Typography>
                {loading && (
                  <Box sx={{ textAlign: "center" }}>
                    <ClipLoader
                      color={"#36d7b7"}
                      loading={loading}
                      size={50}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                )}
                {error && (
                  <Box
                    sx={{
                      backgroundColor: "red",
                      color: "white",
                      fontSize: " 18px",
                      padding: " 5px 15px",
                      marginY: "10px",
                      textAlign: "center",
                    }}
                  >
                    Error Occurred
                  </Box>
                )}
                {response && (
                  <Box
                    sx={{
                      backgroundColor: "#12596B",
                      color: "white",
                      fontSize: " 18px",
                      padding: " 5px 15px",
                      marginY: "10px",
                      textAlign: "center",
                    }}
                  >
                    Request Done Successfully
                  </Box>
                )}
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee First Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.first_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Last Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.last_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Email:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.email
                      ? item?.User?.email
                      : "Email not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Employee Phone Number:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.phone_number
                      ? item?.User?.phone_number
                      : "Phone not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Department
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.User?.department
                      ? item?.User?.department
                      : "Depar... not provided"}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Name:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productname}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Model:
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productmodel}
                  </Typography>
                </ListItemForModal>
                <ListItemForModalDescription>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Product Description
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.Item?.productdescription}
                  </Typography>
                </ListItemForModalDescription>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    Quantity Requested
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.quantity_requested}
                  </Typography>
                </ListItemForModal>
              </List>
              <SendButton
                variant="contained"
                sx={{ background: "#12596B" }}
                fullWidth
                onClick={() => handleAcceptRequest(item.id)}
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
                sx={{ textDecoration: "underline", color: "#12596B" }}
              >
                Decline Request
              </Typography>
              {loading && (
                <Box sx={{ textAlign: "center" }}>
                  <ClipLoader
                    color={"#36d7b7"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </Box>
              )}
              {error && (
                <Box
                  sx={{
                    backgroundColor: "red",
                    color: "white",
                    fontSize: " 18px",
                    padding: " 5px 15px",
                    marginY: "10px",
                    textAlign: "center",
                  }}
                >
                  Error Occurred
                </Box>
              )}
              {response && (
                <Box
                  sx={{
                    backgroundColor: "#12596B",
                    color: "white",
                    fontSize: " 18px",
                    padding: " 5px 15px",
                    marginY: "10px",
                    textAlign: "center",
                  }}
                >
                  Request Done Successfully
                </Box>
              )}
              <Textarea
                minRows={5}
                sx={{ fontSize: "18px", marginBottom: "15px" }}
                placeholder="Send decline reason to user"
              />
              <RejectButton
                variant="contained"
                fullWidth
                onClick={() => {
                  const request = {
                    id: item.id,
                    item_no: item.item_no,
                    quantity_requested: item.quantity_requested,
                  };
                  handleDeclineRequest(request);
                }}
              >
                Decline Order
              </RejectButton>
            </DeclineModalWrapper>
          </DeclineModal>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default ManagerRequestPending;
