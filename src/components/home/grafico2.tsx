import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { historicoDeDatasDosProdutosType } from '../../types';
import { dataFormatada, dataFormatada2 } from '../uteis';

export default function Grafico2({historico, dadaDoPreco, valor}:{dadaDoPreco?:string, valor?:number,historico?:historicoDeDatasDosProdutosType[]}) {
  let dados:historicoDeDatasDosProdutosType[] = historico || []

  const datas2 = historico?.map(f=>{
    return {
      datas:dataFormatada2(f.datas),
      preco:f.preco
    }
  })
  datas2?.push({
    datas:dataFormatada(dadaDoPreco || ""),
    preco:valor || 0
  })
  
  let datas = datas2?.map((e, k)=>{
     return e.datas
  })
  let precos = datas2?.map((e, k)=>{
    return e.preco
  })

  return (
    <LineChart
      xAxis={[{ scaleType: 'band', data: datas }]}
      series={[{ data: precos,area:true }]}
      width={500}
      height={300}
    />
  );
}
