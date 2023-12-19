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

const PropertyCard = ({
  productname,
  item_number,
  productphoto,
  productquantitynumber,
  productdescription,
  productmodel,
}) => {
  const [openOrderModal, setOpenOrderModal] = useState(false);
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
  const OrderFormModalWrapper = styled(Box)({});
  const CreateButton = styled(Button)({
    background: "#12596B",
    "&:hover": {
      background: "#0F4F5F",
    },
  });
  const handleClickModal = () => {
    setOpenOrderModal(true);
  };
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(PF);

  return (
    <Card
      sx={{
        padding: "20px 10px",
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
          objectFit: "fill",
          height: "70%",
          width: "100%",
          overflow: "hidden",
        }}
        component="img"
        image={`${PF}${productphoto}`}
        alt="property image"
      />
      <CardContent>
        <CardContentItem>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Name:
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {productname}
          </Typography>
        </CardContentItem>
        <CardContentItem>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Model:
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {productmodel}
          </Typography>
        </CardContentItem>
        <CardContentItem>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={900}
          >
            Available:
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#12596B" }}
            fontWeight={400}
          >
            {productquantitynumber}
          </Typography>
        </CardContentItem>
      </CardContent>
      <CardActions>
        <CreateButton
          size="small"
          sx={{ color: "#fff", marginRight: "5px" }}
          variant="contained"
          onClick={() => handleClickModal()}
        >
          Order
        </CreateButton>

        <Link to={`/details/${item_number}`}>
          <Button
            size="small"
            sx={{ color: "#fff" }}
            variant="contained"
            color="warning"
          >
            Details
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
