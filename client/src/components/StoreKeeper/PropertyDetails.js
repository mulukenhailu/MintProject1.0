import styled from "@emotion/styled";
import { List, ListItem, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});
const ListItemForModalDescription = styled(ListItem)({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
});
const PropertyDetails = ({ itemNo }) => {
  const { t } = useTranslation("global");
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/storekeeper/getitem/${itemNo}`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setLoading(false);
        setProperty(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
        console.log(error);
      });
  }, []);
  return (
    <List>
      <Typography
        variant="h4"
        textAlign={"center"}
        marginBottom={"10px"}
        sx={{ color: "#12596B" }}
      >
        {t("history.propertydetail")}
      </Typography>
      {loading && (
        <Box sx={{ textAlign: "center" }}>
          <ClipLoader
            color={"#36d7b7"}
            loading={loading}
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
            marginY: "10px",
            textAlign: "center",
          }}
        >
          Can't get user's data
        </Box>
      )}
      <ListItemForModal>
        <Typography
          variant="h6"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          {t("history.propertyname")}
        </Typography>
        <Typography
          variant="body1"
          flex={3}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productname}
        </Typography>
      </ListItemForModal>
      <ListItemForModal>
        <Typography
          variant="h6"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          {t("history.propertymodel")}
        </Typography>
        <Typography
          variant="body1"
          flex={3}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productmodel}
        </Typography>
      </ListItemForModal>
      <ListItemForModalDescription>
        <Typography
          variant="h6"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          {t("history.description")}
        </Typography>
        <Typography
          variant="body1"
          flex={3}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productdescription}
        </Typography>
      </ListItemForModalDescription>
      <ListItemForModal>
        <Typography
          variant="h6"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          {t("history.quantity")}
        </Typography>
        <Typography
          variant="body1"
          flex={3}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productquantitynumber}
        </Typography>
      </ListItemForModal>
    </List>
  );
};

export default PropertyDetails;
