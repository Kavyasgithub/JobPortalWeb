
import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
import Navbar from "../component/Navbar";

const JobDetails = () => {

  const { id } = useParams();
  const location = useLocation();
  const isApplied = location.state && location.state.applied;
  // Prefer job from navigation state, fallback to jobs list
  const { jobs } = useSelector((state) => state.loadJobs);
  const job = location.state && location.state.job
    ? location.state.job
    : (jobs ? jobs.find((j) => j._id === id) : null);

  if (!job) {
    return (
      <>
        <Navbar />
        <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f7fa' }}>
          <Typography variant="h5">Job not found</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
        <Card sx={{ minWidth: 350, maxWidth: 600, width: '100%', p: 4, boxShadow: 8, borderRadius: 5, background: '#fff', border: '1px solid #e3e3e3', position: 'relative' }}>
          <CardContent>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#1976d2', letterSpacing: 1 }}>{job.title}</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#555', mb: 1 }}>
              <b>Location:</b> {job.location}
            </Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#555', mb: 1 }}>
              <b>Salary:</b> {job.salary ? job.salary : 'Not specified'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, fontSize: 18, color: '#333', lineHeight: 1.7, mb: 1 }}>
              <b>Description:</b> {job.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2, px: 4, fontWeight: 600, fontSize: 18, boxShadow: 3 }}>
              Apply for this Job
            </Button>
          </CardActions>
        </Card>
      </Box>
    </>
  );
};

export default JobDetails;
