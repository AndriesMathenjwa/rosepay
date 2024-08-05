import React, { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_a";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import {
  Paper,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import UserMenuButton from "../../../Components/UserMenuButton";
import CustomButton from "../../../Components/CustomButton";
import SendIcon from "@mui/icons-material/TableView";

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

const CircleButton = styled(Button)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  minWidth: 0,
  padding: 0,
  backgroundColor: "#D81730",
  color: "#fff",
  fontWeight: "bold",

  "&:hover": {
    backgroundColor: "#aaa",
  },
}));

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [currentInvoiceIndex, setCurrentInvoiceIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/admin");
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetch(
      "https://cn6gihz1g2.execute-api.eu-west-1.amazonaws.com/production/invoices"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched invoices:", data.invoices);
        setInvoices(data.invoices);
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const handleNextInvoice = () => {
    setCurrentInvoiceIndex((prevIndex) =>
      prevIndex === invoices.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevInvoice = () => {
    setCurrentInvoiceIndex((prevIndex) =>
      prevIndex === 0 ? invoices.length - 1 : prevIndex - 1
    );
  };

  const currentInvoice = invoices[currentInvoiceIndex];

  const navigateToCadmin = () => {
    navigate("/admin");
  };

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
                    LIST OF INVOICES
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 5,
                }}
              >
                <CustomButton
                  onClick={handleClick}
                  text="Table View"
                  icon={SendIcon}
                  sx={{ width: "60% !important" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ChevronLeftIcon
                    style={{ fontSize: "50px", cursor: "pointer" }}
                    onClick={handlePrevInvoice}
                  />
                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: "#f0f0f0",
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
                      color: "#D81730",
                    }}
                  >
                    {currentInvoice ? (
                      <>
                        <Typography
                          paragraph
                          sx={{
                            fontWeight: "bold",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            margin: 2,
                          }}
                        >
                          {currentInvoice.invoice_id}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#D81730",
                            fontSize: "15px",
                          }}
                          paragraph
                        >
                          Month: {currentInvoice.generated_date}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#D81730",
                            fontSize: "15px",
                          }}
                          paragraph
                        >
                          Lessons worked: {currentInvoice.sessions_worked}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#D81730",
                            fontSize: "15px",
                          }}
                          paragraph
                        >
                          Calculated fee: {currentInvoice.Amount}
                        </Typography>
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "#D81730",
                            fontSize: "15px",
                          }}
                          paragraph
                        >
                          Issued to Employee: {currentInvoice.employee_id}
                        </Typography>
                      </>
                    ) : (
                      <Typography>Loading...</Typography>
                    )}
                  </Paper>
                  <ChevronRightIcon
                    style={{ fontSize: "50px", cursor: "pointer" }}
                    onClick={handleNextInvoice}
                  />
                </Box>
                <IndicatorContainer sx={{ mt: "7%" }}>
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
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
};

export default Dashboard;
