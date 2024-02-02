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
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { UPLOAD_IMAGE } from "../../State/ReduxSaga/Types/uploadImageType";
import { removeUploadImage } from "../../State/ReduxToolkit/Slices/uploadImageSlice";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import toast from "react-hot-toast";

const CreateButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const PropertyEditComponent = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const params = useParams();
  const itemnumber = params.itemnumber;
  const { languange } = useSelector((state) => state.languange);
  const [loadingProperty, setLoadingProperty] = useState(false);
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Non Selected");
  const [error, setError] = useState(false);
  const [response, setResponse] = useState(false);

  const { uploadedImage, errorImage, loadingUploadingImage } = useSelector(
    (state) => state.upload
  );

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
    { value: "available", label: t("updateproduct.available") },
    { value: "unavailable", label: t("updateproduct.unavailable") },
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
    Oldproductmodelnumber: "",
    Newproductmodelnumber: "",
    ItemNumber: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };
  useEffect(() => {
    dispatch(removeUploadImage());
  }, [itemnumber]);

  useEffect(() => {
    axios
      .get(`/storekeeper/getitem/${itemnumber}`, { withCredentials: true })
      .then((response) => {
        console.log("single element", response);
        setProperty({
          productname: response.data.productname,
          productmodel: response.data.productmodel,
          productsource: response.data.productsource,
          productstandardtype: response.data.productstandardtype,
          productstatus: response.data.productstatus,
          productquantitynumber: response.data.productquantitynumber,
          productdescription: response.data.productdescription,
          productphoto: response.data.productphoto,
          productPrice: response.data.productPrice,
          productserialnumbers: response.data.productserialnumbers,
          Oldproductmodelnumber: response.data.productmodelnumber,
          Newproductmodelnumber: response.data.productmodelnumber,
          itemNumber: itemnumber,
          oldproductquantitynumber: response.data.productquantitynumber,
          newproductquantitynumber: response.data.productquantitynumber,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleUpdateProperty = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const productSerialNumbers = [];
    const productintialserialnumber = 0;
    const {
      productsource,
      productstandardtype,
      productmodelnumber,
      productquantitynumber,
      Oldproductmodelnumber,
      Newproductmodelnumber,
      newproductquantitynumber,
      oldproductquantitynumber,
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
      Newproductmodelnumber: parseInt(productmodelnumber),
      productquantitynumber: parseInt(productquantitynumber),
      Oldproductmodelnumber: parseInt(Oldproductmodelnumber),
      productserialnumbers: productSerialNumbers,
      ItemNumber: parseInt(itemnumber),
      productphoto: uploadedImage || property.productphoto,
      newproductquantitynumber: parseInt(newproductquantitynumber),
      oldproductquantitynumber: parseInt(oldproductquantitynumber),
    });
    console.log(property);
    const updatedProperty = {
      ItemNumber: parseInt(itemnumber),
      productPrice: parseInt(property.productPrice),
      productdescription: property.productdescription,
      productmodel: property.productmodel,
      Oldproductmodelnumber: parseInt(Oldproductmodelnumber),
      Newproductmodelnumber: parseInt(Newproductmodelnumber),
      newproductquantitynumber: parseInt(newproductquantitynumber),
      oldproductquantitynumber: parseInt(oldproductquantitynumber),
      productname: property.productname,
      productphoto: uploadedImage || property.productphoto,
      productsource: parseInt(property.productsource),
      productstandardtype: parseInt(property.productstandardtype),
      productstatus: property.productstatus,
    };
    console.log("item to be updated", updatedProperty);
    setLoadingProperty(true);
    axios
      .post("/storekeeper/updateItem", updatedProperty, {
        withCredentials: true,
      })
      .then((response) => {
        setResponse(true);
        setLoadingProperty(false);
        setTimeout(() => {
          setResponse(false);
          toast.success("Request done successfully.");
        }, 60000);
        console.log(response);
      })
      .catch((error) => {
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

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
          {t("updateproduct.update")}
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
        {error && (
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
        {response && (
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
                loading={response}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          </Box>
        )}
        <TextField
          label={t("updateproduct.propertyname")}
          name="productname"
          value={property.productname}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <TextField
          label={t("updateproduct.propertymodel")}
          name="productmodel"
          value={property.productmodel}
          onChange={handleFormChange}
          fullWidth
          margin="normal"
          sx={{ backgroundColor: "#f7f7f7" }}
        />
        <Box sx={{ display: { xs: "block", md: "flex" }, gap: "15px" }}>
          <TextField
            label={t("updateproduct.productsource")}
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
            label={t("updateproduct.productstandardtype")}
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
            label={t("updateproduct.productmodelnumber")}
            name="Newproductmodelnumber"
            value={property.Newproductmodelnumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7", flex: 2 }}
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
            label={t("updateproduct.productstatus")}
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
            label={t("updateproduct.quantity")}
            name="newproductquantitynumber"
            value={property.newproductquantitynumber}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
          <TextField
            label={t("updateproduct.productprice")}
            name="productPrice"
            value={property.productPrice}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "#f7f7f7" }}
          />
        </Box>
        <TextField
          label={t("updateproduct.description")}
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
          onClick={handleUpdateProperty}
          fullWidth
          sx={{
            marginTop: "20px",
            background: "#12596B",
            fontSize: languange === "en" ? 18 : 22,
          }}
        >
          {t("updateproduct.update")}
        </CreateButton>
      </Paper>
    </Box>
  );
};

export default PropertyEditComponent;
