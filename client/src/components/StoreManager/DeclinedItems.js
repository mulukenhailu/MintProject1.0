import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  styled,
  ListItem,
  Typography,
  Modal,
  Box,
} from "@mui/material";
import React, { useState } from "react";

const DeclinedItemsComponent = () => {
  const [declineModal, setDeclineModal] = useState(false);
  const DeclineModalContainer = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const DeclineModalWrapper = styled(Box)({
    background: "#fff",
    height: "fit-content",
    borderRadius: "5px",
    padding: "20px",
  });
  const ListItemForModal = styled(ListItem)({
    display: "flex",
    alignItems: "center",
  });

  const DetailButton = styled(Button)({
    marginRight: "10px",
    background: "orange",
    borderRadius: "2px",
    "&:hover": {
      background: "#473c10",
    },
  });
  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{
            border: "2px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            height="250"
            image="https://blog.yoobic.com/hubfs/supermarket-manager-giving-training-to-a-trainee-picture-id1329317588.jpg"
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Name:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Department:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  Department-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Manager-name:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  Manager-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  StoreM-name:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  StoreM-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Product-name:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  Product-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Quantity:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  Quantity-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Declined-date:
                </Typography>
                <Typography variant="body2" color={"gray"}>
                  1 week ago
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <DetailButton
              variant="contained"
              fullWidth
              onClick={() => setDeclineModal(true)}
            >
              Details
            </DetailButton>
          </CardActions>
        </Card>
      </Grid>
      <DeclineModalContainer
        open={declineModal}
        onClose={() => setDeclineModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeclineModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ textDecoration: "underline" }}
            >
              MODEL-22-DECLINED
            </Typography>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                User-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Department
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Department-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Manager-Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Manager-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Store-Manager-Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Store-Manager-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Product-Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Product-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Product-id
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Product-id-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Quantity
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Quantity-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Model
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Model-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Ordered-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Approved-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-2
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Declined-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-3
              </Typography>
            </ListItemForModal>
          </List>
        </DeclineModalWrapper>
      </DeclineModalContainer>
    </Grid>
  );
};

export default DeclinedItemsComponent;
