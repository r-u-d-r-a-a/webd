import React from 'react'
import Navbar from './navbar'
import Login from './login'
import {Routes, Route} from 'react-router-dom';
import Home from './home';
import Signup from './signup';
import FlightDetails from './flightDetails';
import AuthProvider from './auth';
import RequireAuth from './requireAuth';
import PostFlight from './postFlight';
import Explore from './explore';
import About from './about';
import Contact from './contact';
import UserProfile from './userProfile';

export default function Layout() {
  return (
    <div>
    <Navbar></Navbar>
    <AuthProvider>
    <Routes>
      <Route path='/' element={<Home/>}  ></Route>
      <Route path='/signup' element={<Signup/>}  ></Route>
      <Route path='/explore' element={<Explore/>}  ></Route>
      <Route path='/about' element={<About/>}  ></Route>
      <Route path='/contact' element={<Contact/>}  ></Route>
      <Route path='/userProfile' element={<UserProfile/>}  ></Route>
      <Route path='/postFlight' element={<RequireAuth role={["admin","provider"]} ><PostFlight/></RequireAuth>}  ></Route>
      <Route path='/flightDetails/:id' element={<RequireAuth role={["admin","user","provider"]} ><FlightDetails/></RequireAuth>}  ></Route>
      <Route path='/me' element={<UserProfile />}></Route>
      </Routes>
      </AuthProvider>
    </div>
  )
}