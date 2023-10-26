import React from "react";
import { Box, Grid } from "@mui/material";
import Card from "../Components/PropertyCard";

const Home = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflowX: "hidden" }}>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          bgcolor: "#f7f7f7",
          padding: "16px", 
          display:"flex",
          flexDirection:"row"
        }}
      >
        <Grid
          container
          spacing={0}
          columns={{ xs: 4, sm: 8, md: 12 }} 
        >
          {Array.from(Array(12)).map(
            (
              _,
              index 
            ) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card />
              </Grid>
            )
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
