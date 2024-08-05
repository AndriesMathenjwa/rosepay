import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '../../../Components/Drawers/drawer_a';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from '@mui/material/Typography';
import RoomPreferencesOutlinedIcon from '@mui/icons-material/RoomPreferencesOutlined';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Avatar, IconButton } from '@mui/material';
import profile from "../../../Images/profile.jpg";
import UserMenuButton from '../../../Components/UserMenuButton';

const defaultTheme = createTheme();

const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 360,
}));

const ContentContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  display: 'flex',
  flexGrow: 1,
  marginTop: 30,
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? 0 : -130,
  width: open ? `calc(100% - 240px)` : '100%',
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  width: '95%',
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  p: 2,
  mt: 3,
  ml: "7%",
  flexDirection: 'row',
  borderRadius: "20px",
  boxShadow: 3,
  backgroundColor: theme.palette.background.paper,
  width: '95%',  // Adjust width as needed
  '& > *': {
    flex: '1 1 auto',
  },
  '& .MuiAvatar-root': {
    width: 150,
    height: 150,
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('https://fdvpj7kib0.execute-api.eu-west-1.amazonaws.com/production/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  console.log(users);

  const navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(() => {
    if (!userDetails) {
      navigate('/');
    }
  }, [userDetails, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userDetails');
    navigate('/');
  };

  if (!userDetails) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <MainContainer>
        <CssBaseline />
        <DrawerContainer>
          <Drawer open={open} toggleDrawer={toggleDrawer} />
        </DrawerContainer>
        <ContentContainer open={open}>
          <TabsContainer>
            <TabContext value="1">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "0.5px solid rgba(0, 0, 0, 0.12)",
                  paddingRight: "1rem",
                  marginTop: 0,
                }}
              >
                <TabList aria-label="lab API tabs example">
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#D81730",
                    }}
                    paragraph
                  >
                    LIST OF USERS
                  </Typography>
                </TabList>
                {/* Added IconButton with Menu for user options */}
                <UserMenuButton userDetails={userDetails} handleLogout={handleLogout} />
              </Box>
            </TabContext>
            {users.map(user => (
  <Box
    key={user.user_id}
    sx={{
      display: 'flex',
      alignItems: 'center',
      p: 2,
      mt: 3,
      ml: "7%",
      flexDirection: 'row',
      borderRadius: "20px",
      boxShadow: 3,
      backgroundColor: 'background.paper',
      width: '87%',  // Adjust width as needed
    }}
  >
    <Avatar
      alt="Profile Picture"
      src={profile}
      sx={{ width: 150, height: 150, mr:"3%" }}
    />
    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography variant="body2" noWrap sx={{ fontSize: "18px",fontWeight:"700", color: "#DA1A35" }}>
        {user.name} {user.surname}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap sx={{ fontSize: "17px" }}>
        Employee ID: {user.user_id}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap sx={{ fontSize: "17px" }}>
        Email: {user.email}
      </Typography>
      <Typography variant="body2" color="textSecondary" noWrap sx={{ fontSize: "17px" }}>
        Role: {user.role}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton color="default" aria-label="Settings" sx={{ color: 'black', fontSize: 'large' }}>
        <RoomPreferencesOutlinedIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <IconButton color="default" aria-label="Mail" sx={{ color: 'black', fontSize: 'large' }}>
        <EmailSharpIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <IconButton color="default" aria-label="Delete" sx={{ color: 'black', fontSize: 'large' }}>
        <DeleteOutlineIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </Box>
  </Box>
))}

          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
