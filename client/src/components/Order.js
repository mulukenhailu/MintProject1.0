import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  styled,
  Box,
  Typography,
  Stack,
  FormGroup,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_ORDER } from "../State/ReduxSaga/Types/orderType";
import {
  removeNewOrder,
  removeOrderError,
} from "../State/ReduxToolkit/Slices/orderSlice";
import ClipLoader from "react-spinners/ClipLoader";

const OrderButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});
const OrderComponent = ({ productname, item_number, setOpenOrderModal }) => {
  const dispatch = useDispatch();
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
    <Box bgcolor={"white"} borderRadius={"5px"} width={"400px"} padding={4}>
      <Box>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Move Order
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
            Error while creating order
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
            New Order Created Successfully
          </Box>
        )}

        <FormGroup>
          <TextField
            label="Quantity"
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
          sx={{ marginTop: "30px", background: "#12596B" }}
        >
          Order Product
        </OrderButton>
      </Box>
    </Box>
  );
};

export default OrderComponent;
