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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import UserDetailModal from "./UserDetailModal";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_USERS } from "../../State/ReduxSaga/Types/userTypes";

const UserList = () => {
  const dispatch = useDispatch();
  const [detailModal, setDetailModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    dispatch({ type: GET_ALL_USERS });
  }, [dispatch, editModal]);

  const { allUser, loadingUser } = useSelector((state) => state.user);
  console.log(allUser);

  const UserEditModalContainer = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const UserEditModalWrapper = styled(Box)({
    background: "#fff",
    height: "90vh",
    overflowY: "scroll",
    borderRadius: "5px",
    padding: "20px",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  });

  return (
    <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={3} paddingBottom={5}>
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
                  First Name
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", md: "table-cell" },
                    width: "12%",
                  }}
                >
                  Last Name
                </TableCell>
                <TableCell sx={{ color: "#12596B", width: "12%" }}>
                  UserName
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", lg: "table-cell" },
                    width: "12%",
                  }}
                >
                  Phone Number
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", lg: "table-cell" },
                    width: "12%",
                  }}
                >
                  Position
                </TableCell>
                <TableCell
                  sx={{
                    color: "#12596B",
                    display: { xs: "none", lg: "table-cell" },
                    width: "12%",
                  }}
                >
                  Department
                </TableCell>
                <TableCell sx={{ color: "#12596B", width: "3%" }}>
                  Edit
                </TableCell>
                <TableCell sx={{ color: "#12596B", width: "3%" }}>
                  Delete
                </TableCell>
                <TableCell sx={{ color: "#12596B", width: "3%" }}>
                  Details
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUser.map((user) => (
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
                        setEditModal(true);
                        setCurrentUserId(user.user_name);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell sx={{ width: "3%" }}>
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => setDeleteModal(true)}
                    >
                      <DeleteIcon />
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
      )}

      <UserDetailModal
        detailModal={detailModal}
        setDetailModal={setDetailModal}
        currentUserId={currentUserId}
      />
      <UserEditModalContainer
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserEditModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <EditUserModal currentUserId={currentUserId} />
        </UserEditModalWrapper>
      </UserEditModalContainer>
      <DeleteUserModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
    </Box>
  );
};

export default UserList;
