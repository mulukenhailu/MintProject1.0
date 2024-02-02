import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormGroup,
  Grid,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
import {
  getNewRequestList,
  setCurrentRequestPage,
} from "../../State/ReduxToolkit/Slices/requestSlice";
import BeatLoader from "react-spinners/BeatLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import { format } from "timeago.js";

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
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});
const SendButton = styled(Button)({
  marginTop: "20px",
  background: "#12596B",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#12596B",
    transform: "scale(1.01)",
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
  padding: "20px 20px 30px 20px",
});

const StorekeeperPendingItems = () => {
  const dispatch = useDispatch();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { t } = useTranslation("global");
  const { allRequest, loadingRequest } = useSelector((state) => state.request);
  const { languange } = useSelector((state) => state.languange);
  const [detailModals, setDetailModals] = useState(false);
  const [acceptModals, setAcceptModals] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER });
  }, []);

  const handleInsertConfirmationNumber = (id) => {
    setLoading(true);
    axios
      .post(`/storekeeper/blessing/${id}/${confirmationNumber}`, null, {
        withCredentials: true,
      })
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
          setResponse(false);
          setAcceptModals(false);
          dispatch(setCurrentRequestPage("accepted"));
        }, 60000);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
          setAcceptModals(false);
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

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
  console.log("store keeeper pending items", sortedAllRequest);
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
                    src={`${PF}${item?.item?.productphoto}`}
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
                          {t("storekeeper.firstname")}
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
                          {t("storekeeper.lastname")}
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
                          {t("storekeeper.propertyname")}
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
                          {item?.item?.productname}
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
                          {t("storekeeper.propertymodel")}
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
                          {item?.item?.productmodel}
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
                          {t("storekeeper.quantity")}
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
                        {t("storekeeper.accept")}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setDetailModals(true);
                          setSelectedItem(item);
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
                        {t("storekeeper.detail")}
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
                  {t("storekeeper.requestdetail")}
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
                      {t("storekeeper.firstname")}
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
                      {t("storekeeper.lastname")}
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
                      {t("storekeeper.email")}
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
                      {t("storekeeper.phonenumber")}
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
                      {t("storekeeper.department")}
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
                        : "Dept... not provided"}
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
                      {t("storekeeper.propertyname")}
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
                      {selectedItem?.item?.productname}
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
                      {t("storekeeper.propertymodel")}
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
                      {selectedItem?.item?.productmodel}
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
                      {t("storekeeper.description")}
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
                      {selectedItem?.item?.productdescription}
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
                      {t("storekeeper.quantity")}
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
                      {t("storekeeper.createdat")}
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
                      {format(`${selectedItem?.created_at}`)}
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
              width={{ xs: "90%", sm: "50%", md: "50%", lg: "35%" }}
            >
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
                  Error while requesting
                </Box>
              )}
              {response && (
                <Box
                  sx={{
                    backgroundColor: "#12596B",
                    color: "white",
                    fontSize: " 18px",
                    padding: " 5px 30px 5px 10px",
                    marginY: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ flex: "2" }}>
                    Processing takes some time
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "0px",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flex: "1",
                    }}
                  >
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
              <TextField
                name="confirmation"
                fullWidth
                label={t("storekeeper.confirmation")}
                onChange={(e) => setConfirmationNumber(e.target.value)}
              />
              <SendButton
                variant="contained"
                sx={{ background: "#12596B" }}
                fullWidth
                onClick={() => {
                  handleInsertConfirmationNumber(selectedItem?.id);
                }}
              >
                {t("storekeeper.confirm")}
              </SendButton>
            </AcceptModalWrapper>
          </AcceptModal>
        </Grid>
      )}
    </>
  );
};

export default StorekeeperPendingItems;
