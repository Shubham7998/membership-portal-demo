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
import GenericFloatingTable from './Pages/GenericFloatingTable';
import HomeRoutes from './Routes/HomeRoutes';

function App() {
  return (
    <BrowserRouter >
      <HomeRoutes />
    </BrowserRouter>
  );
}

export default App;
