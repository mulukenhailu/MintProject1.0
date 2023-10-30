import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

const PropertyCard = () => {
  return (
    <Card
      sx={{
        marginTop: 5,
        width: 200,
        height: 200,
        background: "#97dce6",
        boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        height="60%"
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s"
        alt="Property Image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Property description goes here.
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Button size="small" color="primary">
          Order
        </Button>
        <Button size="small" color="primary">
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
