import {
  Box,
  Paper,
  TextField,
  Typography,
  styled,
  Button,
  Modal,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";

const SetPasswordButton = styled(Button)({
  transition: "transform 0.3s ease-in-out",
  background: "#12596b",
  "&:hover": {
    transform: "scale(0.98)",
    background: "#12596b",
  },
});

const ResetPassword = () => {
  const { t } = useTranslation("global");
  const [password, setPassword] = useState("");
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [response, setResponse] = useState("");
  const { languange } = useSelector((state) => state.languange);

  useEffect(() => {
    if (error || errorModal) {
      setTimeout(() => {
        setError("");
        setErrorModal("");
      }, 5000);
    }
  }, [error, errorModal]);

  const handleSetOldPassword = () => {
    setLoading(true);
    if (!password) {
      setError("Password required");
      setLoading(false);
      return;
    }
    axios
      .post(
        "/oldpassword/confirm",
        { oldpassword: password },
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        setPassword("");
        if (response.data === true) {
          setResetPasswordModal(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Password incorrect");
        console.log(error);
      });
  };

  const handlePasswordReset = () => {
    if (!newPassword) {
      setErrorModal("New password is required");
      return;
    }
    if (!confirmPassword) {
      setErrorModal("Please set password again");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorModal("Password does not match");
      return;
    }
    setLoadingModal(true);
    axios
      .post(
        "/resetpassword",
        { newPassword: newPassword },
        { withCredentials: true }
      )
      .then((response) => {
        setResponse(true);
        setLoadingModal(false);
        setNewPassword("");
        setConfirmPassword("");
        console.log(response.data);
        setTimeout(() => {
          setResponse("");
          setResetPasswordModal(false);
        }, 60000);
      })
      .catch((error) => {
        setLoadingModal(false);
        setTimeout(() => {
          setResetPasswordModal(false);
        }, 5000);
        setErrorModal("Retry again");
      });
  };

  return (
    <Box paddingLeft={{ xs: 5, md: 18.5 }} paddingTop={5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", lg: "50%" },
            padding: { xs: "25px 15px", lg: "30px 50px" },
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            color="#12596b"
            marginBottom={1}
          >
            {t("resetpassword.resetpassword")}
          </Typography>
          {error && (
            <Typography
              variant="body1"
              color={"white"}
              textAlign={"center"}
              sx={{
                background: "red",
                padding: "5px 10px",
                margin: "10px 0px 10px 0px",
              }}
            >
              {error}
            </Typography>
          )}
          {loading && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          )}
          <TextField
            required
            id="password"
            label={t("resetpassword.enter")}
            type="text"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SetPasswordButton
            variant="contained"
            disabled={loading}
            sx={{
              marginTop: "20px",
              color: "white",
              "&:disabled": {
                cursor: "not-allowed",
                pointerEvents: "all !important",
                color: "#fff",
                background: "#12596b",
              },
            }}
            onClick={handleSetOldPassword}
          >
            {t("resetpassword.reset")}
          </SetPasswordButton>
        </Paper>
      </Box>
      <Modal
        open={resetPasswordModal}
        onClose={() => setResetPasswordModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%" }}
          sx={{
            background: "#fff",
            height: "fit-content",
            borderRadius: "5px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
          }}
        >
          <Typography variant="h5" textAlign={"center"} color={"#12596b"}>
            {t("resetpassword.resetpassword")}
          </Typography>
          {loadingModal && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <ClipLoader
                color={"#36d7b7"}
                loading={loadingModal}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          )}
          {errorModal && (
            <Typography
              variant="body1"
              color={"white"}
              textAlign={"center"}
              sx={{
                background: "red",
                padding: "5px 10px",
                margin: "10px 0px 10px 0px",
              }}
            >
              {errorModal}
            </Typography>
          )}
          {response && (
            <Box
              sx={{
                backgroundColor: "#12596B",
                color: "white",
                width: "100%",
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Typography
                  sx={{
                    fontSize: languange === "en" ? 16 : 18,
                    padding: "15px 0px",
                  }}
                >
                  Processing takes some time
                </Typography>
                <BeatLoader
                  color={"#fff"}
                  loading={response}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </Box>
            </Box>
          )}
          <TextField
            required
            id="newPassword"
            label={t("resetpassword.newpassword")}
            type="text"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            required
            id="confirmPassword"
            label={t("resetpassword.confirmpassword")}
            type="text"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <SetPasswordButton
            variant="contained"
            disabled={loadingModal || response}
            sx={{
              marginTop: "20px",
              color: "white",
              "&:disabled": {
                cursor: "not-allowed",
                pointerEvents: "all !important",
                color: "#fff",
                background: "#12596b",
              },
            }}
            onClick={handlePasswordReset}
          >
            {t("resetpassword.submit")}
          </SetPasswordButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default ResetPassword;
