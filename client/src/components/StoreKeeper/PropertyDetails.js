import styled from "@emotion/styled";
import { List, ListItem, Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});
const PropertyDetails = ({ itemNo }) => {
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
        variant="h5"
        textAlign={"center"}
        marginBottom={"20px"}
        sx={{ textDecoration: "underline" }}
      >
        Product-Details
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
          variant="body1"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          Product-Name
        </Typography>
        <Typography
          variant="body2"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productname}
        </Typography>
      </ListItemForModal>
      <ListItemForModal>
        <Typography
          variant="body1"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          Product-Model:
        </Typography>
        <Typography
          variant="body2"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productmodel}
        </Typography>
      </ListItemForModal>
      <ListItemForModal>
        <Typography
          variant="body1"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          Product Description
        </Typography>
        <Typography
          variant="body2"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={400}
        >
          {property.productdescription}
        </Typography>
      </ListItemForModal>
      <ListItemForModal>
        <Typography
          variant="body1"
          flex={2}
          sx={{ color: "#12596B" }}
          fontWeight={900}
        >
          Quantity
        </Typography>
        <Typography
          variant="body2"
          flex={2}
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
