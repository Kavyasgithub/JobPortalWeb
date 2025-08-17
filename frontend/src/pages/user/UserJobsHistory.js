import React, {useEffect} from 'react'
import { Typography } from '@mui/material'
import {Box} from '@mui/material'
import { useDispatch, useSelector} from 'react-redux'
import { userProfileAction } from '../../redux/actions/userAction'
import CardElement from '../../component/cardElement'


const UserJobsHistory = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  // Debug logs
  console.log('User:', user);
  console.log('User jobsHistory:', user && user.jobsHistory);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop: '40px',
        paddingLeft: 0,
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
        }}
      >
        Jobs History
      </Typography>
  <Box sx={{ width: '100%', maxWidth: '98vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pl: 2 }}>
        {user && Array.isArray(user.jobsHistory) && user.jobsHistory.length > 0 ? (
          user.jobsHistory.map((history, i) => (
            <Box key={i} sx={{ width: '100%', mb: 4 }}>
              <CardElement
                id={history._id}
                jobTitle={history.title}
                description={history.description}
                category={history.jobType ? history.jobType.jobTypeName : "No category"}
                location={history.location}
                jobObj={history}
              />
            </Box>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: 18, color: '#555', mt: 2 }}>
            No jobs history found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default UserJobsHistory

