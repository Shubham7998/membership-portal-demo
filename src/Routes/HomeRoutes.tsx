import { Home, Settings, Discount } from '@mui/icons-material'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TablePaginationActions } from '../Helptxt/TableComp'
import HelperComponents from '../Pages/HelperComponents'
import About from '../Pages/HelpingPages/About'
import Helpme2 from '../Pages/HelpingPages/Helpme2'
import Layout from '../Pages/HelpingPages/Layout'
import ShowProduct from '../Pages/ShowLists/ShowProduct'
import Product from '../Pages/CreatePages/Product'
import ShowDiscount from '../Pages/ShowLists/ShowDiscount'
import ShowSubscriber from '../Pages/ShowLists/ShowSubscriber'
import ShowSubscriptions from '../Pages/ShowLists/ShowSubscriptions'
import ShowTax from '../Pages/ShowLists/ShowTax'
import ShowUser from '../Pages/ShowLists/ShowUser'
import Subscriber from '../Pages/CreatePages/Subscriber'
import Subscription from '../Pages/CreatePages/Subscription'
import Tax from '../Pages/CreatePages/Tax'
import User from '../Pages/CreatePages/User'

export default function HomeRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/about' element={<About />}>About</Route>
        <Route path='/settings' element={<Settings />}>Settings</Route>

        <Route path='/user' element={<User />}></Route>
        <Route path='/user/:id' element={<User />}></Route>
        <Route path='/showusers' element={<ShowUser />}></Route>

        <Route path='/subscriber' element={<Subscriber />}></Route>
        <Route path='/subscriber/:id' element={<Subscriber />}></Route>
        <Route path='/showsubscribers' element={<ShowSubscriber />}></Route>

        <Route path='/subscription' element={<Subscription />}></Route>
        <Route path='/subscription/:id' element={<Subscription />}></Route>
        <Route path='/showsubscriptions' element={<ShowSubscriptions />}></Route>

        <Route path='/product' element={<Product />}></Route>
        <Route path='/product/:id' element={<Product />}></Route>
        <Route path='/showproducts' element={<ShowProduct />}></Route>


        <Route path='/discount' element={<Discount />}></Route>
        <Route path='/discount/:id' element={<Discount />}></Route>
        <Route path='/showdiscounts' element={<ShowDiscount />}></Route>

        <Route path='/tax' element={<Tax />}></Route>
        <Route path='/tax/:id' element={<Tax />}></Route>
        <Route path='/showtaxes' element={<ShowTax />}></Route>

        <Route path='/table' element={<TablePaginationActions />}></Route>
        {/* // <Route path='/gen' element={<GenericList data={null}/>}></Route> */}
        <Route path='/helpme' element={<HelperComponents />}></Route>

      </Route>
    </Routes>
  )
}
