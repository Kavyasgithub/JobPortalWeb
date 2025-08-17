import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/actions/userAction';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.userList || {});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
<div style={{ maxWidth: 1100, margin: '0 auto', marginTop: 0, paddingTop: 0, position: 'relative', top: 0 }}>
      <Paper elevation={4} sx={{ borderRadius: 3, p: 3, background: 'rgba(255,255,255,0.98)' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#1976d2', letterSpacing: 1 }}>All Users</Typography>
        {loading ? (
          <Typography sx={{ m: 2 }}>Loading...</Typography>
        ) : error ? (
          <Typography color="error" sx={{ m: 2 }}>{error}</Typography>
        ) : (
          <TableContainer>
            <Table sx={{ minWidth: 700, borderRadius: 2, overflow: 'hidden' }}>
              <TableHead>
                <TableRow sx={{ background: '#1976d2' }}>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', border: 0 }}>ID</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', border: 0 }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', border: 0 }}>Email</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold', border: 0 }}>Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map(user => (
                  <TableRow key={user._id} hover sx={{ background: '#f9fafd', '&:nth-of-type(even)': { backgroundColor: '#e3eefa' } }}>
                    <TableCell sx={{ border: 0 }}>{user._id}</TableCell>
                    <TableCell sx={{ border: 0, fontWeight: 500 }}>{user.firstName || ''} {user.lastName || ''}</TableCell>
                    <TableCell sx={{ border: 0 }}>{user.email}</TableCell>
                    <TableCell sx={{ border: 0, color: user.role === 1 ? '#1976d2' : '#333', fontWeight: user.role === 1 ? 'bold' : 'normal' }}>{user.role === 1 ? 'Admin' : 'User'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </div>
  );
};

export default UsersPage;
