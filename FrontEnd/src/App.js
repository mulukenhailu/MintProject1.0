import LandingPage from "./Pages/LandingPage";
// import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import UserList from "./Pages/AdminPages/UserList";
import CreateUsers from "./Pages/AdminPages/CreateUser";
// import RootLayout from "./Layout/RootLayout";
import DetailPage from "./Pages/DetailsPage";
import OrderPage from "./Pages/Order";

//Routes for the store manager
import AllStoreRequestPage from "./Pages/StoreManager/AllOrderRequests";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/loginpage" element={<LoginPage />} /> */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<CreateUsers />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/details/:id" element={<DetailPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/storerequest" element={<AllStoreRequestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
