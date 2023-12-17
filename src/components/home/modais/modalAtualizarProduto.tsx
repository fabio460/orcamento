import  React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { atualizarProdutoApi } from '../../../Api/produtoApi';


export default function ModalAtualizarProduto(
    {nome, id,endeerecoDaLoja, loja, marca, valor, idDoOrcamento,atualizar, setAtualizar}
   :{id:string ,nome:string, loja:string, valor:number, marca:string, idDoOrcamento:string, endeerecoDaLoja:string,setAtualizar:any, atualizar:boolean}) {
  const [open, setOpen] = React.useState(false);
  const [Nome, setNome] = useState<string>(nome as string)
  const [Valor, setValor] = useState<number>(valor as number)
  const [Endereco, setEndereco] = useState<string>(endeerecoDaLoja as string)
  const [Loja, setLoja] = useState<string>(loja as string)
  const [Marca, setMarca] = useState(marca as string)
  const [loading, setLoading] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const confirm = async()=>{
    setLoading(true)
    await atualizarProdutoApi(id, Nome, Valor, Loja, Marca, Endereco, idDoOrcamento)
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
               label="Nome do produto" 
               variant="outlined"
               size='small'
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
               label="Loja" 
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
               defaultValue={loja}
               onChange={e=> setEndereco(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="valor" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={valor}
               onChange={e=> setValor(parseFloat(e.target.value))}
               sx={{mb:1}}
             />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            loading?
            <Button>carregando</Button>:
            <Button onClick={confirm}>confirmar</Button>
          }
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
