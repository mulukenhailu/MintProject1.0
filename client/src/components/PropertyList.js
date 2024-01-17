import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import Card from "./PropertyCard";
import { GET_PROPERTIES } from "../State/ReduxSaga/Types/propertyType";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

const PropertyList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("global");
  const { languange } = useSelector((state) => state.languange);
  const [searchTerm, setSearchTerm] = useState("");
  const { allProperty, loadingProperty, errorProperty } = useSelector(
    (state) => state.property
  );

  const sortedProperty = [...allProperty]
    .filter((property) =>
      property?.productname.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  useEffect(() => {
    dispatch({ type: GET_PROPERTIES });
  }, [dispatch]);

  console.log("sortedProperty", sortedProperty);
  return (
    <Box paddingLeft={{ xs: 5, md: 18.5 }} paddingTop={5} paddingBottom={5}>
      <Box>
        <Box
          sx={{
            width: { xs: "80%", md: "60%" },
            marginX: "auto",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextField
            type="text"
            fullWidth
            placeholder={t("home.searchbyproductname")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {loadingProperty ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100vh - 60px)",
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <ClipLoader
            color={"#36d7b7"}
            loading={loadingProperty}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Box>
      ) : (
        <>
          <Grid
            container
            rowSpacing={7}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {sortedProperty?.map((property, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  productname={property?.productname}
                  item_number={property?.item_number}
                  productmodel={property?.productmodel}
                  productphoto={property?.productphoto}
                  productquantitynumber={property?.productquantitynumber}
                  productdescription={property?.productdescription}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default PropertyList;
