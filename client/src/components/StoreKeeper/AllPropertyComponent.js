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
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const AllPropertyComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const [userDetail, setUserDetail] = useState(false);
  const [propertyDetail, setPropertyDetail] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [itemNo, setItemNo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allPropeperties, setAllProperties] = useState([]);
  const { languange } = useSelector((state) => state.languange);
  const { allRequest } = useSelector((state) => state.request);

  useEffect(() => {
    axios
      .get("/storekeeper/getallitem/all", { withCredentials: true })
      .then((response) => {
        console.log("get all properties", response);
        setAllProperties(response.data.Item);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sortedRequest = [...allPropeperties]
    .filter((property) =>
      property?.productname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (allRequest.length === 0 || allRequest === "Empty") {
    return <Box>No order requested</Box>;
  }
  return (
    <Box>
      <Box
        paddingLeft={{ xs: 5, md: 19, lg: 17 }}
        paddingTop={4}
        paddingBottom={5}
      >
        <Box
          sx={{
            width: { xs: "90%", md: "60%" },
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
                  Model Number
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
                  Name
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
                  Model
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    width: "10%",
                    textAlign: "center",
                    display: { xs: "none", md: "table-cell" },
                    fontSize: languange === "en" ? 17 : 20,
                    fontWeight: languange === "en" ? 500 : 700,
                  }}
                >
                  Price
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
                  Quantity Remain
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    width: "10%",
                    textAlign: "center",
                    display: { xs: "none", md: "table-cell" },
                    fontSize: languange === "en" ? 17 : 20,
                    fontWeight: languange === "en" ? 500 : 700,
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    width: "5%",
                    textAlign: "center",
                    fontSize: languange === "en" ? 17 : 20,
                    fontWeight: languange === "en" ? 500 : 700,
                  }}
                >
                  Edit
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    width: "5%",
                    textAlign: "center",
                    fontSize: languange === "en" ? 17 : 20,
                    fontWeight: languange === "en" ? 500 : 700,
                  }}
                >
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedRequest?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item?.productmodelnumber}</TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.productname}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.productmodel}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.productPrice}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.productquantitynumber}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      display: { xs: "none", md: "table-cell" },
                    }}
                  >
                    {item?.productstatus}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      sx={{ color: "#EF9630", textAlign: "center" }}
                      onClick={() =>
                        navigate(
                          `/allproperty/editproperty/${item?.item_number}`
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      sx={{ textAlign: "center", color: "blue" }}
                      onClick={() =>
                        navigate(`/allproperty/detail/${item?.item_number}`)
                      }
                    >
                      <SettingsAccessibilityIcon />
                    </IconButton>
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

export default AllPropertyComponent;
