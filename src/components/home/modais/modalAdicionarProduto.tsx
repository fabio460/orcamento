import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { IconButton, TextField } from '@mui/material';
import { criarProdutoApi } from '../../../Api/produtoApi';
import IconeCarregando from '../../iconeCarregando';
export default function ModalAdicionarProduto({id, atualizar, setAtualizar}:{id:string, atualizar:boolean, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [Nome, setNome] = useState<string>("")
  const [Valor, setValor] = useState<number>(0)
  const [Endereco, setEndereco] = useState<string>("")
  const [Loja, setLoja] = useState<string>("")
  const [Marca, setMarca] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const adicionar = async()=>{
    setLoading(true)
    await criarProdutoApi(Nome, Valor, Loja, Marca, Endereco, id)
    setAtualizar(!atualizar)
    setLoading(false)
    handleClose()
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} sx={{margin:"auto 1px"}}><ControlPointIcon/></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adicione produtos ao seu orçamento"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{p:1}} component={"div"}>             
                <TextField fullWidth sx={{mb:2}} size='small' label="Nome" onChange={e=>setNome(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Marca" onChange={e=>setMarca(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Endereço" onChange={e=>setEndereco(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Loja" onChange={e=>setLoja(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Valor" onChange={e=>setValor(parseFloat(e.target.value))}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading && true} onClick={adicionar}>{loading?<IconeCarregando tam={20}/>:"Atualizar"}</Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
