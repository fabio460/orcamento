import React, { PureComponent } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { historicoDeDatasDosProdutosType } from '../../types';
import { dataFormatada, dataFormatada2 } from '../uteis';

const data = [
  {
    datas: '11/12/2024',
    preco: 590,
    pv: 800,
    amt: 1400,
  },
  {
    datas: 'Page B',
    preco: 868,
    pv: 967,
    amt: 1506,
  },
  {
    datas: 'Page C',
    preco: 1397,
    pv: 1098,
    amt: 989,
  },
  {
    datas: 'Page D',
    preco: 1480,
    pv: 1200,
    amt: 1228,
  },
  {
    datas: 'Page E',
    preco: 1520,
    pv: 1108,
    amt: 1100,
  },
  {
    datas: 'Page F',
    preco: 1400,
    pv: 680,
    amt: 1700,
  },
];

export default function Grafico3({historico, dadaDoPreco, valor}:{dadaDoPreco?:string, valor?:number,historico?:historicoDeDatasDosProdutosType[]}) {
    const datas = historico?.map(f=>{
        return {
          datas:dataFormatada2(f.datas),
          preco:f.preco
        }
      })
      datas?.push({
        datas:dataFormatada(dadaDoPreco as string),
        preco:valor as number
      })
      console.log(datas)
      console.log(data)
    return (
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={datas}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="datas" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="preco" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="preco" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="preco" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
}
