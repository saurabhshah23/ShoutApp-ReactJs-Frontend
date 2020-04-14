import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
// import useTheme from "@material-ui/core/styles/useTheme";
import AppIcon from "../images/shout.png";
import { Link } from "react-router-dom";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => {
  return {
    ...theme.forms,
  };
});

export default function Signup(props) {
  const classes = useStyles();

  // redux
  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);

  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    handle: "",
    // loading: false,
    // errors: {},
  });
  const handleChange = (event) => {
    setSignup({
      ...signup,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: signup.email,
      password: signup.password,
      confirmPassword: signup.confirmPassword,
      handle: signup.handle,
    };
    dispatch(signupUser(userData, props.history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm={4}>
        <img src={AppIcon} alt="Shout" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            name="email"
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={UI.errors.email}
            error={UI.errors.email ? true : false}
            onChange={handleChange}
            value={signup.email}
            fullWidth
          />
          <TextField
            name="password"
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={UI.errors.password}
            error={UI.errors.password ? true : false}
            onChange={handleChange}
            value={signup.password}
            fullWidth
          />
          <TextField
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={UI.errors.confirmPassword}
            error={UI.errors.confirmPassword ? true : false}
            onChange={handleChange}
            value={signup.confirmPassword}
            fullWidth
          />
          <TextField
            name="handle"
            id="handle"
            type="text"
            label="Shout Handle"
            className={classes.textField}
            helperText={UI.errors.handle}
            error={UI.errors.handle ? true : false}
            onChange={handleChange}
            value={signup.handle}
            fullWidth
          />

          {UI.errors.general && (
            <Typography
              variant="body2"
              color="error"
              className={classes.customError}
            >
              {UI.errors.general}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={UI.isLoading}
          >
            Sign up
            {UI.isLoading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button>
          <small>
            <Typography variant="body2">
              Already have an account? <Link to="/login">login</Link>
            </Typography>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}
