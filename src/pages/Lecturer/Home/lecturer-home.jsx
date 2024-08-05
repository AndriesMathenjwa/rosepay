import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Drawer from "../../../Components/Drawers/drawer_l";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TableContainer from "@mui/material/TableContainer";
import { Link } from "react-router-dom";
import UserMenuButton from "../../../Components/UserMenuButton";

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

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const id = userDetails.user_id;

  useEffect(() => {
    fetch(
      `https://cn6gihz1g2.execute-api.eu-west-1.amazonaws.com/production/user_invoice?user_id=${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched invoice:", data);
        setInvoices(data);
      })
      .catch((error) => console.error("Error fetching invoice:", error));
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const groupInvoicesByMonth = (invoices) => {
    const groupedInvoices = {};
    invoices.forEach((invoice) => {
      const month = new Date(invoice.generated_date).getMonth();
      if (!groupedInvoices[month]) {
        groupedInvoices[month] = [];
      }
      groupedInvoices[month].push(invoice);
    });
    return groupedInvoices;
  };

  const groupedInvoices = groupInvoicesByMonth(invoices);

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
                    INVOICES
                  </Typography>
                </TabList>
                <UserMenuButton
                  userDetails={userDetails}
                  handleLogout={handleLogout}
                />
              </Box>
            </TabContext>

            {months.map((monthName, index) => (
              <Accordion key={monthName}>
                <AccordionSummary
                  sx={{ bgcolor: "#292122", color: "primary.contrastText" }}
                  expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  {monthName}
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    {groupedInvoices[index] && groupedInvoices[index].length > 0 ? (
                      groupedInvoices[index].map((invoice, idx) => (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          key={idx}
                        >
                          <Link
                            to={{
                              pathname: "/invoice_lecture",
                              state: { invoiceId: invoice.invoice_id, month: monthName },
                            }}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography sx={{ marginRight: "80px" }}>
                              Invoice: {invoice.invoice_id}
                            </Typography>
                          </Link>
                          <Typography sx={{ marginLeft: "80px" }}>
                            Date: {invoice.generated_date}
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography>No invoices for this month</Typography>
                    )}
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </TabsContainer>
        </ContentContainer>
      </MainContainer>
    </ThemeProvider>
  );
}