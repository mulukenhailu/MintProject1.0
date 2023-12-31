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
const OrderFormModalWrapper = styled(Box)({});
const OrderButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const DetailsProductPage = () => {
  const { id } = useParams();
  const { allProperty } = useSelector((state) => state.property);
  const { t } = useTranslation("global");
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
          <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5}>
            <Paper elevation={4}>
              <Grid container>
                <Grid item xs={12} md={6} sx={{ padding: "20px" }}>
                  <CardMedia
                    sx={{
                      borderRadius: "15px",
                      padding: "20px",
                      height: "450px",
                      width: "100%",
                      overflow: "hidden",
                    }}
                    component="img"
                    image={`${PF}${singleProperty.productphoto}`}
                  />
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
                    fontWeight={700}
                    textAlign={"center"}
                  >
                    {t("homedetail.propertydetail")}
                  </Typography>
                  <CardContents>
                    <CardContentItem>
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                      >
                        {t("homedetail.name")}:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {singleProperty.productname}
                      </Typography>
                    </CardContentItem>
                    <CardContentItem>
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                      >
                        {t("homedetail.model")}:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                      >
                        {singleProperty.productmodel}
                      </Typography>
                    </CardContentItem>
                    <CardContentDescrption>
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                        flex={3}
                      >
                        {t("homedetail.description")}:
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={400}
                        flex={12}
                      >
                        {singleProperty.productdescription}
                      </Typography>
                    </CardContentDescrption>
                    <CardContentItem>
                      <Typography
                        variant="h6"
                        sx={{ color: "#12596B" }}
                        fontWeight={900}
                      >
                        {t("homedetail.available")}:
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
                    <OrderButton
                      size="medium"
                      variant="contained"
                      sx={{
                        background: "#12596B",
                        fontSize: "18px",
                        width: "100px",
                      }}
                      onClick={() => setOpenOrderModal(true)}
                    >
                      {t("homedetail.order")}
                    </OrderButton>
                    <Link to="/home">
                      <Button
                        variant="contained"
                        size="medium"
                        color="warning"
                        sx={{ fontSize: "18px", width: "100px" }}
                      >
                        {t("homedetail.back")}
                      </Button>
                    </Link>
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
