import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../Drawers/drawer_l";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Paper, TextField } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import UserMenuButton from "../UserMenuButton";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import "./CustomSwalStyles.css"; // Import custom styles

// Customizing the theme
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

export default function Invoice_l() {
  const [open, setOpen] = useState(true);
  const [disputeIndex, setDisputeIndex] = useState(null);
  const [disputeText, setDisputeText] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const { invoiceId, month } = location.state || {};

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (
      !userDetails ||
      (userDetails.role !== "lecturer" && userDetails.role !== "Lecturer")
    ) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const invoiceData = [
    { date: "2024-07-30", time: "10:00 AM", module: "Module 1", rate: "R100" },
    { date: "2024-07-31", time: "11:00 AM", module: "Module 2", rate: "R200" },
  ];

  const generateDisputeId = () => {
    return "dispute-" + Math.random().toString(36).substr(2, 9);
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  };

  const handleDisputeClick = (index) => {
    setDisputeIndex(index);
  };

  const handleDisputeSubmit = async (index) => {
    const disputeReason = disputeText;
    const item = invoiceData[index];

    // Prepare the dispute data
    const disputeData = {
      dispute_id: generateDisputeId(),
      user_id: userDetails.user_id,
      invoice_id: invoiceId, // Assuming invoiceId is available
      dispute_status: "pending",
      dispute_reason: disputeReason,
      dispute_date: formatDate(new Date()),
    };

    try {
      const response = await fetch(
        "https://52xcrgi3s3.execute-api.eu-west-1.amazonaws.com/production/dispute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(disputeData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success",
          text: "Dispute submitted successfully",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-button-green",
          },
        });
        setDisputeIndex(null);
        setDisputeText(""); // Clear the text field after submission
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to submit dispute",
          icon: "error",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "swal-button-green",
          },
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting the dispute",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: "swal-button-green",
        },
      });
    }
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
                    INVOICE
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>
            <Paper
              sx={{ p: 2, marginTop: "50px", width: "100%", bgcolor: "#D16B87" }}
            >
              <Box display="flex" alignItems="center">
                <Typography sx={{ marginRight: "80px" }}>
                  Invoice: {invoiceId}
                </Typography>
                <Typography
                  sx={{ marginLeft: "30%", marginRight: "auto" }}
                >
                  Month: {month}
                </Typography>
              </Box>
              <Toolbar />
              {invoiceData.map((item, index) => (
                <Box key={index} sx={{ mt: 3 }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Date: {item.date}</Typography>
                    <Typography>Time: {item.time}</Typography>
                    <Typography>Module: {item.module}</Typography>
                    <Typography>Rate: {item.rate}</Typography>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ width: "10%", bgcolor: "Green" }}
                    >
                      Approve
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{ width: "10%", bgcolor: "Red" }}
                      onClick={() => handleDisputeClick(index)}
                    >
                      Dispute
                    </Button>
                  </Box>
                  {disputeIndex === index && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      sx={{ mt: 2 }}
                    >
                      <TextField
                        label="Dispute Reason"
                        variant="outlined"
                        value={disputeText}
                        onChange={(e) => setDisputeText(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputProps={{ style: { color: "white" } }}
                        InputLabelProps={{ style: { color: "white" } }}
                      />
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => handleDisputeSubmit(index)}
                      >
                        Submit Dispute
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
