import styled from "@emotion/styled";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import React from "react";

const PendingItem = () => {
  const DeclineButton = styled(Button)({
    marginRight: "10px",
    background: "red",
    "&:hover": {
      background: "#471010",
    },
  });
  const AcceptButton = styled(Button)({
    marginRight: "10px",
    background: "green",
    "&:hover": {
      background: "#10471f",
    },
  });
  const DetailButton = styled(Button)({
    marginRight: "10px",
    background: "orange",
    "&:hover": {
      background: "#473c10",
    },
  });
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
        <Card sx={{ border: "2px solid black", borderRadius: "10px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="/assets/Logo.jpg"
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Product-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Product-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  User-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Manager-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Manager-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Order-date:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  1 month ago
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <ButtonGroup fullWidth>
              <DeclineButton variant="contained">Decline</DeclineButton>
              <AcceptButton variant="contained">Accept</AcceptButton>
              <DetailButton variant="contained">Details</DetailButton>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ border: "2px solid black", borderRadius: "10px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="/assets/Logo.jpg"
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Product-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Product-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  User-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Manager-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Manager-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Order-date:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  1 month ago
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <ButtonGroup fullWidth>
              <DeclineButton variant="contained">Decline</DeclineButton>
              <AcceptButton variant="contained">Accept</AcceptButton>
              <DetailButton variant="contained">Details</DetailButton>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ border: "2px solid black", borderRadius: "10px" }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="/assets/Logo.jpg"
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Product-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Product-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  User-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Manager-name:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  Manager-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5" marginRight={1} fontWeight={900}>
                  Order-date:
                </Typography>
                <Typography variant="h6" fontWeight={500}>
                  1 month ago
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <ButtonGroup fullWidth>
              <DeclineButton variant="contained">Decline</DeclineButton>
              <AcceptButton variant="contained">Accept</AcceptButton>
              <DetailButton variant="contained">Details</DetailButton>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PendingItem;
