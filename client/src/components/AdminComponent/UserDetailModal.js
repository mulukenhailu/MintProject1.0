import React, { useEffect } from "react";
import { Box, List, Typography, Modal, styled, ListItem } from "@mui/material";
import { useSelector } from "react-redux";

const UserDetailModal = ({ detailModal, setDetailModal, currentUserId }) => {
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

  const ListItemForModal = styled(ListItem)({
    display: "flex",
    alignItems: "center",
  });

  const { allUser } = useSelector((state) => state.user);
  const currentUser = allUser.filter(
    (user) => user.user_name === currentUserId
  );

  console.log(currentUser[0]);

  return (
    <Box>
      <UserDetailModalContainer
        open={detailModal}
        onClose={() => setDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserDetailModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
        >
          <List>
            <Typography
              variant="h5"
              textAlign={"center"}
              marginBottom={"20px"}
              sx={{ textDecoration: "underline", color: "gray" }}
            >
              User-Details
            </Typography>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                First Name
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.first_name}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Last Name
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.last_name}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                User-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.user_name}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Email
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.email}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Phone Number
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.phone_number}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Department
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.department}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Position
              </Typography>
              <Typography variant="body2" flex={1}>
                {currentUser[0]?.Role.role_name}
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Manager
              </Typography>
              <Typography variant="body2" flex={1}>
                Manager-1
              </Typography>
            </ListItemForModal>
          </List>
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default UserDetailModal;
