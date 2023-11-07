import { Box, Button, Modal, Typography, styled } from "@mui/material";
import React from "react";

const DeleteUserModal = ({ deleteModal, setDeleteModal }) => {
  const UserDeleteModalContainer = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const UserDeleteModalWrapper = styled(Box)({
    background: "#fff",
    height: "fit-content",
    borderRadius: "5px",
    padding: "20px",
  });
  const ButtonContainer = styled(Box)({
    display: "flex",
    gap: "25px",
    justifyContent: "space-evenly",
    marginTop: "20px",
  });
  return (
    <Box>
      <UserDeleteModalContainer
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UserDeleteModalWrapper
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "20%" }}
        >
          <Typography textAlign={"center"}>Are you sure?</Typography>
          <ButtonContainer>
            <Button variant="contained" onClick={() => setDeleteModal(false)}>
              cancel
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </ButtonContainer>
        </UserDeleteModalWrapper>
      </UserDeleteModalContainer>
    </Box>
  );
};

export default DeleteUserModal;
