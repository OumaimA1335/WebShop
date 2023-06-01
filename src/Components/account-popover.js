import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
 const {logout} = useAuth();
 const history = useNavigate();
  const handleSignOut = 
    () => {
     try{
      logout();
      console.log("you have signout successfully");
      history("/");
     }catch(err)
     {
       console.loh(err);
     }
    };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography>
          <Link to={"compte"} style={{textDecoration:"none", fontSize: "16px" ,fontFamily: "initial",
                fontStyle: "-moz-initial" ,color:"black"}}>Compte </Link>
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}
        style={{textDecoration:"none", fontSize: "16px" ,fontFamily: "initial",
                fontStyle: "-moz-initial" ,color:"black"}}>
          Déconnecter
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
