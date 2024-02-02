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
import ScaleLoader from "react-spinners/ScaleLoader";
import { format } from "timeago.js";

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
  const { allRequest, loadingRequest } = useSelector((state) => state.request);
  const { languange } = useSelector((state) => state.languange);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // if (!allRequest) {
  //   return <Box>No history in database</Box>;
  // }
  // if (allRequest?.length === 0 || allRequest === "Empty") {
  //   return <Box>No history in database</Box>;
  // }

  const sortedAllRequest = [...allRequest].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  console.log("all accepted for the store keeper accepted", sortedAllRequest);

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
                    height="250"
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storekeeper.requestedby")}
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
                          {item?.employee_username}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storekeeper.approvedmanager")}
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
                          {item?.manager_username}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storekeeper.approvedstorehead")}
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
                          {item?.storehead_username}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storekeeper.recievedfrom")}
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
                          {item?.storehead_username}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
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
                          {item?.item_name}
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ padding: "0px 15px 15px 15px" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      type="small"
                      onClick={() => handleDetailModalOpen(index)}
                      color="warning"
                      sx={{
                        fontSize: "20px",
                        textTransform: "capitalize",
                        borderWidth: "2px",
                      }}
                    >
                      {t("storekeeper.detail")}
                    </Button>
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
                    <ListItemForModal>
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 500 : 900,
                          fontSize: languange === "en" ? 20 : 24,
                        }}
                      >
                        {t("storekeeper.requestedby")}
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
                        {item?.employee_username}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 500 : 900,
                          fontSize: languange === "en" ? 20 : 24,
                        }}
                      >
                        {t("storekeeper.approvedmanager")}
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
                        {item?.manager_username}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 500 : 900,
                          fontSize: languange === "en" ? 20 : 24,
                        }}
                      >
                        {t("storekeeper.approvedstorehead")}
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
                        {item?.storehead_username}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 500 : 900,
                          fontSize: languange === "en" ? 20 : 24,
                        }}
                      >
                        {t("storekeeper.recievedfrom")}
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
                        {item?.storekeeper_username}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
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
                        {item?.item_name}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
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
                        {item?.item?.productmodel}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
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
                        {item.quantity_requested}
                      </Typography>
                    </ListItemForModal>
                    <ListItemForModal>
                      <Typography
                        variant="body1"
                        flex={2}
                        sx={{
                          color: "#12596B",
                          fontWeight: languange === "en" ? 500 : 900,
                          fontSize: languange === "en" ? 20 : 24,
                        }}
                      >
                        {t("storekeeper.accepteddate")}
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
                        {format(`${item.created_at}`)}
                      </Typography>
                    </ListItemForModal>
                  </List>
                </DetailModalWrapper>
              </DetailModalContainer>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </>
  );
};

export default StoreKeeperAcceptedItems;
