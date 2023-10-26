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
import RootLayout from "./Layout/RootLayout";
function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route  path="/home" element = {<Home /> }/>
        {/* <Route index element={<LandingPage />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
