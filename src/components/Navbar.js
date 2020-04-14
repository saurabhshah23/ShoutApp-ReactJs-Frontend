import React from "react";
import { Link } from "react-router-dom";
import MyIconButton from "../util/MyIconButton";
// Redux Stuff
import { useSelector } from "react-redux";
// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          {isAuthenticated ? (
            <>
              <MyIconButton tip="Create shout">
                <AddIcon color="primary" />
              </MyIconButton>
              <Link to="/">
                <MyIconButton tip="Home">
                  <HomeIcon color="primary" />
                </MyIconButton>
              </Link>
              <MyIconButton tip="Notifications">
                <NotificationsIcon color="primary" />
              </MyIconButton>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
