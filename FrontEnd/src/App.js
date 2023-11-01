

import LandingPage from "./Pages/LandingPage";
// import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import UserList from "./Pages/AdminPages/UserList";
import CreateUsers from "./Pages/AdminPages/CreateUser";
// import RootLayout from "./Layout/RootLayout";
import DetailPage from "./Pages/DetailsPage";
import OrderPage from "./Pages/Order";
import Request from "./Pages/ManagerPages/Request";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rejection from "./Pages/Rejection";
import ApprovePage from "./Pages/Approve"
import Manager from "./Pages/ManagerPages/Manager";
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
        {/* I have create these  routes */}
        <Route path="/request" element={<Request />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/approve/:id" element={<ApprovePage />} />
        <Route path="/reject/:id" element={<Rejection />} />

       
      </Routes>
    </Router>
  );
}

export default App;
