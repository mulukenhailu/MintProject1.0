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
  background: "#FFC107",
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#FFC107",
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
  const [detailModals, setDetailModals] = useState([]);
  const [acceptModals, setAcceptModals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(null);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const { allRequest } = useSelector((state) => state.request);

  const Sources = [
    { value: 101, label: "101" },
    { value: 103, label: "103" },
  ];

  const Items = [
    { value: 4531, label: "4531" },
    { value: 4529, label: "4529" },
  ];

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

  const handleInsertConfirmationNumber = (id) => {
    setLoading(true);
    axios
      .post(`/storekeeper/blessing/${id}/${confirmationNumber}`, null, {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        setError(false);
        setResponse(response.data);
        setTimeout(() => {
          setResponse(false);
          setAcceptModals(false);
        }, 5000);
        console.log(response);
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

  useEffect(() => {
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER });
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No order requested</Box>;
  }

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {allRequest?.map((item, index) => (
        <React.Fragment>
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
                src={`${PF}${item?.item?.productphoto}`}
              />
              <CardContent>
                <List>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Employee First Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.item?.request[0]?.User?.first_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Employee Last Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.item?.request[0]?.User?.last_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Product Name:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.item?.productname}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Product Model:
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.item?.productmodel}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <ButtonGroup fullWidth>
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
                  Request Details
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
                    {item?.item?.request[0]?.User?.first_name}
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
                    {item?.item?.request[0]?.User?.last_name}
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
                    {item?.item?.request[0]?.User?.email
                      ? item?.item?.request[0]?.User?.email
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
                    {item?.item?.request[0]?.User?.phone_number
                      ? item?.item?.request[0]?.User?.phone_number
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
                    {item?.item?.request[0]?.User?.department
                      ? item?.item?.request[0]?.User?.department
                      : "Dept... not provided"}
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
                    {item?.item?.productname}
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
                    {item?.item?.productmodel}
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
                    {item?.item?.productdescription}
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
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
            >
              <Typography
                variant="h5"
                textAlign={"center"}
                marginBottom={"20px"}
                sx={{ textDecoration: "underline", color: "#12596B" }}
              >
                Insert confirmation number
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
              <TextField
                name="confirmation"
                fullWidth
                label="Confirmation number"
                onChange={(e) => setConfirmationNumber(e.target.value)}
              />
              <SendButton
                variant="contained"
                sx={{ background: "#12596B" }}
                fullWidth
                onClick={() => {
                  handleInsertConfirmationNumber(item.id);
                }}
              >
                Confirm
              </SendButton>
            </AcceptModalWrapper>
          </AcceptModal>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default StorekeeperPendingItems;
