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
import ScaleLoader from "react-spinners/ScaleLoader";
import { format } from "timeago.js";

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
  const { allRequest, loadingRequest } = useSelector((state) => state.request);
  const { languange } = useSelector((state) => state.languange);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // if (!allRequest) {
  //   return <Box>No order requested</Box>;
  // }
  // if (allRequest?.length === 0 || allRequest === "Empty") {
  //   return <Box>No order requested</Box>;
  // }

  console.log("declined store head request", allRequest);
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
                    border: "2px solid black",
                    borderRadius: "10px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="250"
                    image={`${PF}${item?.Item?.productphoto}`}
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
                          {t("storehead.firstname")}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storehead.lastname")}
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
                          sx={{
                            color: "#12596B",
                            fontWeight: languange === "en" ? 500 : 900,
                            fontSize: languange === "en" ? 18 : 22,
                          }}
                          flex={1}
                        >
                          {t("storehead.propertyname")}
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
                          {item?.Item?.productname}
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
                          {t("storehead.quantity")}
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
                    <Button
                      variant="outlined"
                      fullWidth
                      color="warning"
                      onClick={() => handleDetailModalOpen(index)}
                      sx={{
                        fontSize: "20px",
                        textTransform: "capitalize",
                        borderWidth: "2px",
                      }}
                    >
                      {t("storehead.detail")}
                    </Button>
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
                      variant="h4"
                      textAlign={"center"}
                      marginBottom={"20px"}
                      sx={{
                        color: "#12596B",
                        fontWeight: languange === "en" ? 900 : 900,
                        fontSize: languange === "en" ? 24 : 28,
                      }}
                    >
                      {t("storehead.requestdetail")}
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
                          {t("storehead.firstname")}
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
                          {t("storehead.lastname")}
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
                          {t("storehead.email")}
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
                          {t("storehead.phonenumber")}
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
                            : "Phone number not provided"}
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
                          {t("storehead.department")}
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
                          {t("storehead.propertyname")}
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
                          {t("storehead.propertymodel")}
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
                          {t("storehead.description")}
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
                          {t("storehead.quantity")}
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
                          {t("storehead.declinedate")}
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
                    </Box>
                  </List>
                </DeclineModalWrapper>
              </DeclineModalContainer>
            </React.Fragment>
          ))}
        </Grid>
      )}
    </>
  );
};

export default DeclinedItemsComponent;
