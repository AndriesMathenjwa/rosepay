import React, { useState, useEffect } from "react";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Toolbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Swal from "sweetalert2";
import UserMenuButton from "../../../Components/UserMenuButton";

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
        phone: "",
        employeeId: "",
        password: "",
    });

    const [filePath, setFilePath] = useState("");
    const [isDialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch user data from API or local storage and set as placeholders
        // Placeholder example:
        setFormData({
            name: userDetails.name,
            surname: userDetails.surname,
            email: userDetails.email,
            phone: "",
            employeeId: userDetails.user_id,
            password: "",
        });
        // Placeholder profile picture path
        setFilePath("default_profile_pic.jpg"); // Replace with actual user profile picture path
    }, []);

    const postData = async () => {
        if (filePath === "default_profile_pic.jpg" || filePath === "") {
            setDialogOpen(true);
            return;
        }

        if (formData.password !== "") {
            setDialogOpen(true);
            return;
        }

        await updateProfile();
    };

    const updateProfile = async () => {
        const url =
            "https://fdvpj7kib0.execute-api.eu-west-1.amazonaws.com/production/user";

        const data = {
            user_id: formData.employeeId,
            email: formData.email,
            name: formData.name,
            surname: formData.surname,
            password: formData.password,
            phone: formData.phone,
           // role: value,
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
                text: "Profile updated successfully!",
                icon: "success",
                confirmButtonColor: "#4CAF50",
                confirmButtonText: "OK",
            });

            // Reset the form data and radio button value
            setFormData({
                name: "",
                surname: "",
                email: "",
                employeeId: "",
                password: "",
                phone: "",
            });
            setValue("");
            setFilePath("default_profile_pic.jpg");
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

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFilePath(file.name);
        } else {
            setFilePath("");
        }
    };

    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const handleDialogClose = (confirm) => {
        setDialogOpen(false);
        if (confirm) {
            updateProfile();
        }
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
                    UPDATE PROFILE
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>
                        <Toolbar />
                        <FormContainer>
                            <Box sx={{ display: "flex" }}>
                                <Typography>Click to upload Profile Picture *</Typography>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                    sx={{ ml: 2 }}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={handleFileChange}
                                    />
                                </Button>
                            </Box>
                            {filePath && (
                                <Typography variant="body2" color="textSecondary">
                                    {filePath}
                                </Typography>
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
                                placeholder="John"
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
                                placeholder="Doe"
                                disabled 
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
                                placeholder="john.doe@example.com"
                                disabled 
                            />
                            <TextField
                                id="phone"
                                label="PHONE"
                                sx={{
                                    bgcolor: "grey.200",
                                    width: "57%",
                                }}
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder=""
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
                                placeholder="123456"
                                disabled 
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
                                type="password"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ width: "30%" }}
                                onClick={postData}
                            >
                                UPDATE PROFILE
                            </Button>
                        </FormContainer>
                    </TabsContainer>
                </ContentContainer>
            </MainContainer>

            <Dialog open={isDialogOpen} onClose={() => handleDialogClose(false)}>
                <DialogTitle>Confirm Password Update</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {filePath === "default_profile_pic.jpg" || filePath === ""
                            ? "Please upload your profile picture."
                            : "Are you sure you want to update your password?"}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
                    <Button onClick={() => handleDialogClose(true)} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}
