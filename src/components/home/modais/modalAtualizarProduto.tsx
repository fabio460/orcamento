import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { atualizarProdutoApi } from '../../../Api/produtoApi';
import IconeCarregando from '../../iconeCarregando';
import { trocaVirgulaPorPonto } from '../../uteis';


export default function ModalAtualizarProduto(
    {nome, id,endeerecoDaLoja, loja, marca, valor, idDoOrcamento,atualizar, setAtualizar}
   :{id:string ,nome:string, loja:string, valor:number, marca:string, idDoOrcamento:string, endeerecoDaLoja:string,setAtualizar:any, atualizar:boolean}) {
  const [open, setOpen] = React.useState(false);
  const [Nome, setNome] = useState<string>(nome as string)
  const [Valor, setValor] = useState<string>(valor.toString())
  const [Endereco, setEndereco] = useState<string>(endeerecoDaLoja as string)
  const [Loja, setLoja] = useState<string>(loja as string)
  const [Marca, setMarca] = useState(marca as string)
  const [loading, setLoading] = useState(false)
  const [nomeError, setNomeError] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNomeError(false)
  };
   
  const confirm = async()=>{
    if (Nome === "".trim()) {
      setNomeError(true)
      return null
    }
    setNomeError(false)
    setLoading(true)
    await atualizarProdutoApi(id, Nome, trocaVirgulaPorPonto(Valor), Loja, Marca, Endereco, idDoOrcamento)
    setAtualizar(!atualizar)
    setLoading(false)
    handleClose()
  }
  
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        atualizar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Atualizando dados do produto"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{p:1}} component={"div"}>
            <TextField 
               label={nomeError ? "Produto inválido" : "Nome do produto" }
               variant="outlined"
               size='small'
               error={nomeError}
               fullWidth
               defaultValue={nome}
               onChange={e=> setNome(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="Marca" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={marca}
               onChange={e=> setMarca(e.target.value)}
               sx={{mb:1}}
             />
             <TextField 
               label="Link do site" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={loja}
               onChange={e=> setLoja(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="Endereço" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={endeerecoDaLoja}
               onChange={e=> setEndereco(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="valor" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={valor}
               onChange={e=> setValor(e.target.value)}
               sx={{mb:1}}
             />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='success' variant='contained' disabled={loading && true} onClick={confirm}>
            {loading? <div style={{margin:"0px 25px"}}><IconeCarregando tam={20}/></div> :"Confirmar"}
          </Button>
          <Button color='error' variant='contained' onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
