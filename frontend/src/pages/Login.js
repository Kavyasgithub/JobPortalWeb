import React, { useEffect } from "react";
import { Avatar, Box } from "@mui/material";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import LockClockOutlinedIcon from "@mui/icons-material/LockClockOutlined";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userSignInAction } from "../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Paper } from "@mui/material";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state) => state.signIn);
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/");
      }
    }, [isAuthenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions ) => {
      // Replace this with your login logic (e.g., dispatch Redux action)
    //   alert(JSON.stringify(values, null, 2));
    dispatch(userSignInAction(values));
      actions.resetForm(); 
    },
  });

  return (
    <>
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <Avatar className="login-avatar">
            <LockClockOutlinedIcon />
          </Avatar>
          <div className="login-title">Login</div>
          <form onSubmit={formik.handleSubmit} className="login-form">
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              InputLabelProps={{ shrink: true }}
              placeholder="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              className="login-btn"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
