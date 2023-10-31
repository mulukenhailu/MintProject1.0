import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  
} from "@mui/material";
import { Link  } from "react-router-dom";

const PropertyCard = ({ id, name, image, type, location, price }) => {

  return (
    <Card
      sx={{
        padding: 1,
        marginTop: 5,
        width: 230,
        height: 300,
        background: "#fff",
        boxShadow: "5px 10px 10px rgba(0, 0, 0, 0.3)",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #EF9630",
        borderRadius: "15px",
      }}
    >
      <CardMedia
        sx={{ borderRadius: "15px" }}
        component="img"
        height="80%"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "#12596B" }}>
          {name}, {type} in {location}
        </Typography>
        <Typography variant="body2" sx={{ color: "#12596B" }}>
          Price: ${price}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto" }}>
        <Link to= {`/order/${id}`}>
          <Button size="small" sx={{ color: "#EF9630" }}>
            Order
          </Button>
        </Link>
        <Link to={`/details/${id}`} >
          <Button size="small" sx={{ color: "#EF9630" }}>
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
