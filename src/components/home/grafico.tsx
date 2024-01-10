import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { historicoDeDatasDosProdutosType } from '../../types';
import { dataFormatada, dataFormatada2, formatoMonetario } from '../uteis';

const data = [
  { datas: '1950', preco: 2.525 },
  { datas: '1960', preco: 3.018 },
  { datas: '1970', preco: 3.682 },
  { datas: '1980', preco: 4.440 },
  { datas: '1990', preco: 5.310 },
  { datas: '2000', preco: 2.127 },
  { datas: '2010', preco: 6.930 },
  { datas: '1970', preco: 3.682 },
  { datas: '1980', preco: 4.440 },
  { datas: '1990', preco: 5.310 },
  { datas: '2000', preco: 1.127 },
  { datas: '2023', preco: 2.930 },
];

export default function Grafico({historico, dadaDoPreco, valor}:{dadaDoPreco:string, valor:number,historico:historicoDeDatasDosProdutosType[]}){

    //const { data: chartData } = this.state;
    const datas = historico.map(f=>{
      return {
        datas:dataFormatada2(f.datas),
        preco:f.preco
      }
    })
    datas.push({
      datas:dataFormatada(dadaDoPreco),
      preco:valor
    })
    // console.log(datas.sort((a,b)=>{
    //   return a.preco > b.preco ? 1 : a.preco < b.preco ? -1 : 0
    // }))
    return (
      <Paper>
        <Chart
          data={datas}
          height={350}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="preco"
            argumentField="datas"

          />
          <Title
            text="Histórico das datas"
          />
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>
    );
  
}