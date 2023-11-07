import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Card from "./PropertyCard";
import { GET_PROPERTIES } from "../State/ReduxSaga/Types/propertyType";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { allProperty, loadingProperty, errorProperty } = useSelector(
    (state) => state.property
  );
  useEffect(() => {
    dispatch({ type: GET_PROPERTIES });
  }, []);
  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5} paddingBottom={5}>
      {loadingProperty ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <ClipLoader
            color={"#36d7b7"}
            loading={loadingProperty}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allProperty?.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                id={index}
                name={property.item_name}
                item_number={property.item_number}
                status={property.status}
                image={property.item_photo}
                total={property.total_quantity_avilable}
                description={property.description}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PropertyList;
