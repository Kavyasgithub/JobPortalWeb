import UsersPage from './pages/user/UsersPage';
import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import JobDetails from './pages/JobDetails';
import { ThemeProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme' 
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import UserDashboard from './pages/user/UserDashboard'
import UserRoute from './component/UserRoute'
// import AdminRoute from './component/AdminRoute'
import UserJobsHistory from './pages/user/UserJobsHistory'
import Layout from './pages/global/Layout'
import UserInfoDashboard from './pages/user/UserInfoDashboard'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/location/:location" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/dashboard" element={<UserRoute><Layout><UserDashboard /></Layout></UserRoute>} />
          <Route path="/user/jobs" element={<UserRoute><Layout><UserJobsHistory /></Layout></UserRoute>} />
          <Route path="/user/info" element={<UserRoute><Layout><UserInfoDashboard/></Layout></UserRoute>} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/users" element={<Layout><UsersPage /></Layout>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </>
  )
}

export default App
