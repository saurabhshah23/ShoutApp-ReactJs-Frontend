import React from "react";
import { Link } from "react-router-dom";
import MyIconButton from "../../util/MyIconButton";
import PostShout from "../shout/PostShout";
import Notifications from "./Notifications";
// Redux Stuff
import { useSelector } from "react-redux";
// MUI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";

export default function Navbar() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <AppBar>
        <Toolbar className="nav-container">
          {isAuthenticated ? (
            <>
              <PostShout />
              <Link to="/">
                <MyIconButton tip="Home">
                  <HomeIcon color="primary" />
                </MyIconButton>
              </Link>
              <Notifications />
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
