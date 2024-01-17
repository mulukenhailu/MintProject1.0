import {
  Box,
  IconButton,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Modal,
  ListItem,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { useTranslation } from "react-i18next";

const UserDetailModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserDetailModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px 5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 1)",
});

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "25px",
});

const Label = styled(Typography)({
  fontWeight: "bold",
  color: "#12596B",
  marginRight: "10px",
  minWidth: "100px",
  flex: "1",
});

const Value = styled(Typography)({
  flex: "1",
  color: "#12596B",
  fontWeight: "400",
});

const UserOrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const { t } = useTranslation("global");

  const openDetailModal = (index) => {
    setSelectedOrderIndex(index);
  };

  const closeDetailModal = () => {
    setSelectedOrderIndex(null);
  };

  useEffect(() => {
    const getAllOrderList = () => {
      axios
        .get("/employee/orders", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data.Employee_Request);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getAllOrderList();
  }, []);

  console.log(orders);
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  if (!orders || orders.length === 0) {
    return (
      <Box
        sx={{ paddingTop: "20px", paddingLeft: { xs: "50px", md: "160px" } }}
      >
        No order yet
      </Box>
    );
  }
  return (
    <Box paddingLeft={{ xs: 5, md: 19 }} paddingTop={3} paddingBottom={5}>
      <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
        <Table>
          <TableHead sx={{ background: "#bbb", color: "#fff" }}>
            <TableRow>
              <TableCell
                sx={{
                  color: "#12596B",
                  width: "20%",
                  fontSize: "20px",
                }}
              >
                {t("userorder.propertyname")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  width: "20%",
                  fontSize: "20px",
                  textAlign: "center",
                  display: { xs: "none", sm: "table-cell" },
                }}
              >
                {t("userorder.propertymodel")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  width: "20%",
                  fontSize: "20px",
                  textAlign: "center",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                {t("userorder.quantity")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  width: "20%",
                  fontSize: "20px",
                  textAlign: "center",
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                {t("userorder.confirmation")}
              </TableCell>
              <TableCell
                sx={{
                  color: "#12596B",
                  width: "20%",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                {t("userorder.detail")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders?.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "20%",
                    }}
                  >
                    {item?.Item?.productname}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      textAlign: "center",
                      display: { xs: "none", sm: "table-cell" },
                    }}
                  >
                    {item?.Item?.productmodel}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      display: { xs: "none", md: "table-cell" },
                      textAlign: "center",
                    }}
                  >
                    {item?.quantity_requested}
                  </TableCell>
                  <TableCell
                    sx={{
                      width: "20%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.confirmation_number}
                  </TableCell>
                  <TableCell
                    sx={{ width: "3%", textAlign: "center" }}
                    onClick={() => openDetailModal(index)}
                  >
                    <SettingsAccessibilityIcon
                      sx={{ color: "blue" }}
                      onClick={() => {}}
                    />
                  </TableCell>

                  <UserDetailModalContainer
                    open={selectedOrderIndex === index}
                    onClose={closeDetailModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <UserDetailModalWrapper
                      width={{ xs: "80%", sm: "70%", md: "50%", lg: "55%" }}
                    >
                      <List>
                        <Typography
                          variant="h4"
                          textAlign={"center"}
                          marginBottom={"10px"}
                          sx={{ color: "#12596B" }}
                        >
                          {t("userorder.requestdetail")}
                        </Typography>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.propertyname")}
                          </Label>
                          <Value>{item?.Item?.productname}</Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.propertymodel")}
                          </Label>
                          <Value>{item?.Item?.productmodel}</Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.quantity")}
                          </Label>
                          <Value>{item?.quantity_requested}</Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.confirmation")}
                          </Label>
                          <Value>{item?.confirmation_number}</Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.approvedbymanager")}
                          </Label>
                          <Value>
                            {item?.isApprovedByManager ? "Yes" : "No"}
                          </Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.rejectedbymanager")}
                          </Label>
                          <Value>
                            {item?.isRejectedByManager ? "Yes" : "No"}
                          </Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.approvedbystorehead")}
                          </Label>
                          <Value>
                            {item?.isApprovedByStoreHead ? "Yes" : "No"}
                          </Value>
                        </ListItemForModal>
                        <ListItemForModal
                          sx={{
                            display: { xs: "block", sm: "flex" },
                            textAlign: { xs: "center", sm: "start" },
                          }}
                        >
                          <Label sx={{ fontSize: "20px" }}>
                            {t("userorder.rejectedbystorehead")}
                          </Label>
                          <Value>
                            {item?.isRejectedByStoreHead ? "Yes" : "No"}
                          </Value>
                        </ListItemForModal>
                      </List>
                    </UserDetailModalWrapper>
                  </UserDetailModalContainer>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserOrderComponent;
