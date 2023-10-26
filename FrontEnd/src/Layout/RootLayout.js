import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from "../Components/Sidebar"
import Header from '../Components/Header'

const RootLayout = () => {
  return (
    <>
      < Header />
      <Sidebar />
      < Outlet />
    </>
  )
}

export default RootLayout
