import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppIcon from "../images/shout.png";
import { Link } from "react-router-dom";
import SubmitProgressBtn from "../util/SubmitProgressBtn";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// redux
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => {
  return {
    ...theme.forms,
  };
});

export default function Login(props) {
  const classes = useStyles();

  // redux
  const dispatch = useDispatch();
  const UI = useSelector((state) => state.UI);
  // const user = useSelector((state) => state.user);

  // local state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // Event handlers
  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: login.email,
      password: login.password,
    };
    dispatch(loginUser(userData, props.history));
  };
  // Event handlers - End

  return (
    <Grid container className={classes.form}>
      <Grid item sm></Grid>
      <Grid item sm={4}>
        <img src={AppIcon} alt="Shout" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            value={login.email}
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
            value={login.password}
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

          {/* <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={UI.isLoading}
          >
            <span>Login</span>
            {UI.isLoading && (
              <CircularProgress size={20} className={classes.progress} />
            )}
          </Button> */}
          <SubmitProgressBtn isLoading={UI.isLoading}>Login</SubmitProgressBtn>

          <small>
            <Typography variant="body2">
              don't have an account? <Link to="/signup">sign-up</Link>
            </Typography>
          </small>
        </form>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
}
