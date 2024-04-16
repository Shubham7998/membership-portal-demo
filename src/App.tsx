import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideNav from './Pages/HelpingPages/SideNav';
import Home from './Pages/HelpingPages/Home';
import Settings from './Pages/HelpingPages/Settings';
import About from './Pages/HelpingPages/About';
import Layout from './Pages/HelpingPages/Layout';
import User from './Pages/User';
import ShowUser from './Pages/ShowUser';
import Subscriber from './Pages/Subscriber';
import HelperComponents from './Pages/HelperComponents';
import ShowSubscriber from './Pages/ShowSubscriber';
import Helpme2 from './Pages/HelpingPages/Helpme2';
import ShowProduct from './Pages/HelpingPages/ShowProduct';
import Product from './Pages/Product';
import { TablePaginationActions } from './Helptxt/TableComp';
import Discount from './Pages/Discount';
import GenericList from './Pages/GenericList';
import ShowDiscount from './Pages/ShowDiscount';
import ShowTax from './Pages/ShowTax';
import Tax from './Pages/Tax';
import Subscription from './Pages/Subscription';
import ShowSubscriptions from './Pages/ShowSubscriptions';

function App() {
  return (
    <BrowserRouter >
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
    </BrowserRouter>
  );
}

export default App;
