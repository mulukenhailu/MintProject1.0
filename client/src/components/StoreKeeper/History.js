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
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import { GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER } from "../../State/ReduxSaga/Types/storeKeeperRequestType";
import { useSelector, useDispatch } from "react-redux";
import { UserDetailsModal } from "./UserDetailsModal";
import PropertyDetails from "./PropertyDetails";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import ScaleLoader from "react-spinners/ScaleLoader";

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
  const { t } = useTranslation("global");
  const [userDetail, setUserDetail] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [itemNo, setItemNo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { languange } = useSelector((state) => state.languange);
  const { allRequest, loadingRequest } = useSelector((state) => state.request);

  useEffect(() => {
    dispatch({ type: GET_ALL_ACCEPTED_REQUEST_FOR_STOREKEPPER });
  }, []);

  const sortedRequest = [...allRequest]
    .filter((user) =>
      user.employee_username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  // if (allRequest.length === 0 || allRequest === "Empty") {
  //   return <Box padding={20}>No order requested</Box>;
  // }

  return (
    <Box
      paddingLeft={{ xs: 5, md: 19, lg: 17 }}
      paddingTop={4}
      paddingBottom={5}
    >
      {loadingRequest ? (
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
            loading={loadingRequest}
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
                      width: "15%",
                      textAlign: "left",
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.requestedby")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "18%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.approvedmanager")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "18%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.approvedstorehead")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "18%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.recievedfrom")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "15%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.confirmation")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      width: "24%",
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                      fontSize: languange === "en" ? 17 : 20,
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("history.propertydetail")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRequest?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ cursor: "pointer" }}
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
      )}

      <ProductDetailContainer
        open={propertyDetail}
        onClose={() => setPropertyDetail(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ProductDetailWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "50%" }}
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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "50%" }}
        >
          <UserDetailsModal userId={userId} userName={userName} />
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default History;
