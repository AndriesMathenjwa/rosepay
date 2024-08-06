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
  const [timetable, setTimetable] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [editIndex, setEditIndex] = useState(null); // Index of item being edited
  const [sequenceID, setSequenceID] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // Added employeeId state
  const [classroom, setClassroom] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    const item = timetable[index];
    setSequenceID(item.sequenceID);
    setModuleName(item.moduleName);
    setEmployeeId(item.employeeId);
    setClassroom(item.classroom);
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setShowForm(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleAddOrUpdateTimetable = () => {
    const newItem = {
      sequenceID,
      moduleName,
      employeeId, // Include employeeId
      classroom,
      startTime,
      endTime,
    };

    if (isEditing && editIndex !== null) {
      // Update existing timetable entry
      setTimetable(
        timetable.map((item, index) =>
          index === editIndex ? newItem : item
        )
      );
    } else {
      // Add new timetable entry
      setTimetable([...timetable, newItem]);
    }

    setShowForm(false);
    setSequenceID("");
    setModuleName("");
    setEmployeeId(""); // Reset employeeId
    setClassroom("");
    setStartTime("");
    setEndTime("");
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
                    TIME TABLE
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
              {isEditing ? "Update" : "Create"}
            </Button>
            <Divider />
            {showForm && (
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <TextField
                  label="Sequence ID"
                  variant="outlined"
                  fullWidth
                  value={sequenceID}
                  onChange={(e) => setSequenceID(e.target.value)}
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
                  label="Employee ID"
                  variant="outlined"
                  fullWidth
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)} // Added employeeId field
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Classroom"
                  variant="outlined"
                  fullWidth
                  value={classroom}
                  onChange={(e) => setClassroom(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Start Time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  sx={{ marginBottom: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateTimetable}
                  sx={{ width: "100%" }}
                >
                  {isEditing ? "Update Timetable" : "Add Timetable"}
                </Button>
              </Paper>
            )}

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              {timetable.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleEditClick(index)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <SchoolIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Module: ${item.moduleName}, Classroom: ${item.classroom}`}
                    secondary={`Sequence: ${item.sequenceID}, Employee ID: ${item.employeeId}, Time: ${item.startTime} - ${item.endTime}`} // Include employeeId in secondary text
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
