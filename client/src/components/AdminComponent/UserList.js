import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  styled,
  Modal,
  TextField,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import UserDetailModal from "./UserDetailModal";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS } from "../../State/ReduxSaga/Types/userTypes";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS });
  }, [dispatch, editModal]);

  const { allUser, loadingUser } = useSelector((state) => state.user);

  const sortedUser = [...allUser]
    .filter((user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const handleEditUser = (user_name) => {
    navigate(`/edituser/${user_name}`);
  };

  return (
    <Box paddingLeft={{ xs: 10, md: 21 }} paddingTop={5} paddingBottom={5}>
      {loadingUser ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "70vh",
          }}
        >
          <ClipLoader
            color={"#36d7b7"}
            loading={loadingUser}
            size={150}
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
              placeholder={t("userlist.searchbyfirstname")}
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
                      display: { xs: "none", sm: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {t("userlist.firstname")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      display: { xs: "none", md: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {t("userlist.lastname")}
                  </TableCell>
                  <TableCell sx={{ color: "#12596B", width: "12%" }}>
                    {t("userlist.username")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {t("userlist.phonenumber")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {t("userlist.position")}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "#12596B",
                      display: { xs: "none", lg: "table-cell" },
                      width: "12%",
                    }}
                  >
                    {t("userlist.department")}
                  </TableCell>
                  <TableCell sx={{ color: "#12596B", width: "3%" }}>
                    {t("userlist.edit")}
                  </TableCell>
                  <TableCell sx={{ color: "#12596B", width: "3%" }}>
                    {t("userlist.detail")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedUser?.map((user) => (
                  <TableRow key={user.user_name}>
                    <TableCell
                      sx={{
                        display: { xs: "none", sm: "table-cell" },
                        width: "12%",
                      }}
                    >
                      {user.first_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", md: "table-cell" },
                        width: "12%",
                      }}
                    >
                      {user.last_name}
                    </TableCell>
                    <TableCell>{user.user_name}</TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", lg: "table-cell" },
                        width: "12%",
                      }}
                    >
                      {user.phone_number}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", lg: "table-cell" },
                        width: "12%",
                      }}
                    >
                      {user.Role.role_name}
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { xs: "none", lg: "table-cell" },
                        width: "12%",
                      }}
                    >
                      {user.department}
                    </TableCell>
                    <TableCell sx={{ width: "3%" }}>
                      <IconButton
                        sx={{ color: "#EF9630" }}
                        onClick={() => {
                          handleEditUser(user.user_name);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "3%" }}>
                      <SettingsAccessibilityIcon
                        sx={{ color: "blue" }}
                        onClick={() => {
                          setDetailModal(true);
                          setCurrentUserId(user.user_name);
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
      <UserDetailModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
        currentUserId={currentUserId}
      />
    </Box>
  );
};

export default UserList;
