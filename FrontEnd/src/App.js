import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile";
import UserList from "./Pages/AdminPages/UserList";
import CreateUsers from "./Pages/AdminPages/CreateUser"
import RootLayout from "./Layout/RootLayout";
function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create" element={<CreateUsers />} />
        {/* <Route index element={<LandingPage />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
