import React, { useState, useEffect } from "react";
import {
  MenuItem,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CREATE_PROPERTY } from "../../State/ReduxSaga/Types/propertyType";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import {
  removePropertyError,
  removeNewProperty,
} from "../../State/ReduxToolkit/Slices/propertySlice";
import { UPLOAD_IMAGE } from "../../State/ReduxSaga/Types/uploadImageType";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const CreateButton = styled(Button)({
    background: "#12596B",
    "&:hover": {
      background: "#0F4F5F",
    },
  });
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
  const productStatus = [
    { value: "available", label: "Available" },
    { value: "unavailable", label: "Unavailable" },
  ];

  const [property, setProperty] = useState({
    productname: "",
    productmodel: "",
    productsource: "",
    productstandardtype: "",
    productmodelnumber: "",
    productstatus: "",
    productquantitynumber: "",
    productintialserialnumber: "",
    productdescription: "",
    productphoto: "",
    productserialnumbers: [],
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setFileName(file?.name);
    const formData = new FormData();
    formData.append("image", file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImage(imageUrl);
      };

      reader.readAsDataURL(file);
    }
    const sendImage = formData.get("image");
    dispatch({ type: UPLOAD_IMAGE, sendImage });
  };

  const handleCreateProduct = () => {
    const productSerialNumbers = [];
    console.log(property);
    const {
      productsource,
      productstandardtype,
      productmodelnumber,
      productquantitynumber,
    } = property;

    if (property.productintialserialnumber && property.productquantitynumber) {
      for (let i = 1; i <= parseInt(property.productquantitynumber); i++) {
        productSerialNumbers.push(
          (parseInt(property.productintialserialnumber) + i).toString()
        );
      }
    }

    setProperty({
      ...property,
      productsource: parseInt(productsource),
      productstandardtype: parseInt(productstandardtype),
      productmodelnumber: parseInt(productmodelnumber),
      productquantitynumber: parseInt(productquantitynumber),
      productserialnumbers: productSerialNumbers,
      productphoto: "test",
    });
    setButtonClicked(true);

    console.log(property);
  };
  if (buttonClicked) {
    dispatch({ type: CREATE_PROPERTY, property });
    setButtonClicked(false);
  }

  const { newProperty, errorProperty, loadingProperty } = useSelector(
    (state) => state.property
  );

  useEffect(() => {
    if (errorProperty || newProperty) {
      setTimeout(() => {
        dispatch(removeNewProperty());
        dispatch(removePropertyError());
      }, 5000);
    }
  }, [errorProperty, newProperty, dispatch]);

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
        {loadingProperty && (
          <Box sx={{ textAlign: "center" }}>
            <ClipLoader
              color={"#36d7b7"}
              loading={loadingProperty}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
        <TextField
          label="Product Name"
          name="productname"
          value={property.productname}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <TextField
          label="Product Model"
          name="productmodel"
          value={property.productmodel}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <Box sx={{ display: "flex", gap: "15px" }}>
          <TextField
            label="Product Source"
            name="productsource"
            value={property.productsource}
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
            name="productstandardtype"
            value={property.productstandardtype}
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
            label="Product Model Number"
            name="productmodelnumber"
            value={property.productmodelnumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 2 }}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <TextField
            label="Product Status"
            name="productstatus"
            value={property.productstatus}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
            select
          >
            {productStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Product Quantity Number"
            name="productquantitynumber"
            value={property.productquantitynumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            label="Product Intial Serial Number"
            name="productintialserialnumber"
            value={property.productintialserialnumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
        </Box>
        <TextField
          label="Product Description"
          name="productdescription"
          value={property.productdescription}
          onChange={handleFormChange}
          fullWidth
          multiline
          rows={6}
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
                handleImageUpload(e);
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

        <CreateButton
          variant="contained"
          size="large"
          onClick={handleCreateProduct}
          fullWidth
          sx={{ marginTop: "20px", background: "#12596B" }}
        >
          Create
        </CreateButton>
        {errorProperty && (
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Error While Creating Property
          </Box>
        )}
        {newProperty && (
          <Box
            sx={{
              backgroundColor: "#12596B",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            New Property Created Successfully
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default CreateProduct;
