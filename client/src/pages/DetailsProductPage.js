import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  CardMedia,
  Button,
  styled,
  Modal,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderComponent from "../components/Order";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CardContents = styled(Box)({
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
});
const CardContentItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
});

const CardContentDescrption = styled(Box)({
  display: "flex",
  alignItems: "start",
  gap: "10px",
});

const OrderFormModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const OrderFormModalWrapper = styled(Box)({
  width: "100%",
});

const DetailsProductPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("global");
  const { allProperty } = useSelector((state) => state.property);
  const { role_name } = useSelector((state) => state.user.user.Role);
  const { languange } = useSelector((state) => state.languange);
  const singleProperty = allProperty.find(
    (item) => item.item_number === parseInt(id)
  );
  console.log(singleProperty);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [openOrderModal, setOpenOrderModal] = useState(false);
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box paddingLeft={{ xs: 6, md: 19 }} paddingTop={5}>
            <Paper elevation={4} sx={{ padding: { xs: "20px", md: "0px" } }}>
              <Grid container>
                <Grid item xs={12} md={6} sx={{ padding: "0px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      sx={{
                        borderRadius: "15px",
                        padding: "20px",
                        height: "90%",
                        width: "100%",
                        overflow: "hidden",
                        objectFit: "fill",
                      }}
                      component="img"
                      image={`${PF}${singleProperty.productphoto}`}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    padding: "40px 0px",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ mb: 2, color: "#12596B" }}
                    fontWeight={languange === "en" ? null : 700}
                    textAlign={"center"}
                  >
                    {t("homedetail.propertydetail")}
                  </Typography>
                  <CardContents>
                    <CardContentItem
                      sx={{ display: { xs: "block", md: "flex" } }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={languange === "en" ? null : 700}
                      >
                        {t("homedetail.name")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {singleProperty.productname}
                      </Typography>
                    </CardContentItem>
                    <CardContentItem
                      sx={{ display: { xs: "block", md: "flex" } }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={languange === "en" ? null : 700}
                      >
                        {t("homedetail.model")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {singleProperty.productmodel}
                      </Typography>
                    </CardContentItem>
                    <CardContentDescrption
                      sx={{ display: { xs: "block", md: "flex" } }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={languange === "en" ? null : 700}
                        flex={3}
                      >
                        {t("homedetail.description")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={10}
                      >
                        {singleProperty.productdescription}
                      </Typography>
                    </CardContentDescrption>
                    <CardContentItem
                      sx={{ display: { xs: "block", md: "flex" } }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={languange === "en" ? null : 700}
                      >
                        {t("homedetail.available")}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {singleProperty.productquantitynumber} items are in
                        store
                      </Typography>
                    </CardContentItem>
                  </CardContents>
                  <Box sx={{ display: "flex", gap: "15px", marginTop: "20px" }}>
                    {role_name === "employee" || role_name === "manager" ? (
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{
                          color: "#12596B",
                          fontSize: "16px",
                          width: "200px",
                          border: "2px solid #12596B",
                          fontWeight: languange === "en" ? null : 600,
                        }}
                        onClick={() => setOpenOrderModal(true)}
                      >
                        {t("homedetail.order")}
                      </Button>
                    ) : null}

                    <Box component={Link} to="/home">
                      <Button
                        variant="outlined"
                        size="small"
                        color="warning"
                        sx={{
                          fontSize: "16px",
                          width: "200px",
                          borderWidth: "2px",
                          fontWeight: languange === "en" ? null : 600,
                        }}
                      >
                        {t("homedetail.back")}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <OrderFormModalContainer
                open={openOrderModal}
                onClose={() => setOpenOrderModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <OrderFormModalWrapper>
                  <OrderComponent
                    productname={singleProperty.productname}
                    item_number={singleProperty.item_number}
                    setOpenOrderModal={setOpenOrderModal}
                  />
                </OrderFormModalWrapper>
              </OrderFormModalContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailsProductPage;
