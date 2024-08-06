import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_a";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Divider, Paper, TextField, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import UserMenuButton from "../../../Components/UserMenuButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";

const Rosetheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D81730", // Border color when focused
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D81730", // Border color when focused
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#D81730", // Label color when focused
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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [editIndex, setEditIndex] = useState(null); // Index of item being edited
  const [sequenceNumber, setSequenceNumber] = useState("");
  const [courseName, setCourseName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  const handleCreateClick = () => {
    setShowForm(true);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEditClick = (index) => {
    const course = courses[index];
    setSequenceNumber(course.sequenceNumber);
    setCourseName(course.courseName);
    setModuleName(course.moduleName);
    setLectureName(course.lectureName);
    setEmployeeId(course.employeeId);
    setShowForm(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleAddOrUpdateCourse = () => {
    if (isEditing && editIndex !== null) {
      // Update existing course
      const updatedCourses = courses.map((course, index) =>
        index === editIndex
          ? {
              sequenceNumber,
              courseName,
              moduleName,
              lectureName,
              employeeId,
            }
          : course
      );
      setCourses(updatedCourses);
    } else {
      // Add new course
      setCourses([
        ...courses,
        {
          sequenceNumber,
          courseName,
          moduleName,
          lectureName,
          employeeId,
        },
      ]);
    }
    setShowForm(false);
    setSequenceNumber("");
    setCourseName("");
    setModuleName("");
    setLectureName("");
    setEmployeeId("");
    setIsEditing(false);
    setEditIndex(null);
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
                    COURSES
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

            <Button
              variant="contained"
              onClick={handleCreateClick}
              sx={{ marginBottom: 4, marginTop: 6, alignSelf: "flex-start" }} // Moved down by adding marginTop
            >
              {isEditing ? "Update Course" : "Create Course"}
            </Button>
            <Divider />
            {showForm && (
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <TextField
                  label="Sequence Number"
                  variant="outlined"
                  fullWidth
                  value={sequenceNumber}
                  onChange={(e) => setSequenceNumber(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Course Name"
                  variant="outlined"
                  fullWidth
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Module Name"
                  variant="outlined"
                  fullWidth
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Lecture Name"
                  variant="outlined"
                  fullWidth
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateCourse}
                  sx={{ width: "100%" }}
                >
                  {isEditing ? "Update Course" : "Add Course"}
                </Button>
              </Paper>
            )}

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              {courses.map((course, index) => (
                <ListItem key={index} button onClick={() => handleEditClick(index)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Course: ${course.courseName}`}
                    secondary={`Sequence: ${course.sequenceNumber}, Module: ${course.moduleName}, Lecture: ${course.lectureName}`}
                  />
                </ListItem>
              ))}
            </List>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
