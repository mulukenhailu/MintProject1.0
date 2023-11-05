import React, { useState } from "react";
import {
  MenuItem,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateProduct = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Non Selected");

  const Sources = [
    { value: 101, label: "101" },
    { value: 103, label: "103" },
  ];
  const ProductMainType = [
    { value: 4531, label: "4531" },
    { value: 4529, label: "4529" },
    { value: 4521, label: "4521" },
  ];
  const [formData, setFormData] = useState({
    productName: "",
    productModel: "",
    productSource: "",
    productMainType: "",
    productType: "",
    productQuantityNumber: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateUser = () => {
    console.log(formData);
  };

  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5} paddingBottom={5}>
      <Paper
        elevation={3}
        sx={{
          padding: 5,
          width: { xs: "100%", sm: "70%", md: "60%", lg: "70%" },
          margin: "auto",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Create Product
        </Typography>
        <TextField
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <TextField
          label="Product Model"
          name="productModel"
          value={formData.productModel}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <Box sx={{ display: "flex", gap: "15px" }}>
          <TextField
            label="Product Source"
            name="productSource"
            value={formData.productSource}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 1.1 }}
            select
          >
            {Sources.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Product Standard Type"
            name="productMainType"
            value={formData.productMainType}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 1.5 }}
            select
          >
            {ProductMainType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Product Type"
            name="productType"
            value={formData.productType}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 2 }}
          />
        </Box>
        <TextField
          label="Product Quantity Number"
          name="productQuantityNumber"
          value={formData.productQuantityNumber}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <div
          style={{
            padding: "2rem",
            background: "#f0f0f0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            border: "2px dashed #97dce6",
            height: "130px",
            width: "130px",
            cursor: "pointer",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "1.5rem auto",
          }}
          onMouseEnter={(event) => {
            event.target.style.border = "2px solid #97dce6";
          }}
          onMouseLeave={(event) => {
            event.target.style.border = "2px dashed #97dce6";
          }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                setFileName(file?.name);

                if (file) {
                  const reader = new FileReader();

                  reader.onload = (event) => {
                    const imageUrl = event.target.result;
                    setImage(imageUrl);
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
            {image ? (
              <img
                src={image}
                width={150}
                height={150}
                alt="fileName"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CloudUploadIcon
                  style={{
                    color: "#12596B",
                    fontSize: 50,
                    cursor: "pointer",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    marginTop: 5,
                    cursor: "pointer",
                  }}
                >
                  Upload Image
                </span>
              </div>
            )}
          </label>
        </div>

        <Button
          variant="contained"
          size="large"
          onClick={handleCreateUser}
          fullWidth
          sx={{ marginTop: "20px", background: "#12596B" }}
        >
          Create
        </Button>
      </Paper>
    </Box>
  );
};

export default CreateProduct;
