import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ModalAtualizarProduto from './modais/modalAtualizarProduto';
import { dataFormatada, dataFormatada2, formatoMonetario } from '../uteis';
import { Checkbox, Link } from '@mui/material';
import { atualizarProdutoApi, atualizarSelecionadoProdutoApi } from '../../Api/produtoApi';
import IconeCarregando from '../iconeCarregando';
import ModalDeletarProduto from './modais/modalDeletarProduto';
import { historicoDeDatasDosProdutosType } from '../../types';
import ModalDetalhesDoProduto from './modais/modalDetalhes';


export default function CardProduto(
  {id,nome, loja, marca, dataDoPreco,valor, idDoOrcamento, nomeDoOrcamento,endeerecoDaLoja, atualizar, historico,setAtualizar, selecionado}
   :{id:string,nome:string, loja:string, valor:number, marca:string, nomeDoOrcamento:string,dataDoPreco:string,idDoOrcamento:string,endeerecoDaLoja:string,setAtualizar:any, atualizar:boolean, selecionado:boolean, historico:historicoDeDatasDosProdutosType[]}) {
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
    <Card sx={{ width: 175, m:"10px 10px 10px 0px", minHeight:300 }}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        {
          loading ? 
          <div style={{padding:"11px"}}><IconeCarregando tam={20}/></div>:
          <Checkbox checked={(selecionado === null || selecionado === false) ? false:true} onChange={handleChecked}/>
        }
        <ModalDeletarProduto id={id} nome={nome} atualizar={atualizar} setAtualizar={setAtualizar} nomeDoOrcamento={nomeDoOrcamento}/>
      </div>
      <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"290px"}}>

        <CardContent>
          <Typography variant="body1">
            {nome}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {marca}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {dataFormatada(dataDoPreco)}
          </Typography>
          <Typography sx={{ fontSize: 14  }} color="text.secondary">
            {formatoMonetario(valor)}
          </Typography>
        </CardContent>
        <CardActions sx={{pt:"auto", display:"block"}}>
          <div>
            <Typography sx={{ fontSize: 14, textAlign:"center",mb:2 }} color="text.secondary" gutterBottom>
              <Link sx={{textDecoration:"none"}} href={loja}>Ir para o site</Link>
            </Typography>
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
            <ModalDetalhesDoProduto historico={historico as historicoDeDatasDosProdutosType[]}/>
          </div>
        </CardActions>
      </div>
    </Card>
  );
}
