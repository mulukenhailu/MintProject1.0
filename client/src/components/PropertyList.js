import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "./PropertyCard";

const propertyList = [
  {
    id: 1,
    name: "Cozy Cottage",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Cabin",
    location: "Mountain View",
    price: 150,
  },
  {
    id: 2,
    name: "Luxury Villa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Villa",
    location: "Beachfront",
    price: 500,
  },
  {
    id: 3,
    name: "City Apartment",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Apartment",
    location: "Downtown",
    price: 200,
  },
  {
    id: 4,
    name: "Rustic Cabin",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Cabin",
    location: "Forest Retreat",
    price: 120,
  },
  {
    id: 5,
    name: "Elegant Mansion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Mansion",
    location: "Suburbia",
    price: 800,
  },
  {
    id: 6,
    name: "Elegant Mansion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Mansion",
    location: "Suburbia",
    price: 800,
  },
  {
    id: 7,
    name: "Elegant Mansion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Mansion",
    location: "Suburbia",
    price: 800,
  },
  {
    id: 8,
    name: "Elegant Mansion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Mansion",
    location: "Suburbia",
    price: 800,
  },
  {
    id: 9,
    name: "Elegant Mansion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
    type: "Mansion",
    location: "Suburbia",
    price: 800,
  },
];

const PropertyList = () => {
  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5} paddingBottom={5}>
      <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {propertyList.map((property) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
            <Card
              id={property.id}
              name={property.name}
              image={property.image}
              type={property.type}
              location={property.location}
              price={property.price}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyList;
