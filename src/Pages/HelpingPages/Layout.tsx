import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SideNav from './SideNav'

export default function Layout() {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <div style={{marginBottom : 0}}>
      <Footer />
      </div>
    </>
  )
}
