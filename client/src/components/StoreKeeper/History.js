import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  styled,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";
import { useSelector, useDispatch } from "react-redux";

const HistoryContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const HistoryWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "20px",
  padding: "20px",
});

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
});
const History = () => {
  const dispatch = useDispatch();
  const [detailModal, setDetailModal] = useState(false);
  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const [products, setProducts] = useState([
    {
      ProductSerial: "MinT-Prod-1",
      ProductName: "Product 1",
      Availability: "Yes",
      OwnedBy: "Store",
      StoreKeeper: "Keeper-1",
    },
    {
      ProductSerial: "MinT-Prod-2",
      ProductName: "Product 2",
      Availability: "Yes",
      OwnedBy: "Store",
      StoreKeeper: "keeper-1",
    },
    {
      ProductSerial: "MinT-Prod-3",
      ProductName: "Product 3",
      Availability: "No",
      OwnedBy: "User-3",
      StoreKeeper: "keeper-2",
    },
    {
      ProductSerial: "MinT-Prod-4",
      ProductName: "Product 3",
      Availability: "Yes",
      OwnedBy: "Store",
      StoreKeeper: "keeper-3",
    },
    {
      ProductSerial: "MinT-Prod-5",
      ProductName: "Product 3",
      Availability: "Yes",
      OwnedBy: "Store",
      StoreKeeper: "Keeper-1",
    },
    {
      ProductSerial: "MinT-Prod-6",
      ProductName: "Product 3",
      Availability: "No",
      OwnedBy: "User-6",
      StoreKeeper: "keeper-2",
    },
  ]);

  return (
    <Box>
      <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={4} paddingBottom={5}>
        <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
          <Table>
            <TableHead sx={{ background: "#bbb", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ color: "#12596B" }}>ProductName</TableCell>
                <TableCell sx={{ color: "#12596B" }}>ProductModel</TableCell>
                <TableCell sx={{ color: "#12596B" }}>OwnedBy</TableCell>
                <TableCell sx={{ color: "#12596B" }}>MangerName</TableCell>
                <TableCell sx={{ color: "#12596B" }}>StoreHead</TableCell>
                <TableCell sx={{ color: "#12596B" }}>StoreKeeper</TableCell>
                <TableCell sx={{ color: "#12596B" }}>
                  Confirmation Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.ProductName}</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>mrsX</TableCell>
                  <TableCell>managerX</TableCell>
                  <TableCell>storeHeadX</TableCell>
                  <TableCell>storeKeeperX</TableCell>
                  <TableCell>1234</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <HistoryContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <HistoryWrapper width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}>
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
              <Typography variant="body1" flex={2}>
                Product-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                Product-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Product-Serial-Number
              </Typography>
              <Typography variant="body2" flex={1}>
                Product-serial-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                User-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                User-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Manager-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                Manager-1
              </Typography>
            </ListItemForModal>
          </List>
        </HistoryWrapper>
      </HistoryContainer>
    </Box>
  );
};

export default History;
