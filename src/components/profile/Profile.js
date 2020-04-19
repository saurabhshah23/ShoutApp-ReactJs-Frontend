import React from "react";
import { Link } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import dayjs from "dayjs";
import EditProfile from "./EditProfile";
import MyIconButton from "../../util/MyIconButton";
// Redux Stuff
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, logoutUser } from "../../redux/actions/userActions";
// MUI Stuff
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LinkIcon from "@material-ui/icons/Link";
import EditIcon from "@material-ui/icons/Edit";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
    "& .logout-button": {
      marginTop: 10,
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {
    isLoading,
    isAuthenticated,
    credentials: { handle, website, bio, imageUrl, location, createdAt },
  } = user;

  // Event handlers
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };
  const handleEditImage = (event) => {
    document.getElementById("imageUpload").click();
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkup = !isLoading ? (
    isAuthenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              hidden="hidden"
            />
            {/* <Tooltip title="Edit Profile picture" placement="top">
              <IconButton onClick={handleEditImage} className={classes.button}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip> */}
            <MyIconButton
              tip="change profile picture"
              handleClick={handleEditImage}
              btnClass={classes.button}
            >
              <EditIcon color="primary" />
            </MyIconButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && (
              <>
                <Typography variant="body2">{bio}</Typography>
                <hr />
              </>
            )}
            {location && (
              <>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")} </span>
            {/* <Button
              variant="contained"
              color="secondary"
              className="logout-button"
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button> */}
          </div>
          {/* <Tooltip title="Logout" placement="top">
            <IconButton onClick={handleLogout}>
              <LogoutIcon color="primary" />
            </IconButton>
          </Tooltip> */}
          <MyIconButton tip="Logout" handleClick={handleLogout}>
            <LogoutIcon color="primary" />
          </MyIconButton>
          <EditProfile />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Sign up
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );

  return profileMarkup;
};

export default Profile;
