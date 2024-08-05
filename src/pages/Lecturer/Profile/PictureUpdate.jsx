import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_l";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import {
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Swal from "sweetalert2";
import UserMenuButton from "../../../Components/UserMenuButton";
import Webcam from "react-webcam";

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
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  textAlign: "center",
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  alignItems: "center",
}));

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [formData, setFormData] = useState({
    name: userDetails.name,
    surname: userDetails.surname,
    employeeId: userDetails.user_id,
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isWebcamOpen, setWebcamOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !userDetails ||
      (userDetails.role !== "lecturer" && userDetails.role !== "Lecturer")
    ) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  /// camera

  const handleWebcamCapture = () => {
    setWebcamOpen(true);
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setWebcamOpen(false);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setWebcamOpen(true);
  };

  const handleDialogClose = (confirm) => {
    setDialogOpen(false);
    if (confirm) {
      updateProfile();
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const updateProfile = async () => {
    const id = encodeURIComponent(formData.employeeId);
    const name = formData.name;
    const surname = formData.surname;
    const email_address = formData.email_address;
    const cell_number = formData.cell_number;
    const idnumber = formData.idnumber;
    const url = `https://gateway1.ekss.co.za/identity9.2/resources/services/enroll?AccountID=demo&AccountHash=demo@321&employeeid=${id}&name=${name}&surname=${surname}&email_address=${email_address}&cell_number=${cell_number}&idnumber=${idnumber}`;

    const data = new URLSearchParams();
    data.append("Photo", capturedImage.split(",")[1]);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Picture successfully updated:", responseData);
      Swal.fire({
        title: "Success",
        text: "Picture successfully updated!",
        icon: "success",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      setFormData({
        employeeId: "",
        capturedImage: "",
      });
    } catch (error) {
      console.error("Error updating picture:", error);
    }
    console.log("Body Data Object:", data.toString());
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
                    UPDATE PROFILE
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={() => {
                    localStorage.removeItem("userDetails");
                    navigate("/");
                  }}
                />
              </Box>
            </TabContext>
            <Toolbar />
            <Box sx={{ background: "whitesmoke", padding: 3, borderRadius: 8 }}>
              <FormContainer>
                <Box sx={{ display: "flex" }}>
                  <Typography>Click to take a Picture *</Typography>
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<AddAPhotoIcon />}
                    sx={{ ml: 2 }}
                    onClick={handleWebcamCapture}
                  >
                    Take a Picture
                  </Button>
                </Box>
                {capturedImage && (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Captured Image:
                    </Typography>
                    <img src={capturedImage} alt="Captured" width="200" />
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleRetake}
                      sx={{ mt: 2 }}
                    >
                      Retake
                    </Button>
                  </Box>
                )}
                <TextField
                  id="name"
                  label="NAME"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Andries"
                  disabled
                />
                <TextField
                  id="surname"
                  label="SURNAME"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.surname}
                  onChange={handleInputChange}
                  placeholder="mathenjwa"
                  disabled
                />

                <TextField
                  id="employeeId"
                  label="EMPLOYEE ID"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  placeholder="123...."
                  //   disabled
                />
                <TextField
                  id="email_address"
                  label="EMAIL ADRESS"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.email_address}
                  onChange={handleInputChange}
                  placeholder="a@gmail.com"
                  //   disabled
                />

                <TextField
                  id="cell_number"
                  label="CELL NUMBER"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.cell_number}
                  onChange={handleInputChange}
                  placeholder="07294...."
                  //   disabled
                />

                <TextField
                  id="idnumber"
                  label="ID NUMBER"
                  sx={{
                    bgcolor: "grey.200",
                    width: "57%",
                  }}
                  value={formData.idnumber}
                  onChange={handleInputChange}
                  placeholder="970911...."
                  //   disabled
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "30%" }}
                  onClick={() => setDialogOpen(true)}
                >
                  UPDATE PROFILE
                </Button>
              </FormContainer>
            </Box>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>

      <Dialog
        open={isWebcamOpen}
        onClose={() => setWebcamOpen(false)}
        sx={{ marginLeft: "21%" }}
      >
        <DialogTitle>Take a Picture</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Webcam
              audio={false}
              screenshotFormat="image/jpeg"
              width={300}
              ref={webcamRef}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWebcamOpen(false)}>Cancel</Button>
          <Button onClick={handleCapture} variant="contained" color="primary">
            Capture
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogOpen}
        onClose={() => handleDialogClose(false)}
        sx={{ marginLeft: "21%" }}
      >
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {capturedImage && (
              <img src={capturedImage} alt="Captured" width="200" />
            )}
            <Typography>
              Are you sure you want to update the profile?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
          <Button
            onClick={() => handleDialogClose(true)}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default Dashboard;
