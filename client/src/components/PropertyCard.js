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
} from "@mui/material";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import OrderComponent from "./Order";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

const PropertyCard = ({
  productname,
  item_number,
  productphoto,
  productquantitynumber,
  productmodel,
}) => {
  const { role_name } = useSelector((state) => state.user.user.Role);
  const { languange } = useSelector((state) => state.languange);
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
        padding: "15px 2px 20px 2px",
        height: "490px",
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
          padding: "5px 10px 0px 10px",
          objectFit: "fill",
          height: "100%",
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
      <CardActions
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {role_name === "employee" || role_name === "manager" ? (
          <Button
            size="small"
            fullWidth
            sx={{
              fontSize: { xs: "12px", md: "16px" },
              textTransform: "capitalize",
              flex: "1",
              color: "#12596B",
              border: "2px solid #12596B",
              fontWeight: languange === "en" ? null : 600,
            }}
            variant="outlined"
            onClick={() => handleClickModal()}
          >
            {t("home.order")}
          </Button>
        ) : null}
        <Box
          sx={{
            flex:
              role_name === "employee" || role_name === "manager" ? "1.3" : "1",
          }}
        >
          <Box component={Link} to={`/details/${item_number}`}>
            <Button
              size="small"
              fullWidth
              sx={{
                fontSize: { xs: "12px", md: "18px" },
                textTransform: "capitalize",
                fontWeight: languange === "en" ? null : 600,
                borderWidth: "2px",
              }}
              variant="outlined"
              color="warning"
            >
              {t("home.detail")}
            </Button>
          </Box>
        </Box>
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
