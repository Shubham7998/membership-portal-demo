import { Home, Settings, Discount } from '@mui/icons-material'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { TablePaginationActions } from '../Helptxt/TableComp'
import HelperComponents from '../Pages/HelperComponents'
import About from '../Pages/HelpingPages/About'
import Helpme2 from '../Pages/HelpingPages/Helpme2'
import Layout from '../Pages/HelpingPages/Layout'
import ShowProduct from '../Pages/HelpingPages/ShowProduct'
import Product from '../Pages/Product'
import ShowDiscount from '../Pages/ShowDiscount'
import ShowSubscriber from '../Pages/ShowSubscriber'
import ShowSubscriptions from '../Pages/ShowSubscriptions'
import ShowTax from '../Pages/ShowTax'
import ShowUser from '../Pages/ShowUser'
import Subscriber from '../Pages/Subscriber'
import Subscription from '../Pages/Subscription'
import Tax from '../Pages/Tax'
import User from '../Pages/User'

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
        <Route path='/helpme2' element={<Helpme2 />}></Route>

      </Route>
    </Routes>
  )
}
