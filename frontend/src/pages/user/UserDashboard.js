import React from 'react'
import {  Typography, Box} from '@mui/material'
import StatComponent from '../../component/StatComponent'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from 'react-redux';
import moment from 'moment';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.userProfile);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        p: 0,
        m: 0,
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: '#fff',
          fontWeight: 700,
          mb: 4,
          letterSpacing: 1,
          textAlign: 'left',
          pl: 2,
          pt: 2,
        }}
      >
        Dashboard
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, width: '100%', pl: 2 }}>
        <Box sx={{ minWidth: 320, maxWidth: 400, flex: 1 }}>
          <StatComponent
            value={user && user.createdAt ? moment(user.createdAt).format('YYYY / MM / DD') : '--'}
            icon={<SupervisorAccountIcon sx={{ color: '#1976d2', fontSize: 44, background: '#e3eafc', borderRadius: '50%', p: 1 }} />}
            description="Member since"
            money=""
          />
        </Box>
        <Box sx={{ minWidth: 320, maxWidth: 400, flex: 1 }}>
          <StatComponent
            value={user && Array.isArray(user.jobsHistory) ? user.jobsHistory.length : 0}
            icon={<WorkIcon sx={{ color: '#1976d2', fontSize: 44, background: '#e3eafc', borderRadius: '50%', p: 1 }} />}
            description="Number of jobs submitted"
            money=""
          />
        </Box>
      </Box>
    </Box>
  );
}

export default UserDashboard
