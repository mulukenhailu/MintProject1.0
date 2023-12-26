import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import UsersListPage from "./pages/AdminPages/UsersListPage";
import HistoryPage from "./pages/StoreKeeper/HistoryPage";
import ErrorPage from "./pages/ErrorPage";
import DetailsProductPage from "./pages/DetailsProductPage";
import CreateUserPage from "./pages/AdminPages/CreateUserPage";
import AllStoreRequestPage from "./pages/StoreManager/AllOrderRequests";
import AllOrderRequestKeeper from "./pages/StoreKeeper/AllOrderRequestKeeper";
import AllManagersRequestPage from "./pages/ManagerPages/AllManagersRequestPage";
import EditUserPage from "./pages/AdminPages/UpdateUserPage";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import { Routes, Route } from "react-router-dom";
import CreateProductPage from "./pages/StoreKeeper/CreateProductPage";
import axios from "axios";
import { useSelector } from "react-redux";
import RequestPage from "./pages/RequestPage";
import RequestPageDetail from "./pages/RequestPageDetail";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const role_name = user.Role ? user.Role.role_name : null;
  console.log(role_name);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/userorder" element={<UserOrdersPage />} />
        <Route path="/notification" element={<RequestPage />} />
        <Route path="/notification/:id" element={<RequestPageDetail />} />
        <Route path="/details/:id" element={<DetailsProductPage />} />
        {role_name === "admin" && (
          <Route path="/usersList" element={<UsersListPage />} />
        )}
        {role_name === "admin" && (
          <Route path="/createUser" element={<CreateUserPage />} />
        )}
        {role_name === "admin" && (
          <Route path="/edituser/:username" element={<EditUserPage />} />
        )}
        {role_name === "storehead" && (
          <Route path="/storemanager" element={<AllStoreRequestPage />} />
        )}
        {role_name === "storekeeper" && (
          <Route path="/storekeeper" element={<AllOrderRequestKeeper />} />
        )}
        {role_name === "manager" && (
          <Route path="/manager" element={<AllManagersRequestPage />} />
        )}
        {role_name === "storekeeper" && (
          <Route path="/createproduct" element={<CreateProductPage />} />
        )}

        {role_name === "storekeeper" && (
          <Route path="/history" element={<HistoryPage />} />
        )}

        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
