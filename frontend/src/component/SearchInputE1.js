import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Box, Button, InputBase} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SearchInputE1 = () => {
  const navigate = useNavigate();

  const onSubmit = (values, actions) => {
    const { search } = values;
    if (search.trim()) {
      navigate(`/search/${search}`);
    }else{
        navigate('/');
    }
    actions.resetForm();
  };

  const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
    initialValues: {
      search: '',
    },
    validationSchema: yup.object({
      search: yup.string('Enter your search query').required('this field can not be empty'),
    }),
    onSubmit,
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200, width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 800 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <InputBase
            fullWidth
            id="search"
            name="search"
            placeholder="ex: developer, front end"
            value={values.search}
            onChange={handleChange}
            sx={{ bgcolor: '#fff', px: 2, py: 1, borderRadius: 2, boxShadow: 1, fontSize: 18 }}
          />
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} sx={{ marginLeft: '10px', fontWeight: 600, fontSize: 16 }}>
            SEARCH
          </Button>
        </Box>
        <Box component="span" sx={{ color: 'orange', display: 'block', mt: 1 }}>{touched.search && errors.search}</Box>
      </form>
    </Box>
  );
};

export default SearchInputE1;
