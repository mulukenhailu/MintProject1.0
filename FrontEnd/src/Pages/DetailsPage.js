import React from "react";
import { Box, Grid, Typography, Paper, CardMedia, Button, Stack } from "@mui/material";

import { Link, useParams } from "react-router-dom";
import Sidebar from "../Components/Sidebar"
import Header from "../Components/Header"

const DetailsPage = ({}) => {
  const { id } = useParams();
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <Sidebar />
        <Box flex={4}>
          <Box padding={1}>
            <Paper elevation={3} sx={{ pl: 2, height: "100%" }}>
              <Box
                sx={{
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  height: "100vh",
                  overflowX: "hidden",
                }}
              >
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <CardMedia
                      component="img"
                      height="80%"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ p: 7 }}>
                    <Typography variant="h5" sx={{ mb: 2, color: "#12596B" }}>
                      Elegant Mansion
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Type: Computer
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      description:
                      <br /> Lorem Ipsum is simply dummy text of the printing
                      and typesetting industry. Lorem Ipsum has been the
                      industry's standard dummy text ever since the 1500s, when
                      an unknown printer took a galley of type and scrambled it
                      to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Location: Store
                    </Typography>
                    <Typography variant="body2">Price: $800</Typography>
                    <Link to={`/order/${id}/`}>
                      <Button
                        size="small"
                        sx={{ color: "#EF9630", marginTop: 5 }}
                      >
                        Order
                      </Button>
                    </Link>
                    <Link to="/home">
                      <Button
                        size="small"
                        sx={{ color: "#EF9630", marginTop: 5 }}
                      >
                        back to main page
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DetailsPage;
