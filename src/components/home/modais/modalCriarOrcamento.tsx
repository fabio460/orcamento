import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ListItemText, TextField } from '@mui/material';
import { criarOrcamentoApi } from '../../../Api/orcamentoApi';
import IconeCarregando from '../../iconeCarregando';
export default function ModalCriarOrcamento({idDoUsuario, atualizar, setAtualizar}:{idDoUsuario:string, atualizar:boolean, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false)
  const [Nome, setNome] = useState<string>("")
  const [nomeError, setNomeError] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNomeError(false)
    setOpen(false);
  };

  const adicionar = async()=>{
    if (Nome === "".trim()) {
      setNomeError(true)
      return null
    }
    setNomeError(false)
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
                <TextField fullWidth sx={{mb:2}} size='small' error={nomeError} label={nomeError ? "Orçamento inválido" : "Nome do orçamento"} onChange={e=>setNome(e.target.value)}/>
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button disabled variant='contained' color='success' sx={{p:"6px 40px"}}><IconeCarregando tam={25}/></Button>:
            <Button onClick={adicionar}  variant='contained' color='success'>Adicionar</Button>
          }  
          <Button onClick={handleClose} autoFocus  variant='contained' color='error'>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
