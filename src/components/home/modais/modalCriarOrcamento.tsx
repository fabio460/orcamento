import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemText, TextField } from '@mui/material';
import { criarOrcamentoApi } from '../../../Api/orcamentoApi';
export default function ModalCriarOrcamento({idDoUsuario, atualizar, setAtualizar}:{idDoUsuario:string, atualizar:boolean, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [Nome, setNome] = useState<string>("")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adicionar = async()=>{
    setLoading(true)
    await criarOrcamentoApi(idDoUsuario, Nome)
    setAtualizar(!atualizar)
    setLoading(false)
    handleClose()
  }
  return (
    <React.Fragment>
      <ListItemText onClick={handleClickOpen} sx={{margin:"auto 1px"}}>Criar orçamneto</ListItemText>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Criando orçamento"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{p:1}} component={"div"}>             
                <TextField fullWidth sx={{mb:2}} size='small' label="Nome" onChange={e=>setNome(e.target.value)}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button>carregando</Button>:
            <Button onClick={adicionar}>Adicionar</Button>
          }  
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
