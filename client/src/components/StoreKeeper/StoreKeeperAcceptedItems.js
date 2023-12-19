import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
  styled,
  Button,
  Modal,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";

const DetailModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DetailModalWrapper = styled(Box)({
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

const StoreKeeperAcceptedItems = () => {
  const dispatch = useDispatch();
  const [detailModals, setDetailModals] = useState([]);

  const { allRequest } = useSelector((state) => state.request);

  const handleDetailModalOpen = (index) => {
    const updatedDetailModals = [...detailModals];
    updatedDetailModals[index] = true;
    setDetailModals(updatedDetailModals);
  };

  const handleDetailModalClose = (index) => {
    const updatedDetailModals = [...detailModals];
    updatedDetailModals[index] = false;
    setDetailModals(updatedDetailModals);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No history in database</Box>;
  }

  return (
    <Grid container rowSpacing={7} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {allRequest?.map((item, index) => (
        <React.Fragment>
          <Grid item xs={12} sm={6} lg={4}>
            <Card
              sx={{
                border: "2px solid black",
                borderRadius: "10px",
              }}
            >
              <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                src="https://media.istockphoto.com/id/1295841884/photo/stock-taking-beautiful-young-woman-worker-of-furniture-store-with-surgical-mask-in-covid-19.jpg?s=612x612&w=0&k=20&c=9gGV9n_1lrW15AAhiaevjqEGHI2kJBWD1zUvoT4PAYE="
              />
              <CardContent>
                <List>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      fontWeight={500}
                    >
                      Name:
                    </Typography>
                    <Typography variant="body2" color={"gray"}>
                      User-1
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      fontWeight={500}
                    >
                      Department:
                    </Typography>
                    <Typography variant="body2" color={"gray"}>
                      Department-1
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body1"
                      marginRight={1}
                      fontWeight={500}
                    >
                      Property Name:
                    </Typography>
                    <Typography variant="body2" color={"gray"}>
                      Property-Name-1
                    </Typography>
                  </ListItem>
                </List>
              </CardContent>
              <CardActions>
                <DetailButton
                  variant="contained"
                  fullWidth
                  type="small"
                  onClick={() => handleDetailModalOpen(index)}
                >
                  Details
                </DetailButton>
              </CardActions>
            </Card>
          </Grid>
          <DetailModalContainer
            open={detailModals[index] || false}
            onClose={() => handleDetailModalClose(index)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <DetailModalWrapper
              width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
            >
              <List>
                <Typography
                  variant="h5"
                  textAlign={"center"}
                  marginBottom={"20px"}
                  sx={{ textDecoration: "underline" }}
                >
                  Delivered-Details
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
                    Property-Name
                  </Typography>
                  <Typography variant="body2" flex={1} color={"gray"}>
                    Property-Name-1
                  </Typography>
                </ListItemForModal>
                <ListItemForModal>
                  <Typography variant="body1" flex={2} fontWeight={500}>
                    Property-Serial
                  </Typography>
                  <Typography variant="body2" flex={1} color={"gray"}>
                    Property-Serial-1
                  </Typography>
                </ListItemForModal>
              </List>
            </DetailModalWrapper>
          </DetailModalContainer>
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default StoreKeeperAcceptedItems;
