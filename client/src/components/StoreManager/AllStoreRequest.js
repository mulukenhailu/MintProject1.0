import React, { useEffect } from "react";
import { Box, Button, ButtonGroup, styled } from "@mui/material";
import AcceptedItemsComponent from "./AcceptedItems";
import PendingItemComponent from "./PendingItem";
import DeclinedItemsComponent from "./DeclinedItems";
import PendingIcon from "@mui/icons-material/Pending";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import {
  removeCurrentRequestPage,
  setCurrentRequestPage,
} from "../../State/ReduxToolkit/Slices/requestSlice";

const ButtonContainer = styled(ButtonGroup)({
  position: "sticky",
  top: "73px",
  height: "35px",
  marginBottom: "30px",
  zIndex: "10",
});
const AllStoreRequest = () => {
  const dispatch = useDispatch();
  const { currentRequestPage } = useSelector((state) => state.request);
  const { t } = useTranslation("global");

  useEffect(() => {
    dispatch(removeCurrentRequestPage());
  }, []);

  const PendingButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    borderRadius: "0px",
    background:
      currentRequestPage === "pending" ? theme.palette.primary.main : "#666666",
    color: "#fff",
  }));
  const AcceptButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    background:
      currentRequestPage === "accepted"
        ? theme.palette.primary.main
        : "#666666",
    color: "#fff",
  }));
  const DeclineButton = styled(Button)(({ theme }) => ({
    fontSize: "16px",
    background:
      currentRequestPage === "declined"
        ? theme.palette.primary.main
        : "#666666",
    color: "#fff",
  }));

  return (
    <Box>
      <Box paddingLeft={{ xs: 5, md: 19 }} paddingTop={5} paddingBottom={5}>
        <ButtonContainer
          disableElevation
          variant="contained"
          ariaLabel="outlined primary button group"
          size="large"
          fullWidth
        >
          <PendingButton
            onClick={() => dispatch(setCurrentRequestPage("pending"))}
            startIcon={<PendingIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {" "}
              {t("status.pending")}
            </Box>
          </PendingButton>
          <AcceptButton
            onClick={() => dispatch(setCurrentRequestPage("accepted"))}
            startIcon={<ThumbUpAltIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {t("status.accepted")}
            </Box>
          </AcceptButton>
          <DeclineButton
            onClick={() => dispatch(setCurrentRequestPage("declined"))}
            startIcon={<ThumbDownAltIcon />}
            sx={{ fontSize: "20px" }}
          >
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {t("status.declined")}
            </Box>
          </DeclineButton>
        </ButtonContainer>
        <Box>
          {currentRequestPage === "pending" ? (
            <PendingItemComponent />
          ) : currentRequestPage === "accepted" ? (
            <AcceptedItemsComponent />
          ) : (
            <DeclinedItemsComponent />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AllStoreRequest;
