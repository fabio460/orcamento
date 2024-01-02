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
import { dataFormatada2, formatoMonetario } from '../uteis';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.930 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.440 },
  { year: '1990', population: 5.310 },
  { year: '2000', population: 6.127 },
  { year: '2023', population: 6.930 },
];

export default function Grafico({historico}:{historico:historicoDeDatasDosProdutosType[]}){

    //const { data: chartData } = this.state;
    const datas = historico.map(f=>{
      return {
        datas:dataFormatada2(f.datas),
        preco:formatoMonetario(f.preco)
      }
    })
    return (
      <Paper>
        <Chart
          data={datas}
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