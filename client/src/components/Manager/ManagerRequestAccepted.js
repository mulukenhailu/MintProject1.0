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
const ListItemForModalDescription = styled(ListItem)({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
});
const DetailButton = styled(Button)({
  borderRadius: "2px",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(0.99)",
  },
});
const ManagerRequestAccepted = () => {
  const dispatch = useDispatch();
  const [detailModals, setDetailModals] = useState([]);
  const { t } = useTranslation("global");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(removeAllRequest());
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_MANAGER });
  }, []);

  const { loadingRequest, errorRequest, allRequest } = useSelector(
    (state) => state.request
  );
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

  // if (!allRequest) {
  //   return <Box>No order requested</Box>;
  // }
  // if (allRequest?.length === 0 || allRequest === "Empty") {
  //   return <Box>No order requested</Box>;
  // }

  const sortedAllRequest = allRequest
    ? [...allRequest].sort(
        (a, b) => new Date(b?.updated_at) - new Date(a?.updated_at)
      )
    : [];
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log("manager accepted request", sortedAllRequest);

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
                    image={`${PF}${item.Item.productphoto}`}
                    sx={{ objectFit: "fill", padding: "15px 15px 0px 15px" }}
                  />
                  <CardContent sx={{ padding: "0px" }}>
                    <List>
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
                          {item.User.first_name}
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
                          {item.User.last_name}
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
                          {item.Item.productname}
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
                          {item.quantity_requested}
                        </Typography>
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions sx={{ padding: "0px 15px 15px 15px" }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      type="small"
                      color="warning"
                      sx={{
                        fontSize: "20px",
                        textTransform: "capitalize",
                        borderWidth: "2px",
                      }}
                      onClick={() => handleDetailModalOpen(index)}
                    >
                      {t("manager.detail")}
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
                          {item?.User?.first_name}
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
                          {item?.User?.last_name}
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
                          {item?.User?.email
                            ? item?.User?.email
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
                          {item?.User?.phone_number
                            ? item?.User?.phone_number
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
                          {item?.User?.department
                            ? item?.User?.department
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
                          {item?.Item?.productname}
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
                          {item?.Item?.productmodel}
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
                          {item?.Item?.productdescription}
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
                          {item?.quantity_requested}
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
                          {t("manager.accepteddate")}
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
                          {format(`${item?.updated_at}`)}
                        </Typography>
                      </ListItemForModal>
                    </Box>
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

export default ManagerRequestAccepted;
