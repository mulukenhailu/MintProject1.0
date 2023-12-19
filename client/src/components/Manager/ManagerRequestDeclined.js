import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  styled,
  ListItem,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_DECLINED_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";
import { removeAllRequest } from "../../State/ReduxToolkit/Slices/requestSlice";

const DeclineModalContainer = styled(Modal)({
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
const DetailButton = styled(Button)({
  marginRight: "10px",
  background: "#E5953D",
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    background: "#E5953D",
    transform: "scale(0.98)",
  },
});
const ManagerRequestDeclined = () => {
  const dispatch = useDispatch();
  const [detailModals, setDetailModals] = useState([]);
  const { allRequest } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_DECLINED_REQUEST_FOR_MANAGER });
  }, []);

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

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No requests available</Box>;
  }

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => (
        <React.Fragment>
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
                height="250"
                src={`${PF}${item.Item.productphoto}`}
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
                      First Name:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item.User.first_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Last Name:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item.User.last_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Product-name:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item.Item.productname}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      Quantity Requested:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item.quantity_requested}
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <DetailButton
                  variant="contained"
                  fullWidth
                  onClick={() => handleDetailModalOpen(index)}
                >
                  Details
                </DetailButton>
              </CardActions>
            </Card>
          </Grid>
          <DeclineModalContainer
            open={detailModals[index] || false}
            onClose={() => handleDetailModalClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DeclineModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
            >
              <List>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{ textDecoration: "underline", color: "#12596B" }}
                >
                  Decline Details
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
                    {item.User.first_name}
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
                    {item.User.last_name}
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
                    {item.User.email ? item.User.email : "Email not provided"}
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
                    {item.User.phone_number
                      ? item.User.phone_number
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
                    {item.User.department
                      ? item.User.department
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
                    {item.Item.productname}
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
                    {item.Item.productmodel}
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
                    {item.Item.productdescription}
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
                    {item.quantity_requested}
                  </Typography>
                </ListItemForModal>
              </List>
            </DeclineModalWrapper>
          </DeclineModalContainer>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default ManagerRequestDeclined;
