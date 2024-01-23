import { Box, List, ListItem, Typography, styled } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import ScaleLoader from "react-spinners/ScaleLoader";

const ListItemForModal = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
});
const ListItemForModalDescription = styled(ListItem)({
  display: "flex",
  alignItems: "flex-start",
  gap: "20px",
});

const PropertyDetailComponent = () => {
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");
  const { itemnumber } = useParams();
  const { languange } = useSelector((state) => state.languange);
  useEffect(() => {
    {
      const getSingleProperty = () => {
        setLoading(true);
        axios
          .get(`/storekeeper/getitem/${itemnumber}`, {
            withCredentials: true,
          })
          .then((response) => {
            setLoading(false);
            console.log(response?.data);
            setProperty(response?.data);
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      };
      getSingleProperty();
    }
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(`${PF}${property?.senderProfilePicture}`);
  return (
    <Box
      paddingLeft={{ xs: 5, md: 19, lg: 17 }}
      paddingTop={4}
      paddingBottom={5}
      sx={{ position: "relative" }}
    >
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <ScaleLoader
            color={"#36d7b7"}
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <Box>
          <Box
            component={Link}
            to="/allproperty"
            sx={{
              position: "absolute",
              top: "35px",
              left: { xs: "15%", md: "20%", lg: "15%" },
              background: "#fff",
              color: "#12596B",
              textDecoration: "none",
              padding: "5px 10px 5px 5px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              border: "1px solid #12596B",
              fontWeight: languange === "en" ? 500 : 700,
            }}
          >
            <KeyboardBackspaceIcon />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {t("notification.back")}
            </Box>
          </Box>
          <Typography
            variant="h4"
            textAlign={"center"}
            color={"#12596B"}
            sx={{ fontWeight: languange === "en" ? 500 : 700 }}
          >
            {t("detailproperty.detail")}
          </Typography>
          {loading && (
            <Box sx={{ textAlign: "center", marginY: "20px" }}>
              <ClipLoader
                color={"#36d7b7"}
                loading={loading}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </Box>
          )}
          <Box
            sx={{
              display: { xs: "block", lg: "flex" },
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <Box flex={1} padding={5}>
              <Box
                sx={{
                  marginBottom: "30px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    color={"#12596B"}
                    sx={{ fontWeight: languange === "en" ? 500 : 700 }}
                  >
                    {t("detailproperty.propertyphoto")}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: { xs: "98%", lg: "300px" },
                    height: { xs: "99%", lg: "150px" },
                    marginTop: "10px",
                  }}
                >
                  <img
                    src={`${PF}${property?.productphoto}`}
                    alt="NaN"
                    crossOrigin="anonymous"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box sx={{ padding: "20px" }} flex={2}>
              <List>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.propertyname")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productname}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.propertymodel")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productmodel}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.productprice")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productPrice}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.productmodelnumber")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productmodelnumber}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.quantityremainig")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productquantitynumber}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.productsource")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productsource}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.productstandardtype")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productstandardtype}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.productstatus")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productstatus}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.description")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {property?.productdescription}
                  </Typography>
                </ListItemForModal>
                <ListItemForModal sx={{ display: { xs: "block", sm: "flex" } }}>
                  <Typography
                    variant="h6"
                    flex={4}
                    sx={{
                      color: "#12596B",
                      fontWeight: languange === "en" ? 500 : 700,
                    }}
                  >
                    {t("detailproperty.createdat")}
                  </Typography>
                  <Typography
                    variant="body1"
                    flex={4}
                    sx={{ color: "#12596B" }}
                    fontWeight={400}
                  >
                    {format(`${property.created_at}`)}
                  </Typography>
                </ListItemForModal>
              </List>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PropertyDetailComponent;
