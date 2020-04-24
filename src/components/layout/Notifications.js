import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import {
  Badge,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
// Icons
import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

function Notifications() {
  dayjs.extend(relativeTime);
  const notifications = useSelector((state) => state.user.notifications);
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleOpen = (event) => {
    console.log("handleOpen...");
    setAnchorEl(event.target);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleMenuOpen = (event) => {
    let unreadNotificationIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    dispatch(markNotificationsRead(unreadNotificationIds));
  };

  let unreadNotifications, notificationIcon;
  if (notifications && notifications.length > 0) {
    unreadNotifications = notifications.filter(
      (notification) => !notification.read
    );
    unreadNotifications.length > 0
      ? (notificationIcon = (
          <Badge badgeContent={unreadNotifications.length} color="secondary">
            <NotificationIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationIcon />);
  } else {
    notificationIcon = <NotificationIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notif) => {
        const verb = notif.type === "like" ? "liked" : "commented on";
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? "primary" : "secondary";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notif.notificationId} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/users/${notif.recipient}/shout/${notif.shoutId}`}
              variant="body1"
              color="default"
            >
              {notif.sender} {verb} your shout {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );

  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpen}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
}

export default Notifications;
