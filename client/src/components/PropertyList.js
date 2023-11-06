import React,{useEffect} from "react";
import { Box, Grid } from "@mui/material";
import Card from "./PropertyCard";
import { GET_PROPERTIES } from "../State/ReduxSaga/Types/propertyType";
import { useDispatch,useSelector } from "react-redux";


// const propertyList = [
//   {
//     id: 1,
//     name: "Cozy Cottage",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Cabin",
//     location: "Mountain View",
//     price: 150,
//   },
//   {
//     id: 2,
//     name: "Luxury Villa",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Villa",
//     location: "Beachfront",
//     price: 500,
//   },
//   {
//     id: 3,
//     name: "City Apartment",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Apartment",
//     location: "Downtown",
//     price: 200,
//   },
//   {
//     id: 4,
//     name: "Rustic Cabin",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Cabin",
//     location: "Forest Retreat",
//     price: 120,
//   },
//   {
//     id: 5,
//     name: "Elegant Mansion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Mansion",
//     location: "Suburbia",
//     price: 800,
//   },
//   {
//     id: 6,
//     name: "Elegant Mansion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Mansion",
//     location: "Suburbia",
//     price: 800,
//   },
//   {
//     id: 7,
//     name: "Elegant Mansion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Mansion",
//     location: "Suburbia",
//     price: 800,
//   },
//   {
//     id: 8,
//     name: "Elegant Mansion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Mansion",
//     location: "Suburbia",
//     price: 800,
//   },
//   {
//     id: 9,
//     name: "Elegant Mansion",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s",
//     type: "Mansion",
//     location: "Suburbia",
//     price: 800,
//   },
// ];


const PropertyList = () => {
  const dispatch = useDispatch();
  const propertyList = useSelector((state)=>state.property.allProperty)
  console.log(propertyList)
  useEffect(()=>{
    dispatch({type:GET_PROPERTIES})
  },[])
  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5} paddingBottom={5}>
      <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {propertyList?.map((property, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
           
              id={index}
              name={property.item_name}
              item_number = {property.item_number}
              status = {property.status}
              image={property.item_photo}
              total={property.total_quantity_avilable}
              description={property.description}
              
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PropertyList;
