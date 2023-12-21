import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { usuarioType } from '../../types'

export default function AppBarContainer({handleDrawerToggle, usuario, navItems}:{handleDrawerToggle?:any, navItems:[],usuario?:usuarioType}) {
  return (
    <AppBar component="nav">
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
          <div>bem vindo {usuario?.nome}</div>
      </Typography>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems:"center" }}>
        {
          navItems.map((item:any, key:number) => {
           return <div key={key}>
            <MenuItem  style={{ color: '#fff' }}>
              {item}
            </MenuItem>
           </div> 
          })
        }
      </Box>
    </Toolbar>
  </AppBar>
  )
}
