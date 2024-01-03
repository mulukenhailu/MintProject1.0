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
import { GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER } from "../../State/ReduxSaga/Types/managerRequestType";
import { removeAllRequest } from "../../State/ReduxToolkit/Slices/requestSlice";
import { useTranslation } from "react-i18next";

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
    transform: "scale(0.99)",
  },
});
const ManagerRequestAccepted = () => {
  const dispatch = useDispatch();
  const [detailModals, setDetailModals] = useState([]);
  const { t } = useTranslation("global");

  useEffect(() => {
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER });
  }, []);

  const { loadingRequest, errorRequest, allRequest } = useSelector(
    (state) => state.request
  );

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No requests available</Box>;
  }

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

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

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {sortedAllRequest?.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                border: "1px solid #12596B",
                borderRadius: "10px",
                paddingBottom: "10px",
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={`${PF}${item.Item.productphoto}`}
              />
              <CardContent sx={{ padding: "0px" }}>
                <List>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("manager.firstname")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {item.User.first_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("manager.lastname")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {item.User.last_name}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("manager.propertyname")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
                    >
                      {item.Item.productname}
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                      flex={1}
                    >
                      {t("manager.quantity")}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                      flex={1}
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
                  type="small"
                  sx={{ fontSize: "20px", textTransform: "capitalize" }}
                  onClick={() => handleDetailModalOpen(index)}
                >
                  {t("manager.detail")}
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
              {console.log(item.User.first_name)}
              <List>
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{ color: "#12596B" }}
                >
                  {t("manager.requestdetail")}
                </Typography>
                <ListItemForModal>
                  <Typography
                    variant="body1"
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("manager.firstname")}
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
                    {t("manager.lastname")}
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
                    {t("manager.email")}
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
                    {t("manager.phonenumber")}
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
                    {t("manager.department")}
                  </Typography>
                  <Typography
                    variant="body2"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item.User.department
                      ? item.User.department
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
                    {t("manager.propertyname")}
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
                    {t("manager.propertymodel")}
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
                    {t("manager.description")}
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
                    {t("manager.quantity")}
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
            </DetailModalWrapper>
          </DetailModalContainer>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default ManagerRequestAccepted;
