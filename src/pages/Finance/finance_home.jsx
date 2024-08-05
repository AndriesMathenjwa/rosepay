import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../Components/Drawers/drawer_f";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

//Dropdown content
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//Table
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import UserMenuButton from "../../Components/UserMenuButton";

const defaultTheme = createTheme();

const MainContainer = styled(Box)(({ theme }) => ({
  display: "flex",
}));

const DrawerContainer = styled(Box)(({ theme }) => ({
  width: 360, // Width of the drawer
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

  //Table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#A01523",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, date, time, duration, score) {
    return { name, date, time, duration, score };
  }

  const rows_F = [
    createData("Name ", "JHB", "001", "Approved", "N/A"),
    createData("Name ", "PTA", "002", "Pending", "N/A"),
  ];

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (
      !userDetails ||
      (userDetails.role !== "finance" && userDetails.role !== "Finance")
    ) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

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
                    FINANCE
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>
            <Toolbar />
            <Accordion>
              <AccordionSummary
                sx={{ bgcolor: "#D81730", color: "primary.contrastText" }}
                expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                INVOICES
              </AccordionSummary>
              <AccordionDetails>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    JANUARY
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>Lecture Name</StyledTableCell>
                            <StyledTableCell align="right">
                              Campus
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Invoice Number
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Status
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    FEBRUARY
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    MARCH
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    APRIL
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    MAY
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    JUNE
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    JULY
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    AUGUST
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    SEPTEMBER
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    OCTOBER
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    NOVEMBER
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                    expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    DECEMBER
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>
                              Name (Assessment type)
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Date
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Time
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Duration
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              Score
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows_F.map((rows_F) => (
                            <StyledTableRow key={rows_F.name}>
                              <StyledTableCell component="th" scope="row">
                                {rows_F.name}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.date}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.time}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.duration}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {rows_F.score}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}
