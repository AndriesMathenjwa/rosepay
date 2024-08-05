import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../Components/Drawers/drawer_a";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UserMenuButton from "../../Components/UserMenuButton";

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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:1110px)");

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    employeeId: "",
    password: "",
  });

  const postData = async () => {
    if (formData.name === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your name!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#D81730",
      });
      return;
    }

    if (formData.surname === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your surname!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    if (formData.email === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your email!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    if (formData.employeeId === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your employee ID!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    if (formData.password === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter your password!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    if (value === "") {
      Swal.fire({
        title: "Error",
        text: "Please select a role!",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      return;
    }

    const url =
      "https://fdvpj7kib0.execute-api.eu-west-1.amazonaws.com/production/user";

    const data = {
      user_id: formData.employeeId,
      email: formData.email,
      name: formData.name,
      surname: formData.surname,
      password: formData.password,
      role: value,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log("Data posted successfully:", responseData);
      Swal.fire({
        title: "Success",
        text: "User successfully registered!",
        icon: "success",
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        buttonsStyling: true,
        confirmButtonColor: "#4CAF50",
      });
      setFormData({
        name: "",
        surname: "",
        email: "",
        employeeId: "",
        password: "",
      });
      setValue("");
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "employeeId") {
      setFormData({
        ...formData,
        [id]: value === "" ? "" : parseInt(value, 10),
      });
    } else {
      setFormData({ ...formData, [id]: value });
    }
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
                    CREATE USERS
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>

            <FormControl component="fieldset" sx={{ mt: "5%" }}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
                sx={{ gap: isSmallScreen ? "10px" : "80px", mb: "4%" }}
              >
                <FormControlLabel
                  value="finance"
                  control={<Radio />}
                  label="FINANCE"
                />
                <FormControlLabel
                  value="admin"
                  control={<Radio />}
                  label="ADMIN"
                />
                <FormControlLabel
                  value="lecturer"
                  control={<Radio />}
                  label="LECTURER"
                />
              </RadioGroup>
            </FormControl>

            <FormContainer>
              <TextField
                id="name"
                label="NAME"
                sx={{
                  bgcolor: "grey.200",
                  width: "57%",
                }}
                value={formData.name}
                onChange={handleInputChange}
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
              />
              <TextField
                id="email"
                label="EMAIL"
                sx={{
                  bgcolor: "grey.200",
                  width: "57%",
                }}
                value={formData.email}
                onChange={handleInputChange}
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
              />
              <TextField
                id="password"
                label="PASSWORD"
                sx={{
                  bgcolor: "grey.200",
                  width: "57%",
                }}
                value={formData.password}
                onChange={handleInputChange}
              />
              <Button
                variant="contained"
                className="customButton"
                sx={{
                  backgroundColor: "#06D001",
                  borderRadius: "25px",
                  width: "15%",
                  height: "45px",
                }}
                onClick={postData}
              >
                ADD USER
              </Button>
            </FormContainer>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
