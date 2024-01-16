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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";
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
const DetailButton = styled(Button)({
  borderRadius: "2px",
  marginBottom: "10px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(0.95)",
  },
});

const StoreKeeperAcceptedItems = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const [detailModals, setDetailModals] = useState([]);

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

  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No history in database</Box>;
  }

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {allRequest?.map((item, index) => (
        <React.Fragment key={index}>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                border: "2px solid #12596B",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                src={`${PF}${item?.item?.productphoto}`}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <List sx={{ width: "100%" }}>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      {t("storekeeper.requestedby")}
                    </Typography>
                    <Typography
                      variant={{ xs: "body2", md: "body2" }}
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.employee_username}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      {t("storekeeper.approvedmanager")}
                    </Typography>
                    <Typography
                      variant={{ xs: "body2", md: "body2" }}
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.manager_username}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      {t("storekeeper.approvedstorehead")}
                    </Typography>
                    <Typography
                      variant={{ xs: "body2", md: "body2" }}
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.storehead_username}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      {t("storekeeper.recievedfrom")}
                    </Typography>
                    <Typography
                      variant={{ xs: "body2", md: "body2" }}
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.storehead_username}
                    </Typography>
                  </ListItem>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant={{ xs: "body1", md: "h6" }}
                      marginRight={1}
                      sx={{ color: "#12596B" }}
                      fontWeight={900}
                    >
                      {t("storekeeper.propertyname")}
                    </Typography>
                    <Typography
                      variant={{ xs: "body2", md: "body2" }}
                      sx={{ color: "#12596B" }}
                      fontWeight={400}
                    >
                      {item?.item_name}
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
                  color="warning"
                >
                  {t("storekeeper.detail")}
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
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
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
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.requestedby")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.employee_username}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.approvedmanager")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.manager_username}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.approvedstorehead")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.storehead_username}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.recievedfrom")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.storekeeper_username}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.propertyname")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {item?.item_name}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.propertymodel")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    Model dummy
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography
                    variant={{ xs: "body1", md: "h6" }}
                    flex={2}
                    sx={{ color: "#12596B" }}
                    fontWeight={900}
                  >
                    {t("storekeeper.quantity")}
                  </Typography>
                  <Typography
                    variant={{ xs: "body2", md: "body2" }}
                    flex={2}
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

export default StoreKeeperAcceptedItems;
