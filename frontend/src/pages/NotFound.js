import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

const NotFound = () => {
  return (
    <>
    <Navbar />
    <Box sx={{height: '81vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <h1>Page not found</h1>
    </Box>
    <Footer />
    </>
  )
}

export default NotFound
