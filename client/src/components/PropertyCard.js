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
        height: "fit-content",
        background: "#fff",
        boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #333333",
        borderRadius: "10px",
      }}
    >
      <CardMedia
        sx={{ borderRadius: "15px", padding: "20px" }}
        component="img"
        height="80%"
        image={
          productphoto
            ? `${PF}${productphoto}`
            : "data:image/png;base64,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"
        }
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
            corei7
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
      <CardActions sx={{ marginTop: "auto" }}>
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
