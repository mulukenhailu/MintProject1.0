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
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_DECLINED_REQUEST_FOR_STOREHEAD } from "../../State/ReduxSaga/Types/storeHeadRequestTypes";
import { removeAllRequest } from "../../State/ReduxToolkit/Slices/requestSlice";
import { useTranslation } from "react-i18next";

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

const DeclinedItemsComponent = () => {
  const { t } = useTranslation("global");
  const [detailModals, setDetailModals] = useState([]);
  const { allRequest } = useSelector((state) => state.request);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_DECLINED_REQUEST_FOR_STOREHEAD });
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

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No requests available</Box>;
  }
  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => (
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
                image={`${PF}${item?.employeeRequest?.Item?.productphoto}`}
              />
              <CardContent sx={{ padding: "0px" }}>
                <List>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      flex={1}
                      fontWeight={900}
                    >
                      {t("storehead.firstname")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {
                        item?.employeeRequest?.Item?.request[0]?.User
                          ?.first_name
                      }
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
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
                      {item?.employeeRequest?.Item?.request[0]?.User?.last_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
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
                      {item?.employeeRequest?.Item?.productname}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
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
                <DetailButton
                  variant="contained"
                  fullWidth
                  onClick={() => handleDetailModalOpen(index)}
                  sx={{ fontSize: "20px", textTransform: "capitalize" }}
                >
                  {t("storehead.detail")}
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
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "70%" }}
            >
              <List>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  marginBottom={"10px"}
                  sx={{ color: "#12596B" }}
                >
                  {t("storehead.requestdetail")}
                </Typography>
                <ListItemForModal>
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
                    {item?.employeeRequest?.Item?.request[0]?.User?.first_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
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
                    {item?.employeeRequest?.Item?.request[0]?.User?.last_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
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
                    {item?.employeeRequest?.Item?.request[0]?.User?.email
                      ? item?.employeeRequest?.Item?.request[0]?.User?.email
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
                    {t("storehead.phonenumber")}
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.employeeRequest?.Item?.request[0]?.User?.phone_number
                      ? item?.employeeRequest?.Item?.request[0]?.User
                          ?.phone_number
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
                    {t("storehead.department")}
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.employeeRequest?.Item?.request[0]?.User?.department
                      ? item?.employeeRequest?.Item?.request[0]?.User
                          ?.department
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
                    {t("storehead.propertyname")}
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.employeeRequest?.Item?.productname}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
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
                    {item?.employeeRequest?.Item?.productmodel}
                  </Typography>
                </ListItemForModal>
                <ListItemForModalDescription>
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
                    {item?.employeeRequest?.Item?.productdescription}
                  </Typography>
                </ListItemForModalDescription>
                <ListItemForModal>
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

export default DeclinedItemsComponent;
