
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, useTheme, Dialog, DialogTitle, DialogContent, DialogActions as MuiDialogActions, Snackbar, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addJobToHistory } from '../redux/actions/userAction';


const CardElement = ({ jobTitle, description, category, location, id, jobObj }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.signIn);
  const [open, setOpen] = React.useState(false);
  const [appliedOpen, setAppliedOpen] = React.useState(false);

  const handleMoreDetails = () => {
    if (userInfo) {
      if (window.location.pathname.startsWith('/user/jobs')) {
        setOpen(true);
      } else {
        navigate(`/job/${id}`, { state: { applied: true, job: jobObj } });
      }
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  const handleApply = () => {
    // Dispatch action to add job to history
    dispatch(addJobToHistory(jobObj));
    setAppliedOpen(true);
    // Navigation will be handled in Snackbar onClose
  };

  const handleAppliedClose = (event, reason) => {
    setAppliedOpen(false);
    navigate('/');
  };

  return (
    <>
      <Card
        sx={{
          width: '100%',
          mb: 2,
          mt: 0,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14, color: palette.primary.main, fontWeight: 500 }} gutterBottom>
            <IconButton><LocationOnIcon sx={{ fontSize: 18, color: palette.primary.main }} /></IconButton>{location}
          </Typography>
          <Typography variant='h5' component="div" sx={{ fontWeight: 'bold' }}>
            {jobTitle}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {category}
          </Typography>
          <Typography variant='h6' component="div">
            Description: {description.split(" ").slice(0, 15).join(" ") + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Button disableElevation variant='contained' size='small' startIcon={<AddIcon />} onClick={handleMoreDetails}>
            More Details
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: 22 }}>{jobTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Location:</strong> {location}</Typography>
          {jobObj && jobObj.salary && (
            <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Salary:</strong> {jobObj.salary}</Typography>
          )}
          <Typography variant="subtitle1" sx={{ mb: 1 }}><strong>Description:</strong> {description}</Typography>
          {window.location.pathname.startsWith('/user/jobs') ? (
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#2e7d32', mt: 2 }}>Applied</Typography>
          ) : null}
        </DialogContent>
        <MuiDialogActions>
          {!window.location.pathname.startsWith('/user/jobs') && (
            <Button variant="contained" color="primary" onClick={handleApply}>Apply for this job</Button>
          )}
          <Button onClick={handleClose} color="primary">Close</Button>
        </MuiDialogActions>
      </Dialog>
      <Snackbar
        open={appliedOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={1500}
        onClose={handleAppliedClose}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          APPLIED
        </Alert>
      </Snackbar>
    </>
  );
}

export default CardElement;
