import React, { useState, useEffect } from "react";
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
import RoomIcon from "@mui/icons-material/Room";

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
  const [classrooms, setClassrooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [editIndex, setEditIndex] = useState(null); // Index of item being edited
  const [classroomName, setClassroomName] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [floor, setFloor] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

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

  // Fetch existing classrooms from the database
  useEffect(() => {
    fetch("https://your-api-endpoint.com/classrooms")
      .then((response) => response.json())
      .then((data) => setClassrooms(data.classrooms))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCreateClick = () => {
    setShowForm(true);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleEditClick = (index) => {
    const classroom = classrooms[index];
    setClassroomName(classroom.name);
    setBuildingNumber(classroom.building);
    setFloor(classroom.floor);
    setShowForm(true);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleAddOrUpdateClassroom = () => {
    const newClassroom = {
      name: classroomName,
      building: buildingNumber,
      floor: floor,
    };

    if (isEditing && editIndex !== null) {
      // Update existing classroom
      fetch(`https://your-api-endpoint.com/classrooms/${classrooms[editIndex].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClassroom),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update classroom list with the edited classroom
          const updatedClassrooms = classrooms.map((classroom, index) =>
            index === editIndex ? data.updatedClassroom : classroom
          );
          setClassrooms(updatedClassrooms);
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      // Add new classroom
      fetch("https://your-api-endpoint.com/classrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClassroom),
      })
        .then((response) => response.json())
        .then((data) => {
          // Update classroom list with the newly created classroom
          setClassrooms([...classrooms, data.newClassroom]);
        })
        .catch((error) => console.error("Error submitting data:", error));
    }

    setShowForm(false);
    setClassroomName("");
    setBuildingNumber("");
    setFloor("");
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
                    CLASSROOMS
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>

            <Button
              variant="contained"
              onClick={handleCreateClick}
              sx={{ marginBottom: 4, marginTop: 6, alignSelf: "flex-start" }}
            >
              {isEditing ? "Update Classroom" : "Create Classroom"}
            </Button>
            <Divider/>
            {showForm && (
              <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <TextField
                  label="Classroom Name"
                  variant="outlined"
                  fullWidth
                  value={classroomName}
                  onChange={(e) => setClassroomName(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Building Number"
                  variant="outlined"
                  fullWidth
                  value={buildingNumber}
                  onChange={(e) => setBuildingNumber(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  label="Floor"
                  variant="outlined"
                  fullWidth
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddOrUpdateClassroom}
                  sx={{ width: "100%" }}
                >
                  {isEditing ? "Update Classroom" : "Add Classroom"}
                </Button>
              </Paper>
            )}

            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
              {classrooms.map((classroom, index) => (
                <ListItem
                  key={index}
                  button
                  onClick={() => handleEditClick(index)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <RoomIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Classroom: ${classroom.name}`}
                    secondary={`Building: ${classroom.building}, Floor: ${classroom.floor}`}
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
