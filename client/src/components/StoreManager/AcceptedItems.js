import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
  styled,
  Button,
  Modal,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_ACCEPTED_REQUEST_FOR_STOREHEAD } from "../../State/ReduxSaga/Types/storeHeadRequestTypes";

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

const AcceptedItemsComponent = () => {
  const [detailModals, setDetailModals] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREHEAD });
  }, [dispatch]);

  const { allRequest } = useSelector((state) => state.request);

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

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No Request</Box>;
  }
  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => {
        return (
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
                  height="250"
                  image={`${PF}${item?.item?.productphoto}`}
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
                        variant="body2"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {item?.item?.request[0]?.User?.first_name}
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
                        variant="body2"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {item?.item?.request[0]?.User?.last_name}
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
                        Product Name:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {item?.item?.productname}
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
                        Approved Manager:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {item?.item?.request[0]?.User?.manager_username}
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
                        Quantity:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {item?.quantity_requested}
                      </Typography>
                    </ListItem>
                  </List>
                </CardContent>
                <CardActions>
                  <DetailButton
                    variant="contained"
                    fullWidth
                    type="small"
                    onClick={() => handleDetailModalOpen(index)}
                  >
                    Details
                  </DetailButton>
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
                    Store Head Pending Details
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
                      {item?.item?.request[0]?.User?.phonenumber
                        ? item?.item?.request[0]?.User?.phonenumber
                        : "Phone Number not provided"}
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
                      {item?.employeeRequest?.User?.department
                        ? item?.employeeRequest?.User?.department
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
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default AcceptedItemsComponent;
