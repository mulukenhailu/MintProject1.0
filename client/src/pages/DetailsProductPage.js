import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  CardMedia,
  Button,
  styled,
  Modal,
} from "@mui/material";

import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import OrderComponent from "../components/Order";

const CardContentItem = styled(Box)({
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  gap: "10px",
});
const CardItemDescription = styled(Box)(({ theme }) => ({
  display: "block",
  [theme.breakpoints.up("lg")]: {
    display: "flex",
  },
}));

const OrderFormModalContainer = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const OrderFormModalWrapper = styled(Box)({});
const OrderButton = styled(Button)({
  background: "#12596B",
  "&:hover": {
    background: "#0F4F5F",
  },
});

const DetailsProductPage = ({}) => {
  const { id } = useParams();
  const [openOrderModal, setOpenOrderModal] = useState(false);
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box paddingLeft={{ xs: 10, md: 20 }} paddingTop={5}>
            <Paper elevation={4}>
              <Box
                sx={{
                  bgcolor: "#f7f7f7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "fit-content",
                  width: "100%",
                }}
              >
                <Grid container>
                  <Grid item xs={12} md={6}>
                    <CardMedia
                      sx={{ borderRadius: "15px", padding: "20px" }}
                      component="img"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaklC027konJ_1YBEnWuuNm0Ck7nkBCp7uDmOucHmfuA&s"
                    />
                  </Grid>
                  <Grid item xs={12} md={6} padding={"50px"}>
                    <Typography
                      variant="h5"
                      sx={{ mb: 2, color: "#12596B" }}
                      fontWeight={700}
                    >
                      Elegant Mansion
                    </Typography>
                    <CardContentItem>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={700}
                      >
                        Type:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#12596B" }}>
                        Computer
                      </Typography>
                    </CardContentItem>
                    <CardItemDescription>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={700}
                        textAlign={"left"}
                      >
                        description:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#12596B" }}>
                        Lorem Ipsum is simply dummy text of the printing. Lorem
                        Ipsum is simply dummy text of the printing. Lorem Ipsum
                        is simply dummy text of the printing. Lorem Ipsum is
                        simply dummy text of the printing. Lorem Ipsum is simply
                        dummy text of the printing.
                      </Typography>
                    </CardItemDescription>
                    <CardContentItem>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={700}
                      >
                        Location:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#12596B" }}>
                        Store
                      </Typography>
                    </CardContentItem>
                    <CardContentItem>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={700}
                      >
                        Price:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#12596B" }}>
                        $800
                      </Typography>
                    </CardContentItem>
                    <CardContentItem>
                      <Typography
                        variant="body1"
                        sx={{ color: "#12596B" }}
                        fontWeight={700}
                      >
                        Price:
                      </Typography>
                      <Typography variant="body1" sx={{ color: "#12596B" }}>
                        $800
                      </Typography>
                    </CardContentItem>

                    <OrderButton
                      size="small"
                      variant="contained"
                      sx={{ margin: { xs: 1 }, background: "#12596B" }}
                      onClick={() => setOpenOrderModal(true)}
                    >
                      Order
                    </OrderButton>
                    <Link to="/home">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ margin: { lg: 1 } }}
                        color="warning"
                      >
                        back to main page
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
                <OrderFormModalContainer
                  open={openOrderModal}
                  onClose={() => setOpenOrderModal(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <OrderFormModalWrapper>
                    <OrderComponent />
                  </OrderFormModalWrapper>
                </OrderFormModalContainer>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailsProductPage;
