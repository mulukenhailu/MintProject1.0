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
import { removeUploadImage } from "../../State/ReduxToolkit/Slices/uploadImageSlice";
import { useTranslation } from "react-i18next";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";

const CreateButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");

  const { newProperty, errorProperty, loadingProperty } = useSelector(
    (state) => state.property
  );
  const { uploadedImage, errorImage, loadingUploadingImage } = useSelector(
    (state) => state.upload
  );
  const { languange } = useSelector((state) => state.languange);

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
    { value: "available", label: t("createproduct.available") },
    { value: "unavailable", label: t("createproduct.unavailable") },
  ];

  const [property, setProperty] = useState({
    productname: "",
    productmodel: "",
    productsource: "",
    productstandardtype: "",
    productmodelnumber: "",
    productstatus: "",
    productquantitynumber: "",
    productdescription: "",
    productphoto: "",
    productPrice: "",
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
  useEffect(() => {
    dispatch(removeUploadImage());
  }, []);

  useEffect(() => {
    if (newProperty) {
      setTimeout(() => {
        dispatch(removeNewProperty());
        setProperty({
          productname: "",
          productmodel: "",
          productsource: "",
          productstandardtype: "",
          productmodelnumber: "",
          productstatus: "",
          productquantitynumber: "",
          productdescription: "",
          productphoto: "",
          productPrice: "",
          productserialnumbers: [],
        });
        setImage("");
        toast.success("Request done successfully.");
      }, 60000);
    }
    if (errorProperty) {
      setTimeout(() => {
        dispatch(removePropertyError());
      }, 5000);
    }
  }, [errorProperty, newProperty, dispatch]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
    const productSerialNumbers = [];
    const productintialserialnumber = 0;
    const {
      productsource,
      productstandardtype,
      productmodelnumber,
      productquantitynumber,
    } = property;

    if (property.productquantitynumber) {
      for (let i = 1; i <= parseInt(property.productquantitynumber); i++) {
        productSerialNumbers.push((productintialserialnumber + i).toString());
      }
    }

    setProperty({
      ...property,
      productsource: parseInt(productsource),
      productstandardtype: parseInt(productstandardtype),
      productmodelnumber: parseInt(productmodelnumber),
      productquantitynumber: parseInt(productquantitynumber),
      productserialnumbers: productSerialNumbers,
      productphoto: uploadedImage,
    });
    setButtonClicked(true);

    console.log(property);
  };
  if (buttonClicked) {
    dispatch({ type: CREATE_PROPERTY, property });
    setButtonClicked(false);
  }

  return (
    <Box paddingLeft={{ xs: 5, md: 20 }} paddingTop={5} paddingBottom={5}>
      <Paper
        elevation={3}
        sx={{
          padding: { xs: 1, sm: 4, md: 5 },
          width: { xs: "100%", sm: "70%", md: "60%", lg: "70%" },
          margin: "auto",
        }}
      >
        <Typography
          variant="h4"
          textAlign={"center"}
          gutterBottom
          sx={{ color: "#12596B", fontWeight: languange === "en" ? 500 : 700 }}
        >
          {t("createproduct.create")}
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
        {loadingUploadingImage && (
          <Box sx={{ textAlign: "center" }}>
            <ClipLoader
              color={"#36d7b7"}
              loading={loadingUploadingImage}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
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
        {errorImage && (
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
            Error While Uploading Image
          </Box>
        )}
        {newProperty && (
          <Box
            sx={{
              backgroundColor: "#12596B",
              color: "white",
              width: "100%",
              height: "15%",
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              justifyContent: "center",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: languange === "en" ? 16 : 18,
                  padding: "15px 0px",
                }}
              >
                Processing takes some time
              </Typography>
              <BeatLoader
                color={"#fff"}
                loading={newProperty}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          </Box>
        )}
        <TextField
          label={t("createproduct.propertyname")}
          name="productname"
          value={property.productname}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <TextField
          label={t("createproduct.propertymodel")}
          name="productmodel"
          value={property.productmodel}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: "15px" }}>
          <TextField
            label={t("createproduct.productsource")}
            name="productsource"
            value={property.productsource}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 1 }}
            select
          >
            {Sources.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label={t("createproduct.productstandardtype")}
            name="productstandardtype"
            value={property.productstandardtype}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 1 }}
            select
          >
            {ProductMainType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label={t("createproduct.productmodelnumber")}
            name="productmodelnumber"
            value={property.productmodelnumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            alignItems: "center",
            gap: "20px",
          }}
        >
          <TextField
            label={t("createproduct.productstatus")}
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
            label={t("createproduct.quantity")}
            name="productquantitynumber"
            value={property.productquantitynumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            label={t("createproduct.productprice")}
            name="productPrice"
            value={property.productPrice}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
        </Box>
        <TextField
          label={t("createproduct.description")}
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
          size="small"
          onClick={handleCreateProduct}
          fullWidth
          sx={{
            marginTop: "20px",
            background: "#12596B",
            fontSize: languange === "en" ? 18 : 22,
          }}
        >
          {t("createproduct.create")}
        </CreateButton>
      </Paper>
    </Box>
  );
};

export default CreateProduct;
