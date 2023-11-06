import React, { useState } from "react";
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

const History = () => {
  const [detailModal, setDetailModal] = useState(false);
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
  // Function to handle delete Product
  const handleDeleteProduct = (ProductSerial) => {
    setProducts(
      products.filter((product) => product.ProductSerial !== ProductSerial)
    );
  };

  return (
    <Box>
      <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={3} paddingBottom={5}>
        <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
          <Table>
            <TableHead sx={{ background: "#bbb", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ color: "#12596B" }}>ProductSerial</TableCell>
                <TableCell sx={{ color: "#12596B" }}>ProductName</TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  Availability
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", md: "table-cell" },
                  }}
                >
                  OwnedBy
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", lg: "table-cell" },
                  }}
                >
                  StoreKeeper
                </TableCell>
                <TableCell sx={{ color: "#12596B" }}>Edit</TableCell>
                <TableCell sx={{ color: "#12596B" }}>Delete</TableCell>
                <TableCell sx={{ color: "#12596B" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.ProductSerial}>
                  <TableCell>{product.ProductSerial}</TableCell>
                  <TableCell>{product.ProductName}</TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {product.Availability}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    {product.OwnedBy}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                    {product.StoreKeeper}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="Edit" sx={{ color: "#EF9630" }}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ color: "red" }}
                      aria-label="Delete"
                      onClick={() => handleDeleteProduct(product.ProductSerial)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <SettingsAccessibilityIcon
                      sx={{ color: "blue" }}
                      onClick={() => setDetailModal(true)}
                    />
                  </TableCell>
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
