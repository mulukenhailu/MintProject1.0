import React from "react";
import { Box, List, Typography, Modal, styled, ListItem } from "@mui/material";

const UserDetailModal = ({ detailModal, setDetailModal }) => {
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
                first-name-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Last Name
              </Typography>
              <Typography variant="body2" flex={1}>
                last-name-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                User-Name
              </Typography>
              <Typography variant="body2" flex={1}>
                MinT-1
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Email
              </Typography>
              <Typography variant="body2" flex={1}>
                test@gmail.com
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Phone Number
              </Typography>
              <Typography variant="body2" flex={1}>
                0982010318
              </Typography>
            </ListItemForModal>
            <ListItemForModal>
              <Typography variant="body1" flex={2}>
                Department
              </Typography>
              <Typography variant="body2" flex={1}>
                Department-1
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
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default UserDetailModal;
