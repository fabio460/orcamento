import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconeCarregando from '../../iconeCarregando';
import { deletarOrcamentoApi } from '../../../Api/orcamentoApi';
export default function ModalDeletarOrcamento({id,nome, atualizar, setAtualizar}:{id:string, nome:string, atualizar:boolean, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletar = async()=>{
    setLoading(true)
    await deletarOrcamentoApi(id)
    setAtualizar(!atualizar)
    setLoading(false)
    handleClose()
  }
  return (
    <React.Fragment>
      <IconButton  onClick={handleClickOpen}>
        <DeleteForeverIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deletando orçamento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar, todos os produtos do orçamento {nome} serão apagados. Tem certeza que deseja deletar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='warning' variant='contained' disabled={loading && true} onClick={deletar}>{loading?<IconeCarregando tam={20}/>:"Deletar"}</Button>
          <Button color='error' variant='contained' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
