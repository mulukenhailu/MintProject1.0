import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Box,
  Typography,
  Modal,
  List,
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import OrderComponent from "./Order";
import { useTranslation } from "react-i18next";

const CardContentItem = styled(Box)({
  height: "fit-content",
  display: "flex",
  alignItems: "center",
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
const CreateButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const PropertyCard = ({
  productname,
  item_number,
  productphoto,
  productquantitynumber,
  productdescription,
  productmodel,
}) => {
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const { t } = useTranslation("global");

  const handleClickModal = () => {
    setOpenOrderModal(true);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(PF);

  return (
    <Card
      sx={{
        padding: "20px 2px",
        height: "500px",
        background: "#fff",
        boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.2)",
        border: "1px solid #12596B",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "10px",
      }}
    >
      <CardMedia
        sx={{
          borderRadius: "5px",
          padding: "0px 5px",
          objectFit: "contain",
          height: "70%",
          width: "100%",
          overflow: "hidden",
        }}
        component="img"
        image={`${PF}${productphoto}`}
        alt="property image"
      />
      <CardContent sx={{ width: "100%" }}>
        <CardContentItem>
          <Typography
            variant={{ xs: "body1", md: "h6" }}
            sx={{ color: "#12596B", fontWeight: "900" }}
            flex={1}
          >
            {t("home.name")}
          </Typography>
          <Typography
            variant={{ xs: "body2", md: "body1" }}
            sx={{ color: "#12596B" }}
            flex={1}
          >
            {productname}
          </Typography>
        </CardContentItem>
        <CardContentItem>
          <Typography
            variant={{ xs: "body1", md: "h6" }}
            sx={{ color: "#12596B", fontWeight: "900" }}
            flex={1}
          >
            {t("home.model")}
          </Typography>
          <Typography
            variant={{ xs: "body2", md: "body1" }}
            sx={{ color: "#12596B" }}
            flex={1}
          >
            {productmodel}
          </Typography>
        </CardContentItem>
        <CardContentItem>
          <Typography
            variant={{ xs: "body1", md: "h6" }}
            sx={{ color: "#12596B", fontWeight: "900" }}
            flex={1}
          >
            {t("home.available")}
          </Typography>
          <Typography
            variant={{ xs: "body2", md: "body1" }}
            sx={{ color: "#12596B" }}
            flex={1}
          >
            {productquantitynumber}
          </Typography>
        </CardContentItem>
      </CardContent>
      <CardActions>
        <CreateButton
          size="medium"
          sx={{
            color: "#fff",
            fontSize: { xs: "12px", md: "16px" },
            marginRight: "5px",
            width: "100px",
            textTransform: "capitalize",
          }}
          variant="contained"
          onClick={() => handleClickModal()}
        >
          {t("home.order")}
        </CreateButton>

        <Link to={`/details/${item_number}`}>
          <Button
            size="medium"
            sx={{
              color: "#fff",
              fontSize: { xs: "12px", md: "16px" },
              width: "100px",
              textTransform: "capitalize",
            }}
            variant="contained"
            color="warning"
          >
            {t("home.detail")}
          </Button>
        </Link>
      </CardActions>
      <OrderFormModalContainer
        open={openOrderModal}
        onClose={() => setOpenOrderModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <OrderFormModalWrapper>
          <OrderComponent
            productname={productname}
            item_number={item_number}
            setOpenOrderModal={setOpenOrderModal}
          />
        </OrderFormModalWrapper>
      </OrderFormModalContainer>
    </Card>
  );
};

export default PropertyCard;
