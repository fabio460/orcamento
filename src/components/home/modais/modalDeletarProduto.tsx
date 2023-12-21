import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';
import IconeCarregando from '../../iconeCarregando';
import { deletarProdutoApi } from '../../../Api/produtoApi';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDeletarProduto({id, nome, atualizar, nomeDoOrcamento,setAtualizar}:{id:string, nomeDoOrcamento:string,nome:string, atualizar?:boolean, setAtualizar?:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmar = async()=>{
    setLoading(true)
    await deletarProdutoApi(id)
    setAtualizar(!atualizar)
    handleClose()
  }

  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen}>
        <DeleteOutlineIcon color='primary'/>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Deletar produto"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
               Deseja deletar o produto {nome} do orçamento {nomeDoOrcamento}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='success' disabled={loading?true:false} onClick={confirmar}>
            {
                loading ? <div style={{margin:"0px 25px"}}><IconeCarregando tam={25}/></div> : "Confirmar"
            }
          </Button>
          <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
