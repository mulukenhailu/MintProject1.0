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
import { UserDetailsModal } from "./UserDetailsModal";
import PropertyDetails from "./PropertyDetails";

const ProductDetailContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const ProductDetailWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const UserDetailModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const UserDetailModalWrapper = styled(Box)({
  background: "#fff",
  height: "fit-content",
  borderRadius: "5px",
  padding: "20px",
});

const History = () => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [itemNo, setItemNo] = useState("");

  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const { allRequest } = useSelector((state) => state.request);

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No order requested</Box>;
  }

  return (
    <Box>
      <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={4} paddingBottom={5}>
        <TableContainer component={Paper} sx={{ bgcolor: "#f7f7f7" }}>
          <Table>
            <TableHead sx={{ background: "#bbb", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ color: "#12596B" }}>Requested By</TableCell>
                <TableCell sx={{ color: "#12596B" }}>
                  Approved Manager
                </TableCell>
                <TableCell sx={{ color: "#12596B" }}>
                  Approved Store Head
                </TableCell>
                <TableCell sx={{ color: "#12596B" }}>Recieved From</TableCell>
                <TableCell sx={{ color: "#12596B" }}>Product Name</TableCell>
                <TableCell sx={{ color: "#12596B" }}>
                  Confirmation Number
                </TableCell>
                <TableCell sx={{ color: "#12596B" }}>Product Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allRequest?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      setUserDetail(true);
                      setUserName(item?.employee_username);
                      setUserId(1);
                    }}
                  >
                    {item?.employee_username}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      setUserDetail(true);
                      setUserName(item?.manager_username);
                      setUserId(2);
                    }}
                  >
                    {item?.manager_username}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      setUserDetail(true);
                      setUserName(item?.storehead_username);
                      setUserId(3);
                    }}
                  >
                    {item?.storehead_username}
                  </TableCell>
                  <TableCell
                    sx={{ textAlign: "center", cursor: "pointer" }}
                    onClick={() => {
                      setUserDetail(true);
                      setUserName(item?.storekeeper_username);
                      setUserId(4);
                    }}
                  >
                    {item?.storekeeper_username}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.item_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item?.confirmation_number}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <SettingsAccessibilityIcon
                      sx={{ color: "blue" }}
                      onClick={() => {
                        setItemNo(item.item_no);
                        setPropertyDetail(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ProductDetailContainer
        open={propertyDetail}
        onClose={() => setPropertyDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProductDetailWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <PropertyDetails itemNo={itemNo} />
        </ProductDetailWrapper>
      </ProductDetailContainer>
      <UserDetailModalContainer
        open={userDetail}
        onClose={() => setUserDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserDetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <UserDetailsModal userId={userId} userName={userName} />
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default History;
