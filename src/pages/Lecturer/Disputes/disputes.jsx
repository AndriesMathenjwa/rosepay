import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_l";
import TextField from "@mui/material/TextField";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import UserMenuButton from "../../../Components/UserMenuButton";
import { useNavigate } from "react-router-dom";

const Rosetheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            borderColor: "#D81730",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#D81730",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#D81730",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D81730",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#D81730",
          "&.Mui-checked": {
            color: "#D81730",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#D81730",
          "&.Mui-checked": {
            color: "#D81730",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#D81730",
          "&:hover": {
            backgroundColor: "#A01523",
          },
          color: "#fff",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#D81730",
          "&:hover": {
            color: "#A01523",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#D81730",
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#D81730",
    },
  },
});

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

export default function Dashboard({ onDisputeClick }) {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [tabValue, setTabValue] = useState("2");
  const [disputeReason, setDisputeReason] = useState("");
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    // Handle submit logic here
  };

  const handleDisputeButtonClick = () => {
    setTabValue("1");
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [disputes, setDispute] = useState([]);
  const id = userDetails.user_id;

  useEffect(() => {
    fetch(
      `https://52xcrgi3s3.execute-api.eu-west-1.amazonaws.com/production/user_dispute?user_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched disputes:", data);
        setDispute(data);
        if (data.length > 0) {
          const lastDispute = data[data.length - 1];
          setDisputeReason(lastDispute.dispute_reason);
        }
      })
      .catch((error) => console.error("Error fetching dispute:", error));
  }, [id]);

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
    <ThemeProvider theme={Rosetheme}>
      <MainContainer>
        <CssBaseline />
        <DrawerContainer>
          <Drawer open={open} toggleDrawer={toggleDrawer} />
        </DrawerContainer>
        <ContentContainer open={open}>
          <TabsContainer>
            <TabContext value={tabValue}>
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
                    DISPUTES
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleTabChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Send Dispute" value="1" disabled />
                  <Tab label="View Dispute" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Paper sx={{ p: 2, marginTop: "50px", width: "100%" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#D81730",
                      marginTop: 2,
                    }}
                    paragraph
                  >
                    Type your dispute here.
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Dispute"
                    multiline
                    rows={6}
                    fullWidth
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                  />
                </Paper>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#93AB4F",
                      color: "#FFFFFF",
                      width: "40%",
                      "&:hover": { backgroundColor: "#A01523" },
                    }}
                    endIcon={<SendIcon />}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Paper sx={{ p: 2, marginTop: "50px", width: "100%" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#D81730",
                      marginTop: 2,
                    }}
                    paragraph
                  >
                    This is your dispute.
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Dispute"
                    multiline
                    rows={6}
                    fullWidth
                    value={disputeReason}
                    placeholder="This is the dispute detail"
                    InputProps={{
                      readOnly: true,
                    }}
                    focused
                  />
                </Paper>
              </TabPanel>
            </TabContext>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
