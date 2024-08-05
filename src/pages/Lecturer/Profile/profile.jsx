import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  styled,
  createTheme,
  ThemeProvider,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_l";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenuButton from "../../../Components/UserMenuButton";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const defaultTheme = createTheme();

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 360,
}));

const ContentContainer = styled(Box)(({ theme, open }) => ({
  display: "flex",
  flexGrow: 1,
  marginTop: 30,
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  marginLeft: open ? 0 : -130,
  width: open ? `calc(100% - 240px)` : "100%",
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  width: "95%",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(3),
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: "auto",
  marginBottom: theme.spacing(2),
  backgroundColor: "#31343D",
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (
      !userDetails ||
      (userDetails.role !== "lecturer" && userDetails.role !== "Lecturer")
    ) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

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
                    PROFILE
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>
            <Typography sx={{ fontWeight: "700", textAlign: "center", fontSize: "35px", mt:"30px" }}>
              Profile Information
            </Typography>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 0,
                mt: 0,
                ml: 15,
                mr: 15,
              }}
            >
              <ProfileCard>
                <ProfileAvatar>
                  <AccountCircleIcon sx={{ fontSize: 72, color: "#fff" }} />
                </ProfileAvatar>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#D81730",
                      marginBottom: "10px",
                    }}
                  >
                    {userDetails.name} {userDetails.surname}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "textSecondary",
                      marginBottom: "10px",
                    }}
                  >
                    Employee ID: {userDetails.user_id}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "textSecondary",
                      marginBottom: "10px",
                    }}
                  >
                    Email Address: {userDetails.email}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "textSecondary",
                      marginBottom: "10px",
                    }}
                  >
                    Cell Phone:
                  </Typography>
                </CardContent>
              </ProfileCard>
            </Box>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
