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
          <Route path='/helpme' element={<HelperComponents />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
