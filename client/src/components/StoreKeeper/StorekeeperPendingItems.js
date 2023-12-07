import styled from "@emotion/styled";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormGroup,
  Grid,
  List,
  ListItem,
  Modal,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";

const AcceptButton = styled(Button)({
  marginRight: "10px",
  background: "#12596B",
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
const SendButton = styled(Button)({
  marginTop: "20px",
  color: "#fff",
  "&:hover": {
    background: "#10471f",
  },
});
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
const AcceptModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const AcceptModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px 20px 30px 20px",
});

const StorekeeperPendingItems = () => {
  const [detailModal, setDetailModal] = useState(false);
  const [acceptModal, setAcceptModal] = useState(false);
  const dispatch = useDispatch();

  const Sources = [
    { value: 101, label: "101" },
    { value: 103, label: "103" },
  ];

  const Items = [
    { value: 4531, label: "4531" },
    { value: 4529, label: "4529" },
  ];

  useEffect(() => {
    dispatch({ type: GET_ALL_PENDING_REQUEST_FOR_STOREKEEPER });
  }, []);

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
            height="250px"
            src="https://media.istockphoto.com/id/1295841884/photo/stock-taking-beautiful-young-woman-worker-of-furniture-store-with-surgical-mask-in-covid-19.jpg?s=612x612&w=0&k=20&c=9gGV9n_1lrW15AAhiaevjqEGHI2kJBWD1zUvoT4PAYE="
          />
          <CardContent>
            <List>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  User-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Department:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Department-1
                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body1" marginRight={1} fontWeight={500}>
                  Property-Name:
                </Typography>
                <Typography variant="body3" color={"gray"}>
                  Property-1
                </Typography>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            <ButtonGroup fullWidth>
              <AcceptButton
                variant="contained"
                onClick={() => setAcceptModal(true)}
              >
                Accept
              </AcceptButton>
              <DetailButton
                variant="contained"
                onClick={() => setDetailModal(true)}
              >
                Details
              </DetailButton>
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
      <DetailModalContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
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
              ORDER-DETAILED
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
                Manager-Name-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Product-Name
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Product-Name-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2} fontWeight={500}>
                Product-Serial
              </Typography>
              <Typography variant="body2" flex={1} color={"gray"}>
                Product-Serial-1
              </Typography>
            </ListItemForModal>
          </List>
        </DetailModalWrapper>
      </DetailModalContainer>
      <AcceptModal
        open={acceptModal}
        onClose={() => setAcceptModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AcceptModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "70%" }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            marginBottom={"20px"}
            sx={{ textDecoration: "underline" }}
          >
            Bin-Card
          </Typography>
          <FormGroup>
            {/* box-1 */}
            <Box sx={{ display: "flex", gap: "20px", marginBottom: "8px" }}>
              <TextField label="Name" name="name" sx={{ flex: 1 }} />
              <TextField
                label="Department"
                name="department"
                sx={{ flex: 1 }}
              />
            </Box>
            {/* box-2 */}
            <Box sx={{ display: "flex", gap: "20px", marginBottom: "8px" }}>
              <TextField
                label="Property Name"
                name="propertyname"
                sx={{ flex: 1 }}
              />
            </Box>
            {/* box-3 */}
            <Box sx={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
              <TextField label="MinT" sx={{ flex: 1 }} />
              <TextField label="" select sx={{ flex: 1 }}>
                {Sources.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="" select sx={{ flex: 1 }}>
                {Items.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="Department" sx={{ flex: 2 }} />
              <TextField label="Item" sx={{ flex: 1 }} />
              <TextField label="Quantity" sx={{ flex: 1 }} />
            </Box>
            {/* box-4 */}
            <Box sx={{ display: "flex", gap: "15px", marginBottom: "8px" }}>
              <TextField label="Unit" sx={{ flex: 1 }} />
              <TextField label="Quantity" sx={{ flex: 1 }} />
            </Box>
            {/* box-5 */}
            <Box sx={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { placeholder: "Output Date" } }}
                />
              </LocalizationProvider>
              <TextField label="Output Number" sx={{ flex: 1 }} />

              <TextField label="Output Single Price" sx={{ flex: 1 }} />
              <TextField label="Output Total Price" sx={{ flex: 1 }} />
            </Box>
            {/* box-6 */}
            <Box sx={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  slotProps={{ textField: { placeholder: "Input Date" } }}
                />
              </LocalizationProvider>
              <TextField label="Input Number" sx={{ flex: 1 }} />
              <TextField label="Input Single Price" sx={{ flex: 1 }} />
              <TextField label="Input Total Price" sx={{ flex: 1 }} />
            </Box>
          </FormGroup>

          <SendButton
            variant="contained"
            sx={{ background: "#12596B" }}
            fullWidth
          >
            Send Property to user
          </SendButton>
        </AcceptModalWrapper>
      </AcceptModal>
    </Grid>
  );
};

export default StorekeeperPendingItems;
