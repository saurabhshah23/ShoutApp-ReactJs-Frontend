import React, { useEffect, useState } from "react";
import Shout from "../components/shout/Shout";
import StaticProfile from "../components/profile/StaticProfile";
// MUI Stuff
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getUserShouts, getUserApi } from "../redux/actions/dataActions";

const User = (props) => {
  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    console.log("in useEffect...");
    let usrHandle = props.match.params.handle;
    console.log("params uH=", usrHandle);
    dispatch(getUserShouts(usrHandle));
    getUserApi(usrHandle)
      .then((res) => {
        console.log("getresin useEff=", res.data);
        setUserDetails(res.data.user);
      })
      .catch((err) => {
        console.log("err===", err);
      });
  }, []); // Or [] if effect doesn't need props or state

  const { isLoading, shouts } = useSelector((state) => state.data);

  const shoutsMarkup = isLoading ? (
    <p>Loading data...</p>
  ) : shouts.length <= 0 ? (
    <p>No shouts by this user.</p>
  ) : (
    shouts.map((shout) => <Shout key={shout.shoutId} shout={shout} />)
  );

  return (
    <>
      <Grid spacing={4} container>
        <Grid item sm={8}>
          {shoutsMarkup}
        </Grid>
        <Grid item sm={4}>
          {userDetails.handle ? (
            <StaticProfile profile={userDetails} />
          ) : (
            <p>Loading profile...</p>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default User;
