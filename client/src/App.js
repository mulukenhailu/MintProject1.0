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
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Routes, Route } from "react-router-dom";
import CreateProductPage from "./pages/StoreKeeper/CreateProductPage";
import axios from "axios";

axios.defaults.baseURL = "https://mint-s0j6.onrender.com";
// `${process.env.REACT_APP_BASE_URL}`;
// axios.defaults.withCredentials = true;
console.log(document.cookie);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details/:id" element={<DetailsProductPage />} />
        <Route path="/usersList" element={<UsersListPage />} />
        <Route path="/createUser" element={<CreateUserPage />} />
        <Route path="/storemanager" element={<AllStoreRequestPage />} />
        <Route path="/storekeeper" element={<AllOrderRequestKeeper />} />
        <Route path="/manager" element={<AllManagersRequestPage />} />
        <Route path="/createproduct" element={<CreateProductPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
