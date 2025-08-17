import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { USER_SIGNIN_RESET } from '../../redux/constants/userContants';

const drawerWidth = 240;
const miniDrawerWidth = 60;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function SidebarAdm({ open }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get userInfo from localStorage
  let userInfo = null;
  try {
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  } catch (e) {}
  const isAdmin = userInfo && userInfo.role === 1;

  const handleLogout = () => {
    dispatch({ type: USER_SIGNIN_RESET });
    navigate('/');
  };

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : miniDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : miniDrawerWidth,
          boxSizing: 'border-box',
          background: '#1976d2',
          color: '#fff',
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: open ? '2rem 0 1rem 0' : '1rem 0', transition: 'padding 0.3s' }}>
          <Avatar
            src={require('../../images/profile.png')}
            sx={{ width: open ? 80 : 40, height: open ? 80 : 40, mb: 2, bgcolor: '#1976d2', cursor: 'pointer', transition: 'width 0.3s, height 0.3s' }}
            onClick={() => navigate('/')}
          />
        </div>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={isAdmin ? () => navigate('/admin/dashboard') : () => navigate('/user/dashboard')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
              <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><DashboardIcon /></ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/admin/users')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
              <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><PeopleIcon /></ListItemIcon>
              {open && <ListItemText primary="All Users" />}
            </ListItemButton>
          </ListItem>
          {isAdmin ? (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/admin/dashboard')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><PeopleIcon /></ListItemIcon>
                  {open && <ListItemText primary="Users" />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/admin/dashboard')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><WorkIcon /></ListItemIcon>
                  {open && <ListItemText primary="Jobs" />}
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/user/jobs')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><AssignmentTurnedInIcon /></ListItemIcon>
                  {open && <ListItemText primary="Applied Jobs" />}
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/user/info')} sx={{ justifyContent: open ? 'flex-start' : 'center', px: open ? 2 : 1 }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: open ? 2 : 'auto', justifyContent: 'center' }}><AccountCircleIcon /></ListItemIcon>
                  {open && <ListItemText primary="Personal Info" />}
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </div>
      <div>
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout} sx={{ justifyContent: open ? 'center' : 'center', py: 2 }}>
              <ListItemIcon sx={{ minWidth: 0, color: '#fff', justifyContent: 'center' }}><LogoutIcon /></ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
