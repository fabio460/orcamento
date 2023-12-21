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
import { trocaVirgulaPorPonto } from '../../uteis';
export default function ModalAdicionarProduto({id, atualizar, setAtualizar, nomeDoOrcamento}:{id:string, atualizar:boolean, setAtualizar:any, nomeDoOrcamento?:string}) {
  const [open, setOpen] = React.useState(false);
  const [Nome, setNome] = useState<string>("")
  const [Valor, setValor] = useState<string>("0")
  const [Endereco, setEndereco] = useState<string>("")
  const [Loja, setLoja] = useState<string>("")
  const [Marca, setMarca] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [nomeError, setNomeError] = useState(false)
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
    await criarProdutoApi(Nome, trocaVirgulaPorPonto(Valor), Loja, Marca, Endereco, id)
    setAtualizar(!atualizar)
    setLoading(false)
    setNome("")
    handleClose()
  }
  return (
    <React.Fragment>
      <IconButton onClick={handleClickOpen} ><ControlPointIcon color='success'/></IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adicione este produto ao orçamento "+nomeDoOrcamento}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{p:1}} component={"div"}>             
                <TextField fullWidth error={nomeError} sx={{mb:2}} size='small' label={nomeError?"Produto inválido":"Produto*"} onChange={e=>setNome(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Marca" onChange={e=>setMarca(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Endereço" onChange={e=>setEndereco(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Loja ou Site" onChange={e=>setLoja(e.target.value)}/>
                <TextField fullWidth sx={{mb:2}} size='small' label="Valor" onChange={e=>setValor(e.target.value)}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' variant='contained' disabled={loading && true} sx={{p:loading ? "6px 40px":""}} onClick={adicionar}>{loading?<IconeCarregando tam={20}/>:"Adicionar"}</Button>
          <Button color='error' variant='contained' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
