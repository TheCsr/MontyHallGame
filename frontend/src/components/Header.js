import { AppBar, Toolbar, IconButton, Typography, Box} from "@mui/material";
import ExtensionIcon from '@mui/icons-material/Extension';
import React from "react";

export default function Header() {
  

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ExtensionIcon />
          </IconButton>
          <Typography variant="h5" component="div" >
            Monty Hall Game Show
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}