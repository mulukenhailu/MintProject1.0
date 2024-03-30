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
  Paper,
  Typography,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { format } from "timeago.js";
import { GET_ALL_PENDING_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";
import {
  getNewRequestList,
  removeAllRequest,
  removeCurrentRequestPage,
  setAcceptedRequestId,
  setCurrentRequestPage,
} from "../../State/ReduxToolkit/Slices/requestSlice";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
import BeatLoader from "react-spinners/BeatLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import toast from "react-hot-toast";
import { format } from "timeago.js";

const SendButton = styled(Button)({
  background: "#12596B",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#12596B",
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
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [detailModals, setDetailModals] = useState(false);
  const [acceptModals, setAcceptModals] = useState(false);
  const [declineModals, setDeclineModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(false);
  const [error, setError] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  const { loadingRequest, errorRequest, allRequest } = useSelector(
    (state) => state.request
  );
  const { first_name, last_name, profile_picture } = useSelector(
    (state) => state.user.user
  );
  const { languange } = useSelector((state) => state.languange);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(removeAllRequest());
    dispatch(removeCurrentRequestPage());
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_MANAGER });
  }, []);

  const handleAcceptRequest = async (id) => {
    setLoading(true);
    await axios
      .post(
        `/manager/requestToApprove/${id}`,
        {
          remark: `Your request is accepted by your manager ${first_name} ${last_name}`,
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
        console.log("rejected", response);
        setResponse(true);
        if (allRequest.length === 1) {
          setTimeout(() => {
            dispatch(getNewRequestList(id));
            dispatch(setCurrentRequestPage("accepted"));
            setResponse(false);
            setAcceptModals(false);
          }, 60000);
        } else {
          dispatch(getNewRequestList(id));
        }
        setTimeout(() => {
          toast.success("Request done successfully.");
          setResponse(false);
          setAcceptModals(false);
          dispatch(setCurrentRequestPage("accepted"));
        }, 60000);
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
    const newBody = {
      receiver: request.receiver,
      reason: rejectReason,
      senderFirstName: first_name,
      senderLastName: last_name,
      senderProfilePicture: profile_picture,
    };
    setLoading(true);
    await axios
      .post(
        `/manager/rejectrequest/${request.id}/${request.item_no}/${request.quantity_requested}`,
        newBody,
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        console.log("rejected", response);
        setResponse(true);
        if (allRequest.length === 1) {
          setTimeout(() => {
            dispatch(getNewRequestList(request?.id));
            dispatch(setCurrentRequestPage("declined"));
            setResponse(false);
            setAcceptModals(false);
          }, 60000);
        } else {
          dispatch(getNewRequestList(request?.id));
        }
        setTimeout(() => {
          setResponse(false);
          setAcceptModals(false);
          dispatch(setCurrentRequestPage("declined"));
          toast.success("Request done successfully.");
        }, 60000);
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

  // if (!allRequest) {
  //   return <Box>No order requested</Box>;
  // }
  // if (allRequest?.length === 0 || allRequest === "Empty") {
  //   return <Box>No order requested</Box>;
  // }

  console.log("all request", allRequest);
  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  console.log("sorted all request", sortedAllRequest);

  return (
    <>
      {loadingRequest ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <ScaleLoader
            color={"#36d7b7"}
            loading={loadingRequest}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : sortedAllRequest.length === 0 ? (
        <Box>No order requested</Box>
      ) : (
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {sortedAllRequest?.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6} lg={4}>
                <Card
                  sx={{
                    border: "1px solid #12596B",
                    borderRadius: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250px"
                    src={`${PF}${item?.Item?.productphoto}`}
                    sx={{ objectFit: "fill", padding: "15px 15px 0px 15px" }}
                  />
                  <CardContent sx={{ padding: "0px" }}>
                    <List sx={{ width: "100%" }}>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          flex={1}
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                        >
                          {t("manager.firstname")}
                        </Typography>
                        <Typography
                          flex={1}
                          variant="body1"
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 400 : 400,
                            fontSize: languange === "en" ? 18 : 20,
                          }}
                        >
                          {item?.User?.first_name}
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          flex={1}
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                        >
                          {t("manager.lastname")}
                        </Typography>
                        <Typography
                          flex={1}
                          variant="body1"
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 400 : 400,
                            fontSize: languange === "en" ? 18 : 20,
                          }}
                        >
                          {item?.User?.last_name}
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          flex={1}
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                        >
                          {t("manager.propertyname")}
                        </Typography>
                        <Typography
                          flex={1}
                          variant="body1"
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 400 : 400,
                            fontSize: languange === "en" ? 18 : 20,
                          }}
                        >
                          {item?.Item?.productname}
                        </Typography>
                      </ListItem>
                      <ListItem
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "15px",
                        }}
                      >
                        <Typography
                          variant="h6"
                          flex={1}
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                        >
                          {t("manager.quantity")}
                        </Typography>
                        <Typography
                          flex={1}
                          variant="body1"
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 400 : 400,
                            fontSize: languange === "en" ? 18 : 20,
                          }}
                        >
                          {item?.quantity_requested}
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ padding: "0px 15px 15px 15px" }}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setDeclineModal(true);
                        }}
                        sx={{
                          fontSize: {
                            xs: languange === "en" ? "16px" : "18px",
                            md: languange === "en" ? "18px" : "20px",
                          },
                          textTransform: "capitalize",
                          flex: "1",
                          color: "red",
                          border: "2px solid red",
                        }}
                      >
                        {t("manager.decline")}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setAcceptModals(true);
                        }}
                        sx={{
                          fontSize: {
                            xs: languange === "en" ? "16px" : "18px",
                            md: languange === "en" ? "18px" : "20px",
                          },
                          textTransform: "capitalize",
                          flex: "1",
                          color: "#12596B",
                          border: "2px solid #12596B",
                        }}
                      >
                        {t("manager.accept")}
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          setSelectedItem(item);
                          setDetailModals(true);
                        }}
                        sx={{
                          fontSize: {
                            xs: languange === "en" ? "16px" : "18px",
                            md: languange === "en" ? "18px" : "20px",
                          },
                          textTransform: "capitalize",
                          flex: "1",
                          borderWidth: "2px",
                        }}
                        color="warning"
                      >
                        {t("manager.detail")}
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            </React.Fragment>
          ))}
          <DetailModalContainer
            open={detailModals}
            onClose={() => setDetailModals(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DetailModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
            >
              <List>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 900 : 900,
                    fontSize: languange === "en" ? 24 : 28,
                  }}
                >
                  {t("manager.requestdetail")}
                </Typography>
                <Box
                  sx={{
                    height: {
                      xs: "60vh",
                      md: "55vh",
                      lg: "55vh",
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
                    },
                  }}
                >
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.firstname")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.User?.first_name}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.lastname")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.User?.last_name}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.email")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.User?.email
                        ? selectedItem?.User?.email
                        : "Email not provided"}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.phonenumber")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.User?.phone_number
                        ? selectedItem?.User?.phone_number
                        : "Phone not provided"}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.department")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.User?.department
                        ? selectedItem?.User?.department
                        : "Depar... not provided"}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.propertyname")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.Item?.productname}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.propertymodel")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
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
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.description")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.Item?.productdescription}
                    </Typography>
                  </ListItemForModalDescription>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.quantity")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {selectedItem?.quantity_requested}
                    </Typography>
                  </ListItemForModal>
                  <ListItemForModal
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <Typography
                      variant="body1"
                      flex={2}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 500 : 900,
                        fontSize: languange === "en" ? 20 : 24,
                      }}
                    >
                      {t("manager.requestdate")}
                    </Typography>
                    <Typography
                      variant="body2"
                      flex={4}
                      sx={{
                        color: "#12596B",
                        fontSize: languange === "en" ? 16 : 18,
                      }}
                      fontWeight={400}
                    >
                      {format(`${selectedItem?.created_at}}`)}
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
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
            >
              <List
                sx={{
                  height: {
                    xs: "80vh",
                    sm: "60vh",
                    md: "50vh",
                    lg: "85vh",
                  },
                  padding: loading ? "0px 0px 40px 0px" : "0px 0px 30px 0px",
                }}
              >
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  sx={{
                    color: "#12596B",
                    marginBottom: "0px",
                    fontWeight: languange === "en" ? 900 : 900,
                    fontSize: languange === "en" ? 24 : 28,
                    marginBottom: loading || response || error ? null : "10px",
                    height: "7%",
                  }}
                >
                  {t("manager.requestdetail")}
                </Typography>
                {loading && (
                  <Box
                    sx={{
                      textAlign: "center",
                      height: "10%",
                      marginBottom: "7px",
                    }}
                  >
                    <ClipLoader
                      color={"#36d7b7"}
                      loading={loading}
                      size={40}
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
                      width: "100%",
                      height: "8%",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography variant="h6" padding={0} color={"white"}>
                      Error Occurred
                    </Typography>
                  </Box>
                )}
                {response && (
                  <Box
                    sx={{
                      backgroundColor: "#12596B",
                      color: "white",
                      width: "100%",
                      height: "8%",
                      display: "flex",
                      alignItems: "center",
                      marginY: "10px",
                      justifyContent: "center",
                      borderRadius: "5px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: languange === "en" ? 16 : 18,
                          padding: "15px 0px",
                        }}
                      >
                        Processing takes some time
                      </Typography>
                      <BeatLoader
                        color={"#fff"}
                        loading={response}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </Box>
                  </Box>
                )}
                <Paper
                  elevation={4}
                  sx={{
                    overflowY: "hidden",
                    height: response || loading || error ? "75%" : "83%",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      padding: "20px 10px 50px 10px",
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
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.firstname")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.User?.first_name}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.lastname")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.User?.last_name}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.email")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.User?.email
                          ? selectedItem?.User?.email
                          : "Email not provided"}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.phonenumber")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.User?.phone_number
                          ? selectedItem?.User?.phone_number
                          : "Phone not provided"}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.department")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.User?.department
                          ? selectedItem?.User?.department
                          : "Depar... not provided"}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.propertyname")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.Item?.productname}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.propertymodel")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
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
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.description")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.Item?.productdescription}
                      </Typography>
                    </ListItemForModalDescription>
                    <ListItemForModal
                      sx={{ display: { xs: "block", sm: "flex" } }}
                    >
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 900 : 900,
                          fontSize: languange === "en" ? 18 : 24,
                        }}
                      >
                        {t("manager.quantity")}
                      </Typography>
                      <Typography
                        variant="body2"
                        flex={4}
                        sx={{
                          color: "#12596B",
                          fontSize: languange === "en" ? 16 : 18,
                        }}
                        fontWeight={400}
                      >
                        {selectedItem?.quantity_requested}
                      </Typography>
                    </ListItemForModal>
                  </Box>
                </Paper>
                <SendButton
                  variant="contained"
                  fullWidth
                  size="small"
                  disabled={loading || response}
                  sx={{
                    height: "10%",
                    background: "#12596B",
                    fontSize: languange === "en" ? 18 : 20,
                    textTransform: "capitalize",
                    marginTop: "20px",
                    color: "white",
                    "&:disabled": {
                      cursor: "not-allowed",
                      pointerEvents: "all !important",
                      color: "#fff",
                      background: "#12596b",
                    },
                  }}
                  onClick={() => handleAcceptRequest(selectedItem?.id)}
                >
                  {t("manager.accept")}
                </SendButton>
              </List>
            </AcceptModalWrapper>
          </AcceptModal>
          <DeclineModal
            open={declineModals}
            onClose={() => setDeclineModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeclineModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
            >
              <Typography
                variant="h5"
                textAlign={"center"}
                marginBottom={"10px"}
                sx={{
                  color: "#12596B",
                  fontWeight: languange === "en" ? 500 : 700,
                  fontSize: languange === "en" ? 24 : 28,
                  height: "15%",
                }}
              >
                {t("manager.declinefrom")}
              </Typography>
              {loading && (
                <Box sx={{ textAlign: "center", height: "15%" }}>
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
                    height: "15%",
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
                    width: "100%",
                    height: "15%",
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: languange === "en" ? 16 : 18,
                        padding: "15px 0px",
                      }}
                    >
                      Processing takes some time
                    </Typography>
                    <BeatLoader
                      color={"#fff"}
                      loading={response}
                      size={10}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </Box>
                </Box>
              )}
              <Textarea
                minRows={8}
                sx={{ fontSize: "18px", marginBottom: "15px", height: "50%" }}
                placeholder={t("manager.declinereason")}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <Button
                variant="outlined"
                fullWidth
                onClick={() => {
                  const request = {
                    id: selectedItem.id,
                    item_no: selectedItem.item_no,
                    quantity_requested: selectedItem.quantity_requested,
                    receiver: selectedItem.User.user_name,
                  };
                  handleDeclineRequest(request);
                }}
                sx={{
                  textTransform: "capitalize",
                  color: "red",
                  border: "2px solid red",
                  fontWeight: languange === "en" ? 500 : 700,
                  fontSize: languange === "en" ? 18 : 22,
                  height: "20%",
                }}
              >
                {t("manager.decline")}
              </Button>
            </DeclineModalWrapper>
          </DeclineModal>
        </Grid>
      )}
    </>
  );
};

export default ManagerRequestPending;
