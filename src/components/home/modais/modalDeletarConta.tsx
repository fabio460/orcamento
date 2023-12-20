import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import IconeCarregando from '../../iconeCarregando';
import { usuarioType } from '../../../types';
import { deletarUsuarioApi } from '../../../Api/usuarioApi';


export default function ModalDeletarPerfil({handleClosePerfil, usuario}:{handleClosePerfil:any, usuario:usuarioType}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleClosePerfil()
  };

  const deletar = async()=>{
    setloading(true)
    const res =  await deletarUsuarioApi(usuario.id)
    alert(JSON.stringify(res))
    localStorage.removeItem("token")
    window.location.reload()
  }
  return (
    <React.Fragment>
      <MenuItem onClick={handleClickOpen}>Deletar conta</MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" component={"div"} sx={{display:"flex", justifyContent:"space-between"}}>
          <div>{"Deletar conta?"}</div>
          <HighlightOffIcon color="error" sx={{width:"40px", height:"40px"}}/>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar, o seu perfil será removido junto com todos os seus dados.
            Esta ação não poderá mais ser revertida. Se estiver certo disso, clique em confirmar! 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletar} disabled={loading?true:false} variant='contained' color='success'>
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
