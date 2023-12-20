import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem, TextField } from '@mui/material';
import IconeCarregando from '../../iconeCarregando';
import { usuarioType } from '../../../types';
import { atualizarUsuarioApi } from '../../../Api/usuarioApi';

export default function ModalAtualizarPerfil({handleClosePerfil, usuario, atualizar, setAtualizar}:{handleClosePerfil:any, usuario:usuarioType, atualizar:any, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false)
  const [nome, setNome] = React.useState<string>(usuario.nome)
  const [senha, setSenha] = React.useState(usuario.senha)
  const [email, setEmail] = React.useState(usuario.email)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClosePerfil()
  };
  
  const atualizarPerfil = async()=>{
     setloading(true)
     const res = await atualizarUsuarioApi(usuario.id, nome,email, senha)
     alert(JSON.stringify(res))
     setAtualizar(!atualizar)
     setloading(false)
     handleClose()
  }
  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>Atualizar Perfil</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atualizar perfil"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{p:1}} component={"div"} id="alert-dialog-description">
             <TextField label="Nome" defaultValue={usuario.nome} fullWidth size='small' onChange={e=>setNome(e.target.value)}/>
             <TextField label="Email" defaultValue={usuario.email} fullWidth size='small' onChange={e=>setEmail(e.target.value)} sx={{m:"15px 0px"}}/>
             <TextField label="Senha" defaultValue={usuario.senha} fullWidth size='small' onChange={e=>setSenha(e.target.value)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizarPerfil} disabled={loading?true:false} variant='contained' color='success'>
            {
              loading? <IconeCarregando sx={{m:"1px 30px"}} tam={25}/>:" Confirmar"
            }
          </Button>
          <Button onClick={handleClose} autoFocus variant='contained' color='error'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
