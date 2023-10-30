import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Components/PropertyCard";
import Sidebar from "../Components/Sidebar";
const Home = () => {
  return (
    <>
   
    <Box
      sx={{
        paddingLeft:40,
        bgcolor: "#f7f7f7",
        display: "flex",
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      

      {/* <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#f7f7f7",
          padding: "16px", 
          display:"flex",
          flexDirection:"row"
        }}
      > */}
      <Grid container spacing={3}>
        {Array.from(Array(16)).map((_, index) => (
          <Grid item xs={3} key={index}>
            <Card />
          </Grid>
        ))}
      </Grid>
      {/* </Box> */}
    </Box>
    </>
  );
};

export default Home;
