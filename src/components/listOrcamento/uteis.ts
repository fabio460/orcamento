import { produtoType } from "../../types"

export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
export const getTotal = (lista:produtoType[])=>{
  const res = lista.reduce((acc, e)=>{
    return acc+= e.valor as number
  },0)
  return formatoMonetario(res)
}