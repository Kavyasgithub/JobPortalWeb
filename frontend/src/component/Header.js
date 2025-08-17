import Box from '@mui/material/Box'
import styled from '@emotion/styled';
import React from 'react'
import headerImage from '../images/jobbg.jpg'; // Adjust the path as necessary
import SearchInputE1 from './SearchInputE1';

const Header = () => {

    const StyleHeader = styled(Box)(({ theme }) => ({
        display: 'flex',    
        padding: '10px',
        minHeight: '340px',
        backgroundImage: `url(${headerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.palette.secondary.main
    }));

  return (
    <>
        <StyleHeader>
          <SearchInputE1 />
        </StyleHeader>
    </>

  )
}

export default Header;
