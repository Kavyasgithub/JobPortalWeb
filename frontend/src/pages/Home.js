import React, {useEffect, useState} from "react";
import Navbar from "../component/Navbar";
import Header from "../component/Header";
import Footer from "../component/Footer";
import {Box, Card, Container, ListItemIcon, MenuItem, MenuList, Pagination, Stack, Typography, useTheme }from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { jobLoadAction } from "../redux/actions/jobAction";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import {Link ,useParams } from "react-router-dom";
import CardElement from "../component/cardElement";
import LoadingBox from "../component/LoadingBox";
import SelectComponent from "../component/SelectComponent";
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Home = () => {

  // this is how u can select a state u want to work with 
  const { jobs, pages , loading, setUniqueLocations } = useSelector((state) => state.loadJobs);
  const { jobT: jobTypes } = useSelector((state) => state.loadJobTypes);

  const { palette } = useTheme();
  const dispatch = useDispatch();
  const {keyword, location} = useParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState('');
  // Removed duplicate declaration of selectedLocation
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    // Dispatch an action to load jobs when the component mounts
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [dispatch, page, keyword, cat, location]);

  useEffect(() => {
    // Dispatch an action to load jobs when the component mounts
    dispatch(jobTypeLoadAction());
  }, [dispatch]);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };
  return (
    <>
      <Box sx={{ bgColor:"#fafafa", minHeight: "100vh", pb: 8 }}>
        <Navbar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Box sx={{ flex: 2, p: 2 }}>
                <Card sx={{ minWidth: 150, mb: 3, mt: 3 , p: 2 }}>
                  <Box sx={{pb: 2}}>
                    <Typography component="h4" sx={{color: palette.primary.main, fontWeight: 600}}>
                      Filter jobs by category
                    </Typography>
                  </Box>

                  <SelectComponent value={cat} onChange={handleChangeCategory} options={jobTypes} label="Job Category" />

                </Card>
                
                {/* jobs by location */}
                <Card sx={{ minWidth: 150, mb: 3, mt: 3 , p: 2 }}>
                  <Box sx={{pb: 2}}>
                    <Typography component="h4" sx={{color: palette.primary.main, fontWeight: 600}}>
                      Filter job by location
                    </Typography>
                    <MenuList>
                      {
                        setUniqueLocations && setUniqueLocations.map((location, i) => (
                          <MenuItem key={i} sx={{py: 1}} onClick={() => {
                            setSelectedLocation(location);
                            setPage(1);
                            dispatch(jobLoadAction(1, keyword, cat, location));
                          }}>
                            <ListItemIcon>
                              <LocationOnIcon sx={{ fontSize: 18 , color: palette.primary.main }} />
                            </ListItemIcon>
                            {/* <Typography component="span" sx={{color: palette.primary.main, fontWeight: 500}}>
                              {location}
                            </Typography> */}
                            <Link to={`/search/location/${location}`}>
                              {location}
                            </Link>
                          </MenuItem>
                        ))
                      }
                    </MenuList>
                  </Box>
                </Card>

              </Box>
              <Box sx={{ flex: 5, p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: '#f5f7fa', borderRadius: 3, boxShadow: 2 }}>
                <Box sx={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {
                    loading ? <LoadingBox /> :
                    jobs && jobs.length === 0 ? 
                    <>
                    <Box sx={{minHeight: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <Typography>No jobs found</Typography>
                    </Box>
                    </> :

                    jobs && jobs.map((job, i) => (
                      <CardElement 
                        key={i} 
                        id={job._id} 
                        jobTitle={job.title} 
                        description={job.description}  
                        category={job.jobType ? job.jobType.jobTypeName : "No category"} 
                        location={job.location} 
                      />
                    ))
                  }
                </Box>
                <Stack spacing={2} direction="row" sx={{ mt: 4, mb: 2, justifyContent: 'center', width: '100%' }}>
                  <Pagination 
                    page={page} 
                    count={pages === 0 ? 1 : pages} 
                    onChange={(event , value) => setPage(value)} 
                    color="primary" 
                    size="large" 
                    sx={{ mx: 'auto', bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}
                  />
                </Stack>
              </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
