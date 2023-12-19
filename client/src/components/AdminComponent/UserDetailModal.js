import React, { useEffect, useState } from "react";
import { Box, List, Typography, Modal, styled, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { GET_ALL_MANAGERS } from "../../State/ReduxSaga/Types/mangerType";
import { useDispatch } from "react-redux";

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
});

const Value = styled(Typography)({
  flex: 1,
  color: "#333",
});

const UserDetailModal = ({ detailModal, setDetailModal, currentUserId }) => {
  const dispatch = useDispatch();
  const [userManager, setUserManager] = useState({});
  const { allUser } = useSelector((state) => state.user);
  const currentUser = allUser.find((user) => user.user_name === currentUserId);

  useEffect(() => {
    dispatch({ type: GET_ALL_MANAGERS });
  }, []);

  const { allManagers } = useSelector((state) => state.manager);

  useEffect(() => {
    if (currentUser?.manager_username) {
      setUserManager(
        allManagers.find(
          (item) => item.user_name === currentUser.manager_username
        )
      );
    }
  }, [allManagers, currentUser]);

  console.log("user mnager", userManager);

  return (
    <Box>
      <UserDetailModalContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserDetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "30%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"10px"}
              sx={{ textDecoration: "underline", color: "#12596B" }}
            >
              User-Details
            </Typography>
            <ListItemForModal>
              <Label>First Name</Label>
              <Value>{currentUser?.first_name || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Last Name</Label>
              <Value>{currentUser?.last_name || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>User-Name</Label>
              <Value>{currentUser?.user_name || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Email</Label>
              <Value>{currentUser?.email || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Phone Number</Label>
              <Value>{currentUser?.phone_number || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Department</Label>
              <Value>{currentUser?.department || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Position</Label>
              <Value>{currentUser?.Role.role_name || "Not Available"}</Value>
            </ListItemForModal>
            <ListItemForModal>
              <Label>Manager</Label>
              <Value>
                {userManager
                  ? userManager.first_name + userManager.last_name
                  : "Manager not assigned"}
              </Value>
            </ListItemForModal>
          </List>
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default UserDetailModal;
