import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  styled,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_ORDER } from "../State/ReduxSaga/Types/orderType";
import {
  removeNewOrder,
  removeOrderError,
} from "../State/ReduxToolkit/Slices/orderSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

const OrderButton = styled(Button)({
  background: "#12596B",
  fontSize: "18px",
  "&:hover": {
    background: "#0F4F5F",
  },
});
const OrderComponent = ({ productname, item_number, setOpenOrderModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const { newOrder, errorOrder, loadingOrder } = useSelector(
    (state) => state.order
  );
  console.log(productname, item_number);

  const [formData, setFormData] = useState({
    quantity: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      item_name: productname,
      item_no: item_number.toString(),
      quantity_requested: formData.quantity,
    };
    console.log(order);
    dispatch({ type: CREATE_ORDER, order });
  };

  useEffect(() => {
    if (newOrder || errorOrder) {
      setTimeout(() => {
        dispatch(removeNewOrder());
        dispatch(removeOrderError());
        setOpenOrderModal(false);
      }, 5000);
    }
  }, [newOrder, errorOrder]);

  return (
    <Box
      bgcolor={"white"}
      borderRadius={"5px"}
      width={{ xs: "80%", sm: "50%", md: "40%", lg: "30%" }}
      padding={4}
      marginX={"auto"}
    >
      <Box>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          {t("moveorder.ordertitle")}
        </Typography>
        {loadingOrder && (
          <Box sx={{ textAlign: "center" }}>
            <ClipLoader
              color={"#36d7b7"}
              loading={loadingOrder}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
        {errorOrder && (
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {t("moveorder.error")}
          </Box>
        )}
        {newOrder && (
          <Box
            sx={{
              backgroundColor: "#12596B",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {t("moveorder.create")}
          </Box>
        )}

        <FormGroup>
          <TextField
            label={t("moveorder.quantity")}
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />
        </FormGroup>

        <OrderButton
          variant="contained"
          onClick={handleOrder}
          fullWidth
          sx={{ marginTop: "10px", background: "#12596B" }}
        >
          {t("moveorder.order")}
        </OrderButton>
      </Box>
    </Box>
  );
};

export default OrderComponent;
