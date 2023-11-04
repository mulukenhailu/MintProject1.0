import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Stack,
  FormGroup,
} from "@mui/material";

const OrderComponent = () => {
  const [formData, setFormData] = useState({
    recieverAddress: "",
    userName: "",
    department: "",
    quantity: "",
    productName: "",
    model: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = () => {
    console.log(formData);
  };
  return (
    <Box bgcolor={"white"} borderRadius={"5px"} width={"400px"} padding={4}>
      <Box>
        <Typography variant="h5" gutterBottom textAlign={"center"}>
          Move Order
        </Typography>

        <FormGroup>
          <TextField
            label="Reciever Address"
            name="recieverAddress"
            value={formData.recieverAddress}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />

          <TextField
            label="Name"
            name="userName"
            value={formData.userName}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />

          <TextField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />

          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />
          <TextField
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />

          <TextField
            label="Model"
            name="model"
            value={formData.model}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />
        </FormGroup>

        <Button
          variant="contained"
          onClick={handleOrder}
          fullWidth
          sx={{ marginTop: "30px", background: "#12596B" }}
        >
          Order Product
        </Button>
      </Box>
    </Box>
  );
};

export default OrderComponent;
