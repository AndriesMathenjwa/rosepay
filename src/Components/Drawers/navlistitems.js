import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


export const mainListItems = (
  <React.Fragment>
    <Link to="/lectureh" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="INVOICES" />
      </ListItemButton>
    </Link>
    <Link to="/disputes" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ConnectWithoutContactIcon />
        </ListItemIcon>
        <ListItemText primary="DISPUTES" />
      </ListItemButton>
    </Link>

    <Link to="/picture-update" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AddAPhotoIcon />
        </ListItemIcon>
        <ListItemText primary="PICTURE UPDATE" />
      </ListItemButton>
    </Link>
    
    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="PROFILE" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

