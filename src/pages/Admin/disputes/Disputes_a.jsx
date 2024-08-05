import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_a";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Divider, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import NearMeDisabledIcon from "@mui/icons-material/NearMeDisabled";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import UserMenuButton from "../../../Components/UserMenuButton";

// Routing
import { Link } from "react-router-dom";

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

  const IndicatorContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
  }));

  const Indicator = styled(Box)(({ theme, active }) => ({
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: active ? "#DA2F49" : "#ccc",
    margin: "0 8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }));

  const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(0);
  const [disputeMessages, setDisputeMessages] = useState([]);

  useEffect(() => {
    fetch("https://52xcrgi3s3.execute-api.eu-west-1.amazonaws.com/production/disputes")
      .then((response) => response.json())
      .then((data) => setDisputeMessages(data.employees))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNextInvoice = () => {
    setCurrentInvoiceIndex((prevIndex) =>
      prevIndex === disputeMessages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevInvoice = () => {
    setCurrentInvoiceIndex((prevIndex) =>
      prevIndex === 0 ? disputeMessages.length - 1 : prevIndex - 1
    );
  };

  const currentInvoice = disputeMessages[currentInvoiceIndex];
  const isSmallScreen = useMediaQuery("(max-width:1110px)");

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (
      !userDetails ||
      (userDetails.role !== "admin" && userDetails.role !== "Admin")
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
                    LIST DISPUTES
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>

            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                mt: 1,
                ml: 15,
                mr: 15,
              }}
            >
              {disputeMessages.length > 0 && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 5,
                    }}
                  >
                    <ChevronLeftIcon
                      style={{ fontSize: "50px", cursor: "pointer" }}
                      onClick={handlePrevInvoice}
                    />
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: "white",
                        borderRadius: "25px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "280px",
                        position: "relative",
                        width: "100%",
                        mx: 3,
                        mt: "50px",
                      }}
                    >
                      
                      <Typography
                        paragraph
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          margin: 2,
                        }}
                      >
                      <span>EMPLOYEE ID:</span>   {currentInvoice.user_id} <br/>
                      {/* <span>DISPUTE STATUS:</span> {currentInvoice.dispute_status} <br/>  */}
                        <Divider/><br/> 
                        <span >DISPUTE MESSAGE:</span> <br/> {currentInvoice.dispute_reason} 
                      </Typography>
                    </Paper>
                    <ChevronRightIcon
                      style={{ fontSize: "50px", cursor: "pointer" }}
                      onClick={handleNextInvoice}
                    />
                  </Box>

                  <Box>
                    <div style={{ textAlign: "center" }}>
                      <Typography variant="body1">
                        DATE SUBMITTED: {currentInvoice.dispute_date}
                      </Typography>
                    </div>
                    <Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "20px",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                >
                  <Typography variant="body1" style={{ marginRight: "0px" }}>
                    RESOLUTION STATUS: {currentInvoice.dispute_status}
                  </Typography>
                  <FormControl component="fieldset" sx={{ marginLeft: "20px" }}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ gap: isSmallScreen ? "0" : "4px" }}
                    >
                      <FormControlLabel
                        value="pending"
                        control={<Radio />}
                        label="Pending"
                        sx={{ justifyContent: "flex-start", textAlign: "left" }}
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        value="resolved"
                        control={<Radio />}
                        label="Resolved"
                        sx={{ justifyContent: "flex-start", textAlign: "left" }}
                        labelPlacement="start"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <IndicatorContainer sx={{ mt: "3%" }}>
                  {[0, 1, 2, 3].map((index) => (
                    <Indicator
                      key={index}
                      active={index === currentInvoiceIndex % 4}
                      onClick={() =>
                        setCurrentInvoiceIndex(
                          currentInvoiceIndex -
                            (currentInvoiceIndex % 4) +
                            index
                        )
                      }
                    />
                  ))}
                </IndicatorContainer>
              </Box>
                  </Box>
                </>
              )}
            </Box>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
