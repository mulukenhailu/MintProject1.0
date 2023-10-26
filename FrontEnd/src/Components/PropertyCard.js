import React from "react";
import {
  
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
const PropertyCard = () => {
  return (
    <Card
      sx={{
        marginTop: 5,
        marginLeft: 40,
        width: 250,
        height: 250,
        background: "#97dce6",
      }}
    >
      <CardMedia
        component="img"
        height="40%"
        image="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
