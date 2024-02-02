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
  TextField,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import ScaleLoader from "react-spinners/ScaleLoader";
import SearchIcon from "@mui/icons-material/Search";

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
  const { t } = useTranslation("global");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(null);
  const { role_name } = useSelector((state) => state?.user?.user?.Role);
  const { languange } = useSelector((state) => state.languange);

  const openDetailModal = (index) => {
    setSelectedOrderIndex(index);
  };

  const closeDetailModal = () => {
    setSelectedOrderIndex(null);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (role_name === "employee") {
      const getAllOrderList = () => {
        setLoading(true);
        axios
          .get("/employee/orders", {
            withCredentials: true,
          })
          .then((response) => {
            setLoading(false);
            console.log(response.data);
            setOrders(response.data.Employee_Request);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      };

      getAllOrderList();
    }
    if (role_name === "manager") {
      const getAllOrderList = () => {
        setLoading(true);
        axios
          .get("/manager/pastrequest", {
            withCredentials: true,
          })
          .then((response) => {
            setLoading(false);
            console.log("manager prev list", response.data);
            setOrders(response.data.ManagerAndEmpRequest);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      };

      getAllOrderList();
    }
  }, []);

  const sortedOrders = [...orders]
    .filter((order) =>
      order.Item?.productname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <Box paddingLeft={{ xs: 5, md: 19 }} paddingTop={3} paddingBottom={5}>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <ScaleLoader
            color={"#36d7b7"}
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              width: "60%",
              margin: "auto",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              type="text"
              fullWidth
              placeholder={t("history.searchbyusername")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
            <Table>
              <TableHead sx={{ background: "#bbb", color: "#fff" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "18%",
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("userorder.propertyname")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "20%",
                      textAlign: "center",
                      display: { xs: "none", sm: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("userorder.propertymodel")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "20%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("userorder.quantity")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "20%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("userorder.confirmation")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "20%",
                      textAlign: "center",
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
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
                          width={{ xs: "80%", sm: "70%", md: "50%", lg: "70%" }}
                        >
                          <List>
                            <Typography
                              variant="h4"
                              textAlign={"center"}
                              marginBottom={"10px"}
                              sx={{
                                color: "#12596B",
                                fontWeight: languange === "en" ? 500 : 700,
                              }}
                            >
                              {t("userorder.requestdetail")}
                            </Typography>
                            <ListItemForModal
                              sx={{
                                display: { xs: "block", sm: "flex" },
                                textAlign: { xs: "center", sm: "start" },
                              }}
                            >
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
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
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
                                {t("userorder.rejectedbystorehead")}
                              </Label>
                              <Value>
                                {item?.isRejectedByStoreHead ? "Yes" : "No"}
                              </Value>
                            </ListItemForModal>
                            <ListItemForModal
                              sx={{
                                display: { xs: "block", sm: "flex" },
                                textAlign: { xs: "center", sm: "start" },
                              }}
                            >
                              <Label
                                sx={{
                                  fontSize: "20px",
                                  fontWeight: languange === "en" ? 500 : 700,
                                }}
                              >
                                {t("userorder.ordereddate")}
                              </Label>
                              <Value>{`${format(item?.created_at)}`}</Value>
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
      )}
    </Box>
  );
};

export default UserOrderComponent;
