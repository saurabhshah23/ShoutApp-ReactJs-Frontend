import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
// Components
import Shout from "../components/Shout";
import Profile from "../components/Profile";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { getShouts } from "../redux/actions/dataActions";

const Home = () => {
  // const [shouts, setShouts] = useState(null);

  const data = useSelector((state) => state.data);
  const { isLoading, shouts } = data;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShouts());
  }, []);

  let recentShouts = !isLoading ? (
    shouts.map((shout) => <Shout key={shout.shoutId} shout={shout} />)
  ) : (
    <p>Loading Shouts...</p>
  );

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentShouts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
