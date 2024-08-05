import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export const mainListItems = (
  <React.Fragment>
    <Link to="/users" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="USERS" />
      </ListItemButton>
    </Link>
    <Link to="/list" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <GroupAddIcon />
        </ListItemIcon>
        <ListItemText primary="CREATE USERS" />
      </ListItemButton>
    </Link>
    <Link to="/invoices" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="INVOICES" />
      </ListItemButton>
    </Link>
    <Link to="/disputes_a" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemButton>
        <ListItemIcon>
          <ConnectWithoutContactIcon />
        </ListItemIcon>
        <ListItemText primary="DISPUTES" />
      </ListItemButton>
    </Link>

  </React.Fragment>
);

