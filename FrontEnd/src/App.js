// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import LandingPage from "./Pages/LandingPage"

// function App() {
  
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<RootLayout />}>
        
//         <Route path="/home" element={<Home />} />
//         <Route path="/details/:id" element={<DetailPage />} />
//         <Route path="/order/:id" element={<OrderPage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/users" element={<UserList />} />
//         <Route path="/create" element={<CreateUsers />} />
//         {/* <Route index element={<LandingPage />} /> */}
//       </Route>
//     )
//   );
//   return <RouterProvider router={router} />;
// }

// export default App;
import LandingPage from "./Pages/LandingPage";
// import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import UserList from "./Pages/AdminPages/UserList";
import CreateUsers from "./Pages/AdminPages/CreateUser";
// import RootLayout from "./Layout/RootLayout";
import DetailPage from "./Pages/DetailsPage";
import OrderPage from "./Pages/Order";

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
       
      </Routes>
    </Router>
  );
}

export default App;
