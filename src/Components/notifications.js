import React from 'react';
import { Popover, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import Button from "@mui/material/Button"

function NotificationList() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([]);

  const handleNotifyClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifyClose = () => {
    setAnchorEl(null);
  };

  const handleNotifyClear = () => {
    setNotifications(null);
    handleNotifyClose();
  };

  const handleNotify = () => {
    const newNotification = {
      id: notifications.length + 1,
      message: 'Notification message',
      time: new Date().toLocaleString(),
    };
    setNotifications([newNotification, ...notifications]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notification-popover' : undefined;

  return (
    <div >
      <Button style={{backgroundColor:"transparent" , marginLeft: "-20px" , textDecoration:"none"}} onClick={handleNotifyClick}>
        <Notifications className="fs-4"
            style={{ marginLeft: "-20px", color: "#FF6600" }} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleNotifyClose}
        onClick={handleNotify}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <List sx={{ width: 300 }}>
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <ListItemAvatar>
                <Avatar>
                  <Notifications />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={notification.message} secondary={notification.time} />
            </ListItem>
          ))}
          {notifications.length > 0 && (
            <ListItem onClick={handleNotifyClear}>
              <ListItemText primary="Clear all" />
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
}

export default NotificationList;
