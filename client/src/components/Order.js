import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  styled,
  Box,
  Typography,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CREATE_ORDER } from "../State/ReduxSaga/Types/orderType";
import {
  removeNewOrder,
  removeOrderError,
} from "../State/ReduxToolkit/Slices/orderSlice";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { setNewPropertyList } from "../State/ReduxToolkit/Slices/propertySlice";
import toast from "react-hot-toast";

const OrderButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});
const OrderComponent = ({ productname, item_number, setOpenOrderModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderNew, setOrderNew] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation("global");
  const { newOrder, errorOrder, loadingOrder } = useSelector(
    (state) => state.order
  );
  const { role_name } = useSelector((state) => state.user.user.Role);
  const { languange } = useSelector((state) => state.languange);

  const [formData, setFormData] = useState({
    quantity: "",
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const order = {
      item_name: productname,
      item_no: item_number.toString(),
      quantity_requested: formData.quantity,
    };
    console.log(order);
    if (role_name !== "manager") {
      dispatch({ type: CREATE_ORDER, order });
    } else {
      setLoading(true);
      axios
        .post("/manager/makeRequest", order, { withCredentials: true })
        .then((response) => {
          dispatch(
            setNewPropertyList({
              item_number: order?.item_no,
              quantity: order?.quantity_requested,
            })
          );
          setLoading(false);
          setOrderNew(true);
          setTimeout(() => {
            toast.success("Request done successfully.");
            navigate(`/details/${item_number}`);
          }, 60000);
        })
        .catch((error) => {
          setLoading(false);
          setError(true);
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (newOrder || orderNew) {
      setTimeout(() => {
        dispatch(removeNewOrder());
        setOpenOrderModal(false);
        setOrderNew(false);
      }, 60000);
    }
  }, [newOrder, orderNew]);

  useEffect(() => {
    if (errorOrder || error) {
      setTimeout(() => {
        dispatch(removeOrderError());
        setOpenOrderModal(false);
        setError(false);
      }, 5000);
    }
  }, [errorOrder, error]);

  useEffect(() => {
    if (newOrder) {
      setTimeout(() => {
        toast.success("Request done successfully.");
        navigate(`/details/${item_number}`);
      }, 60000);
    }
  }, [newOrder]);

  return (
    <Box
      bgcolor={"white"}
      borderRadius={"5px"}
      width={{ xs: "80%", sm: "50%", md: "40%", lg: "33%" }}
      padding={4}
      marginX={"auto"}
    >
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          textAlign={"center"}
          color={"#12596B"}
          sx={{
            fontWeight: languange === "en" ? 500 : 700,
            fontSize: languange === "en" ? 24 : 28,
          }}
        >
          {t("moveorder.ordertitle")}
        </Typography>
        {loadingOrder && (
          <Box sx={{ textAlign: "center" }}>
            <ClipLoader
              color={"#36d7b7"}
              loading={loadingOrder}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
        {loading && (
          <Box sx={{ textAlign: "center" }}>
            <ClipLoader
              color={"#36d7b7"}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Box>
        )}
        {errorOrder && (
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {t("moveorder.error")}
          </Box>
        )}
        {error && (
          <Box
            sx={{
              backgroundColor: "red",
              color: "white",
              fontSize: " 18px",
              padding: " 5px 15px",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {t("moveorder.error")}
          </Box>
        )}
        {newOrder && (
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
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
                loading={newOrder}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          </Box>
        )}
        {orderNew && (
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
                loading={orderNew}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          </Box>
        )}
        <FormGroup>
          <TextField
            label={t("moveorder.quantity")}
            name="quantity"
            value={formData.quantity}
            onChange={handleFormChange}
            fullWidth
            sx={{ margin: "0px", marginBottom: "10px" }}
          />
        </FormGroup>

        <OrderButton
          variant="contained"
          onClick={handleOrder}
          fullWidth
          disabled={newOrder || orderNew || loadingOrder}
          sx={{
            marginTop: "10px",
            background: "#12596B",
            fontSize: languange === "en" ? 16 : 20,
            padding: " 5px 15px",
            color: "white",
            "&:disabled": {
              cursor: "not-allowed",
              pointerEvents: "all !important",
              color: "#fff",
              background: "#12596b",
            },
          }}
        >
          {newOrder || orderNew
            ? t("moveorder.orderloading")
            : t("moveorder.order")}
        </OrderButton>
      </Box>
    </Box>
  );
};

export default OrderComponent;
