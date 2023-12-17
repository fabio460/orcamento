import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModalAtualizarProduto from './modais/modalAtualizarProduto';
import { formatoMonetario } from '../listOrcamento/uteis';

export default function CardProduto(
  {id,nome, loja, marca, valor, idDoOrcamento, endeerecoDaLoja, atualizar, setAtualizar}
   :{id:string,nome:string, loja:string, valor:number, marca:string, idDoOrcamento:string, endeerecoDaLoja:string,setAtualizar:any, atualizar:boolean}) {
  return (
    <Card sx={{ minWidth: 275, m:1 }}>
      <CardContent>
        <Typography variant="body2">
          {nome}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {marca}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {loja}
        </Typography>
        <Typography variant="h5" component="div">
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {formatoMonetario(valor)}
        </Typography>
      </CardContent>
      <CardActions>
        <ModalAtualizarProduto
          nome={nome}
          loja={loja} 
          marca={marca} 
          valor={valor} 
          idDoOrcamento={idDoOrcamento}
          endeerecoDaLoja={endeerecoDaLoja}
          setAtualizar={setAtualizar} atualizar={atualizar as boolean}
          id={id}
        />
      </CardActions>
    </Card>
  );
}
