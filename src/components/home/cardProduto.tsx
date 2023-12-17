import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModalAtualizarProduto from './modais/modalAtualizarProduto';
import { formatoMonetario } from '../uteis';
import { Checkbox } from '@mui/material';
import { atualizarProdutoApi, atualizarSelecionadoProdutoApi } from '../../Api/produtoApi';
import IconeCarregando from '../iconeCarregando';
import ModalDeletarProduto from './modais/modalDeletarProduto';


export default function CardProduto(
  {id,nome, loja, marca, valor, idDoOrcamento, endeerecoDaLoja, atualizar, setAtualizar, selecionado}
   :{id:string,nome:string, loja:string, valor:number, marca:string, idDoOrcamento:string, endeerecoDaLoja:string,setAtualizar:any, atualizar:boolean, selecionado:boolean}) {
  const [loading, setLoading] = React.useState(false)
  
  const handleChecked = async(e:any)=>{
    setLoading(true)
    await atualizarSelecionadoProdutoApi(id, (selecionado === null || selecionado === false) ? true:false)
    setAtualizar(!atualizar)
    setTimeout(() => {      
      setLoading(false)
    }, 700);
  }  
  return (
    <Card sx={{ minWidth: 175, m:1 }}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        {
          loading ? 
          <div style={{padding:"11px"}}><IconeCarregando tam={20}/></div>:
          <Checkbox checked={(selecionado === null || selecionado === false) ? false:true} onChange={handleChecked}/>
        }
        <ModalDeletarProduto id={id} nome={nome} atualizar={atualizar} setAtualizar={setAtualizar}/>
      </div>
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
