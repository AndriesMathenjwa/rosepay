import * as React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  Link, // <-- Import Link here
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Rose from "../../Images/Rosey.svg";
import "../../styles.css";

// corausen lgin
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import P1 from "../../Images/charles-deloye-2RouMSg9Rnw-unsplash.jpg.jpg";
import P2 from "../../Images/picture2.png";
import P3 from "../../Images/honey-yanibel-minaya-cruz-laORtJZaieU-unsplash.jpg.jpg";
import Paper from "@mui/material/Paper";
// ---------------------------------------------------------

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        RoseBank
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignIn() {
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const [blinkError, setBlinkError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      user_id: parseInt(data.get("Employee_ID")),
      password: data.get("password"),
    };

    try {
      const response = await fetch(
        "https://fdvpj7kib0.execute-api.eu-west-1.amazonaws.com/production/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("userDetails", JSON.stringify(result.UserDetails));
        if (result.UserDetails && result.UserDetails.role) {
          const userRole = result.UserDetails.role.toLowerCase();

          Swal.fire({
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          });

          switch (userRole) {
            case "admin":
              navigate("/users");
              break;
            case "lecturer":
              navigate("/lectureh");
              break;
            case "finance":
              navigate("/finance");
              break;
            default:
              console.warn("Unknown role:", userRole);
              break;
          }
        }
      } else {
        setErrorMessage("Invalid user Id or Password");
        setBlinkError(true);
        setTimeout(() => {
          setErrorMessage("");
          setBlinkError(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setBlinkError(true);
      setTimeout(() => {
        setErrorMessage("");
        setBlinkError(false);
      }, 5000);
    }
  };

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

  return (
    <ThemeProvider theme={Rosetheme}>
      <CssBaseline />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          interval={5000}
        >
          <div>
            <img src={P3} alt="Slide 1" />
          </div>
          <div>
            <img src={P1} alt="Slide 2" />
          </div>
          <div>
            <img src={P2} alt="Slide 3" />
          </div>
        </Carousel>
      </Box>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ position: "relative", zIndex: 1 }}
      >
        {/* <CssBaseline /> */}

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{ padding: 3, width: "100%", textAlign: "center" }}
          >
            <Box>
              <img
                src={Rose}
                alt="Logo"
                style={{ width: "150px", height: "150px" }}
              />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="Employee_ID"
                label="Employee ID"
                name="Employee_ID"
                autoComplete="Employee_ID"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {errorMessage && (
                <Typography
                  className={blinkError ? "blink blink-show" : "blink"}
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#D81730",
                  }}
                  paragraph
                >
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
