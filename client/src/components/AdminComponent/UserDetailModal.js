import React, { useEffect, useState } from "react";
import { Box, List, Typography, Modal, styled, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { GET_ALL_MANAGERS } from "../../State/ReduxSaga/Types/mangerType";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

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
  gap: "100px",
});

const Label = styled(Typography)({
  fontWeight: "bold",
  color: "#12596B",
  marginRight: "10px",
  minWidth: "100px",
});

const Value = styled(Typography)({
  flex: 1,
  color: "#12596B",
});

const UserDetailModal = ({ detailModal, setDetailModal, currentUserId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const [userManager, setUserManager] = useState({});
  const { allUser } = useSelector((state) => state.user);
  const currentUser = allUser.find((user) => user.user_name === currentUserId);
  const { languange } = useSelector((state) => state.languange);

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
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "60%" }}
        >
          <List sx={{ width: "100%", padding: "10px 20px 30px 20px" }}>
            <Typography
              variant="h4"
              textAlign={"center"}
              marginBottom={"10px"}
              sx={{ color: "#12596B" }}
            >
              {t("userlist.userdetail")}
            </Typography>
            <Box
              sx={{
                height: "80%",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  width: "1px",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                  webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              <ListItemForModal
                sx={{
                  display: {
                    xs: "block",
                    sm: "flex",
                  },
                }}
              >
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.firstname")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.first_name || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.lastname")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.last_name || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.username")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.user_name || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.email")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.email || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.phonenumber")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.phone_number || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.department")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.department || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.position")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {currentUser?.Role.role_name || "Not Available"}
                </Value>
              </ListItemForModal>
              <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                <Label
                  flex={1}
                  variant="body1"
                  sx={{
                    color: "#12596B",
                    fontWeight: languange === "en" ? 500 : 900,
                    fontSize: languange === "en" ? 20 : 24,
                  }}
                >
                  {t("userlist.manager")}
                </Label>
                <Value
                  variant="body2"
                  flex={1}
                  sx={{
                    color: "#12596B",
                    fontSize: languange === "en" ? 16 : 18,
                  }}
                  fontWeight={400}
                >
                  {userManager
                    ? userManager.first_name + " " + userManager.last_name
                    : "Manager not assigned"}
                </Value>
              </ListItemForModal>
            </Box>
          </List>
        </UserDetailModalWrapper>
      </UserDetailModalContainer>
    </Box>
  );
};

export default UserDetailModal;
