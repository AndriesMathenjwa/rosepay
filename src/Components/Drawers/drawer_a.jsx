import React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './navlistitems_a';
import Box from '@mui/material/Box';
//IMAGES
import Rose from '../../Images/Rosey.svg';
//images
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import profile4 from "../../Images/profile4.jpeg" 


const drawerWidth = 320;

const DrawerWrapper = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      height: '100%', // Full height for the drawer
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9.2),
        },
      }),
    },
  }),
);

const DrawerComponent = ({ open, toggleDrawer }) => {
  return (
    <DrawerWrapper variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
            <Box sx={{ marginLeft: '75px',   }}>
            <Stack direction="row" sx={{ mt: 2, mb: 2, }} >
                <Avatar
                    alt="Remy Sharp"
                    src={profile4}
                    sx={{ width: 150, height: 150 }}
                />
            </Stack>
            </Box>
      <Divider />
      <List component="nav">
        {mainListItems}
      </List>
      <Divider />
      <Box sx={{ marginLeft: '15px', marginTop: '80px', marginRight: '15px' }}>
                <img
                    src={Rose}
                    alt="Logo"
                    style={{ width: '280px', height: '180px' }}
                />
    </Box>
    </DrawerWrapper>
  );
};

export default DrawerComponent;
