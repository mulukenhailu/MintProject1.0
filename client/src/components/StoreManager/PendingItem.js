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
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
import {
  getNewRequestList,
  removeAllRequest,
} from "../../State/ReduxToolkit/Slices/requestSlice";

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
    transform: "scale(1.1)",
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
  marginRight: "10px",
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

const PendingItemComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const [detailModals, setDetailModals] = useState(false);
  const [acceptModals, setAcceptModals] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);
  const { allRequest } = useSelector((state) => state.request);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const { first_name, last_name, profile_picture } = useSelector(
    (state) => state.user.user
  );

  useEffect(() => {
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREHEAD });
  }, []);

  const handleAcceptRequest = async (id) => {
    setLoading(true);
    await axios
      .post(
        `/storehead/requestToApprove/${id}`,
        {
          remark: `Your request is accepted by store head ${first_name}  ${last_name}`,
          senderFirstName: first_name,
          senderLastName: last_name,
          senderProfilePicture: profile_picture,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setLoading(false);
        setResponse(true);
        dispatch(getNewRequestList(id));
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
    const newData = {
      receiver: request.receiver,
      reason: rejectReason,
      senderFirstName: first_name,
      senderLastName: last_name,
      senderProfilePicture: profile_picture,
    };
    setLoading(true);
    await axios
      .post(
        `/storehead/rejectedrequest/${request.id}/${request.item_no}/${request.quantity_requested}`,
        newData,
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        console.log("rejected  for store head", response);
        dispatch(getNewRequestList(request?.id));
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

  if (!allRequest) {
    return <Box>No order requested</Box>;
  }
  if (allRequest?.length === 0 || allRequest === "Empty") {
    return <Box>No order requested</Box>;
  }
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  console.log("sorted store head pending", sortedAllRequest);
  console.log("selected item", selectedItem);

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6} lg={4}>
              <Card
                sx={{
                  border: "2px solid black",
                  borderRadius: "10px",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="250px"
                  src={`${PF}${item?.Item?.productphoto}`}
                  sx={{ objectFit: "fill", padding: "10px 5px 10px 5px" }}
                />
                <CardContent sx={{ padding: "0px" }}>
                  <List>
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        marginRight={1}
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                        flex={1}
                      >
                        {t("storehead.firstname")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={1}
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
                        variant="h6"
                        marginRight={1}
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                        flex={1}
                      >
                        {t("storehead.lastname")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={1}
                      >
                        {item?.User?.last_name}
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
                        variant="h6"
                        marginRight={1}
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                        flex={1}
                      >
                        {t("storehead.propertyname")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={1}
                      >
                        {item?.Item?.productname}
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
                        variant="h6"
                        marginRight={1}
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                        flex={1}
                      >
                        {t("storehead.quantity")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={1}
                      >
                        {item?.quantity_requested}
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <ButtonGroup>
                    <DeclineButton
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setDeclineModal(true);
                        setSelectedItem(item);
                      }}
                      sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        textTransform: "capitalize",
                      }}
                    >
                      {t("storehead.decline")}
                    </DeclineButton>
                    <AcceptButton
                      variant="contained"
                      onClick={() => {
                        setAcceptModals(true);
                        setSelectedItem(item);
                      }}
                      sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        textTransform: "capitalize",
                      }}
                    >
                      {t("storehead.accept")}
                    </AcceptButton>
                    <DetailButton
                      variant="contained"
                      onClick={() => {
                        setSelectedItem(item);
                        setDetailModals(true);
                      }}
                      sx={{
                        fontSize: { xs: "18px", md: "20px" },
                        textTransform: "capitalize",
                      }}
                    >
                      {t("storehead.detail")}
                    </DetailButton>
                  </ButtonGroup>
                </CardActions>
              </Card>
            </Grid>
          </React.Fragment>
        );
      })}
      <DetailModalContainer
        open={detailModals}
        onClose={() => setDetailModals(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "75%" }}
        >
          <List>
            <Typography
              variant="h4"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ color: "#12596B" }}
            >
              {t("storehead.requestdetail")}
            </Typography>
            <Box
              sx={{
                height: {
                  xs: "60vh",
                  md: "55vh",
                  lg: "55vh",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                  "&::-webkit-scrollbar-track": {
                    boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0,0,0,.1)",
                    outline: "1px solid slategrey",
                  },
                },
              }}
            >
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.firstname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.first_name}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.lastname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.last_name}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.email")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.email
                    ? selectedItem?.User?.email
                    : "Email not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.phonenumber")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.phone_number
                    ? selectedItem?.User?.phone_number
                    : "Phone not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.department")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.department
                    ? selectedItem?.User?.department
                    : "Dept... not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.propertyname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productname}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.propertymodel")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productmodel}
                </Typography>
              </ListItemForModal>
              <ListItemForModalDescription
                sx={{ display: { xs: "block", sm: "flex" } }}
              >
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.description")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productdescription}
                </Typography>
              </ListItemForModalDescription>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.quantity")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.quantity_requested}
                </Typography>
              </ListItemForModal>
            </Box>
          </List>
        </DetailModalWrapper>
      </DetailModalContainer>
      <AcceptModal
        open={acceptModals}
        onClose={() => setAcceptModals(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AcceptModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "80%" }}
        >
          <List
            sx={{
              height: {
                xs: "80vh",
                sm: "60vh",
                md: "50vh",
                lg: "70vh",
              },
            }}
          >
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"10px"}
              sx={{ color: "#12596B" }}
            >
              {t("storehead.requestdetail")}
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
            <Box
              sx={{
                height: "80%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "1px",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.firstname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.first_name}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.lastname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.last_name}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.email")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.email
                    ? selectedItem?.User?.email
                    : "Email not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.phonenumber")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.phone_number
                    ? selectedItem?.User?.phone_number
                    : "Phone not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.department")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.User?.department
                    ? selectedItem?.User?.department
                    : "Dept... not provided"}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.propertyname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productname}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.propertymodel")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productmodel}
                </Typography>
              </ListItemForModal>
              <ListItemForModalDescription
                sx={{ display: { xs: "block", sm: "flex" } }}
              >
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.description")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.Item?.productdescription}
                </Typography>
              </ListItemForModalDescription>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storehead.quantity")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.quantity_requested}
                </Typography>
              </ListItemForModal>
            </Box>
          </List>
          <SendButton
            variant="contained"
            sx={{
              background: "#12596B",
              fontSize: "20px",
              textTransform: "capitalize",
            }}
            fullWidth
            onClick={() => handleAcceptRequest(selectedItem?.id)}
          >
            {t("storehead.accept")}
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
            variant="h4"
            textAlign={"center"}
            marginBottom={"10px"}
            sx={{ color: "#12596B" }}
          >
            {t("storehead.declinefrom")}
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
            sx={{ fontSize: "18px", marginBottom: "20px" }}
            placeholder={t("storehead.declinereason")}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <RejectButton
            variant="contained"
            fullWidth
            onClick={() => {
              const request = {
                id: selectedItem?.id,
                item_no: selectedItem?.item_no,
                quantity_requested: selectedItem?.quantity_requested,
                receiver: selectedItem?.User?.user_name,
              };
              handleDeclineRequest(request);
            }}
          >
            {t("storehead.decline")}
          </RejectButton>
        </DeclineModalWrapper>
      </DeclineModal>
    </Grid>
  );
};

export default PendingItemComponent;
