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
import { GET_ALL_MANAGERS } from "../State/ReduxSaga/Types/mangerType";
import { CREATE_ORDER } from "../State/ReduxSaga/Types/orderType";

const OrderButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});
const OrderComponent = ({ productname, item_number, setOpenOrderModal }) => {
  const dispatch = useDispatch();
  console.log(productname, item_number);

  useEffect(() => {
    dispatch({ type: GET_ALL_MANAGERS });
  }, []);
  const { allManagers } = useSelector((state) => state.manager);

  const managersList = [];

  allManagers?.forEach((item) => {
    managersList.push({
      value: `${item.user_name}`,
      label: `${item.first_name} ${item.last_name}`,
    });
  });

  console.log(managersList);
  const [formData, setFormData] = useState({
    quantity: "",
    managername: "",
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
      manager_username: formData.managername,
    };
    console.log(order);
    dispatch({ type: CREATE_ORDER, order });
    setOpenOrderModal(false);
  };
  return (
    <Box bgcolor={"white"} borderRadius={"5px"} width={"400px"} padding={4}>
      <Box>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Move Order
        </Typography>

        <FormGroup>
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />
          <TextField
            label="Manager Name"
            name="managername"
            value={formData.managername}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
            select
          >
            {managersList?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
