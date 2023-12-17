import  React,{useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { elementType } from './types';
import TextField from '@mui/material/TextField';
import { useAppDispatch } from '../../redux/hooks';
import { getProduct } from '../../redux/reducers/productSelected';

export default function ModalUpdate({element, list, listName, setList}:{element:elementType, list:elementType[], listName:string, setList:any}) {
  const [open, setOpen] = React.useState(false);
  const [name, setname] = useState<string>(element.name as string)
  const [value, setvalue] = useState<number>(element.value as number)
  const [model, setmodel] = useState<string>(element.model as string)
  const [store, setstore] = useState<string>(element.store as string)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   
  const confirm = ()=>{
    const pos = list.findIndex(e=>{
      return e.id === element.id
    })

     let aux = list
     aux[pos] = {
      name,
      model,
      value,
      store,
      id:element.id
     }
     setList([])
     setTimeout(() => {
       setList(aux) 
       localStorage.setItem(listName, JSON.stringify(aux))
       handleClose()
     }, 100);
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
               defaultValue={element.name}
               onChange={e=> setname(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="Modelo" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={element.model}
               onChange={e=> setmodel(e.target.value)}
               sx={{mb:1}}
             />
             <TextField 
               label="Loja" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={element.store}
               onChange={e=> setstore(e.target.value)}
               sx={{mb:1}}
             />
            <TextField 
               label="valor" 
               variant="outlined"
               size='small'
               fullWidth
               defaultValue={element.value}
               onChange={e=> setvalue(parseFloat(e.target.value))}
               sx={{mb:1}}
             />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirm}>confirmar</Button>
          <Button onClick={handleClose} autoFocus>
            cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
