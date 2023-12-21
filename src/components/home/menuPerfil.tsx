import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from '@mui/material';
import ModalAtualizarPerfil from './modais/modalAtualizarPerrfil';
import ModalDeletarPerfil from './modais/modalDeletarConta';
import { usuarioType } from '../../types';

export default function MenuPerfil({deslogar, usuario, atualizar, setAtualizar}:{deslogar:any, usuario:usuarioType, atualizar:any, setAtualizar:any}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <SettingsIcon sx={{color:"white"}}/>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <ModalAtualizarPerfil handleClosePerfil={handleClose} usuario={usuario} atualizar={atualizar} setAtualizar={setAtualizar}/>
        <ModalDeletarPerfil handleClosePerfil={handleClose} usuario={usuario}/>
        <MenuItem onClick={deslogar}>Sair</MenuItem>
      </Menu>
    </div>
  );
}
