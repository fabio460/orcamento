import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { historicoDeDatasDosProdutosType } from '../../../types';
import { dataFormatada2, formatoMonetario } from '../../uteis';
import Grafico from '../grafico';
import Grafico2 from '../grafico2';
import Grafico3 from '../grafico3';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ModalDetalhesDoProduto({historico, dadaDoPreco, valor}:{dadaDoPreco:string, valor:number,historico:historicoDeDatasDosProdutosType[]}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button fullWidth variant="outlined" onClick={handleClickOpen} sx={{mt:1}} color='secondary'>
        Detalhes
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers className='graficoBody'>
           <Grafico 
              historico={historico as historicoDeDatasDosProdutosType[]}
              dadaDoPreco={dadaDoPreco as string}
              valor={valor as number}
           />
           <Grafico2
              historico={historico as historicoDeDatasDosProdutosType[]}
              dadaDoPreco={dadaDoPreco as string}
              valor={valor as number}
           />
           <Grafico3 
              historico={historico as historicoDeDatasDosProdutosType[]}
              dadaDoPreco={dadaDoPreco as string}
              valor={valor as number}
           />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            fechar
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
