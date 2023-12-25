import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterGuide from './components/RegisterGuide';
import Guides from './components/Guides';
import SingleGuide from './components/SingleGuide';
import Login from './components/Login';
import CreateBlog from './components/CreateBlog';
import UpdateGuide from './components/UpdateGuide';
import CreateTrip from './components/CreateTrip';
import UpdateBlog from './components/UpdateBlog';
import UpdateTrip from './components/UpdateTrip';
import RegisterUser from './components/RegisterUser';
import Users from './components/Users';
import LoginUser from './components/LoginUser';
import SingleUser from './components/SingleUser';
import Trips from './components/Trips';
import SingleBlog from './components/SingleBlog';
import UpdateUser from './components/UpdateUser';
import ViewBlog from './components/ViewBlog';
import SingleTrip from './components/SingleTrip';
import ViewGuide from './components/ViewGuide';
import TripsGuide from './components/TripsGuide';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
<Route path="/" element={<App/>}/>
<Route path="/register-guide" element={<RegisterGuide/>}/>
<Route path="/register-user" element={<RegisterUser/>}/>
<Route path="/guides" element={<Guides/>}/>
<Route path="/users" element={<Users/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/trip" element={<Trips/>}/>
 <Route path="/user-login" element={<LoginUser/>}/> 
<Route path="/single-guide/:guideId" element={<SingleGuide />}/>
<Route path="/single-user/:userId" element={<SingleUser/>}/>
<Route path="/createBlog" element={<CreateBlog/>}/>
<Route path="/createTrip" element={<CreateTrip/>}/>
<Route path="/guides/:guideId" element={<UpdateGuide/>}/>
<Route path="/users/:userId" element={<UpdateUser/>}/>
<Route path="/single-guide/:guideId/blog/:blogId" element={<UpdateBlog/>}/>
<Route path="/single-guide/:guideId/:tripId" element={<UpdateTrip/>}/>
<Route path="/single-blog/:blogId" element={<ViewBlog/>}/>
<Route path="/single-user/:userId/:tripId" element={<SingleTrip/>}/>
<Route path="/view-guide/:userId/:guideId" element={<ViewGuide/>}/>
<Route path="/single-user/:userId/:tripId" element={<TripsGuide/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
