import React from 'react';
import { useLocation } from 'react-router-dom';

const UserJobDetails = () => {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <div>No job details found.</div>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>{job.title}</h2>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '1.2rem' }}>Applied</p>
    </div>
  );
};

export default UserJobDetails;
