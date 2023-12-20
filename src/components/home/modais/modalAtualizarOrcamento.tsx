import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { Chip, IconButton, TextField } from '@mui/material';
import { atualizarOrcamentoApi } from '../../../Api/orcamentoApi';
import IconeCarregando from '../../iconeCarregando';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAtualizaOrcamento({id, idDoUsuario,nome, atualizar, setAtualizar}:{id:string, idDoUsuario:string, nome:string, atualizar:boolean, setAtualizar:any}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const [Nome, setNome] = React.useState("")
  const [nomeError, setNomeError] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNomeError(false)
    setOpen(false);
  };
//   React.useEffect(()=>{
//     setNome(nome)
//   },[])
  const atualizarOrcamento = async()=>{
    if (Nome === "".trim()) {
      setNomeError(true)
      return null
    }
    setNomeError(false)
    setLoading(true)
    await atualizarOrcamentoApi(id, idDoUsuario,Nome)
    setAtualizar(!atualizar)
    setLoading(false)
    handleClose()
  }

  return (
    <React.Fragment>
      <Chip sx={{margin:"30px 0px"}} label={loading? <div ><IconeCarregando tam={20}/></div>: "Atualizar orçamento"} variant="outlined" onClick={handleClickOpen} />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Atualizar orçamento"}</DialogTitle>
        <DialogContent >
          <DialogContentText sx={{p:"10px 0px"}} id="alert-dialog-slide-description" component={"div"}>
            <TextField error={nomeError} label={nomeError ? "Nome do orçamento" : "Orçamento inválido"} defaultValue={nome} onChange={e=>setNome(e.target.value)} fullWidth size='small'/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={atualizarOrcamento} variant='contained' color='success'>
            {
                loading? <div style={{margin:"0px 30px"}}><IconeCarregando tam={25}/></div>:"Confirmar"
            }
          </Button>
          <Button variant='contained' color='error' onClick={handleClose}>cancelar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
