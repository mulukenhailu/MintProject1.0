import UserList from "../../components/AdminComponent/UserList";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Box } from "@mui/material";

const UsersListPage = () => {
  return (
    <>
      <Header />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{ flexGrow: 1, padding: "16px 8px 32px 32px" }}
        >
          <UserList />
        </Box>
      </Box>
    </>
  );
};

export default UsersListPage;
