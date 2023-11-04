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

const ManagerRequestDeclined = () => {
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
            image="https://www.simplilearn.com/ice9/free_resources_article_thumb/How_to_become_a_marketing_manager.jpg"
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
                  Product-Name:
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
                  quantity-1
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
              Product-Details
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
                Manager
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Manager-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Product-name
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
                Product-is-1
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
                Order-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Decline-date
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                date-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Decline-reason
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                reason-1
              </Typography>
            </ListItemForModal>
          </List>
        </DeclineModalWrapper>
      </DeclineModalContainer>
    </Grid>
  );
};

export default ManagerRequestDeclined;