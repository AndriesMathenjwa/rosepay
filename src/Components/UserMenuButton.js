import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";


const CircleButton = styled(Button)(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: "50%",
  minWidth: 0,
  padding: 0,
  backgroundColor: "#D81730",
  color: "#fff",
  fontWeight: "bold",
  marginBottom: "10px",

  "&:hover": {
    backgroundColor: "#aaa",
  },
}));

const UserMenuButton = ({ userDetails, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleProfileUpdate = () => {
    navigate("/profile-update"); 
  };

  return (
    <>
      <CircleButton onClick={handleMenuOpen}>
        {userDetails.name.charAt(0)}
        {userDetails.surname.charAt(0)}
      </CircleButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="inherit" display="flex" alignItems="center" onClick={handleProfileUpdate}>
            <PersonOutlineOutlinedIcon style={{ marginRight: "8px" }}  />
            {userDetails.name}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography
            variant="inherit"
            display="flex"
            alignItems="center"
            onClick={handleLogout}
          >
            <IconButton>
              <LogoutOutlinedIcon  />
            </IconButton>
            Log Out
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenuButton;
