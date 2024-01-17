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
import { getNewRequestList } from "../../State/ReduxToolkit/Slices/requestSlice";

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
  const { allRequest } = useSelector((state) => state.request);
  const [detailModals, setDetailModals] = useState(false);
  const [acceptModals, setAcceptModals] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER });
  }, []);

  const handleInsertConfirmationNumber = (id) => {
    setLoading(true);
    axios
      .post(`/storekeeper/blessing/${id}/${confirmationNumber}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(getNewRequestList(id));
        setLoading(false);
        setError(false);
        setResponse(response.data);
        setTimeout(() => {
          setAcceptModals(false);
          setResponse(false);
        }, 5000);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data?.error);

        setTimeout(() => {
          setAcceptModals(false);
          setError("");
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

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );
  console.log("store keeeper pending items", sortedAllRequest);
  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                border: "2px solid #12596B",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="250px"
                src={`${PF}${item?.item?.productphoto}`}
                sx={{ objectFit: "fill", padding: "5px 10px 0px 10px" }}
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
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("storekeeper.firstname")}
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
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("storekeeper.lastname")}
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
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("storekeeper.propertyname")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {item?.item?.productname}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("storekeeper.propertymodel")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {item?.item?.productmodel}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("storekeeper.quantity")}
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
              <CardActions sx={{ marginBottom: "10px" }}>
                <ButtonGroup fullWidth>
                  <AcceptButton
                    variant="contained"
                    onClick={() => {
                      setSelectedItem(item);
                      setAcceptModals(true);
                    }}
                  >
                    {t("storekeeper.accept")}
                  </AcceptButton>
                  <DetailButton
                    variant="contained"
                    onClick={() => {
                      setDetailModals(true);
                      setSelectedItem(item);
                    }}
                    color="warning"
                  >
                    {t("storekeeper.detail")}
                  </DetailButton>
                </ButtonGroup>
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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "70%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ color: "#12596B" }}
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
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storekeeper.firstname")}
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
                  {t("storekeeper.lastname")}
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
                  {t("storekeeper.email")}
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
                  {t("storekeeper.phonenumber")}
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
                  {t("storekeeper.department")}
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
                  {t("storekeeper.propertyname")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.item?.productname}
                </Typography>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storekeeper.propertymodel")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
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
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storekeeper.description")}
                </Typography>
                <Typography
                  variant="body2"
                  flex={4}
                  sx={{ color: "#12596B" }}
                  fontWeight={400}
                >
                  {selectedItem?.item?.productdescription}
                </Typography>
              </ListItemForModalDescription>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Typography
                  variant="body1"
                  flex={2}
                  sx={{ color: "#12596B" }}
                  fontWeight={900}
                >
                  {t("storekeeper.quantity")}
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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
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
              {error}
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
  );
};

export default StorekeeperPendingItems;
