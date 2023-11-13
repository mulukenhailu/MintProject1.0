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
  id,
  name,
  image,
  description,
  item_number,
  status,
  total,
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
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvuIVMu5AmFIHw7ALCgBmZqWwNUFs0rUGWyQ&usqp=CAU"
        alt={name}
      />
      <CardContent>
        <Typography
          variant="body1"
          sx={{ color: "#12596B" }}
          textAlign={"left"}
        >
          {name}, {status} in {description}
        </Typography>
        <CardContentItem>
          <Typography variant="body1" sx={{ color: "#12596B" }}>
            Price:
          </Typography>
          <Typography variant="body1" sx={{ color: "#12596B" }}>
            {total}
          </Typography>
        </CardContentItem>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <CreateButton
          size="small"
          sx={{ color: "#fff", marginRight: "5px" }}
          variant="contained"
          onClick={() => setOpenOrderModal(true)}
        >
          Order
        </CreateButton>

        <Link to={`/details/${id}`}>
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
          <OrderComponent />
        </OrderFormModalWrapper>
      </OrderFormModalContainer>
    </Card>
  );
};

export default PropertyCard;
