import { orcamentoType, produtoType } from "../types"

export function formatoMonetario(valor:any){
    return valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}
export const getTotal = (lista:produtoType[])=>{
  const res = lista.reduce((acc, e)=>{
     return e.selecionado ? acc+= e.valor as number:acc+=0
  },0)
  return formatoMonetario(res)
}

export const dataFormatada = (dataBruta:string)=>{
   const data = dataBruta.split("T")[0]
   const dia = data.split("-")[2]
   const mes = data.split("-")[1]
   const ano = data.split("-")[0]
   return dia+"/"+mes+"/"+ano
}

export const getMaisCaro = (orc:orcamentoType[])=>{
   let arr:any = orc?.map(e=>{
      return {
         id:e.id,
         soma:e.produto?.reduce((acc, p)=>{
            return p.selecionado ? acc+=p.valor as number:acc+=0
         },0)
      }
   })
   let res =  arr?.sort((a:any, b:any)=>{
     return a.soma > b.soma ? -1 : a.soma < b.soma ? 1 : 0
   })
   const menor = res.reverse()
   return menor[0].id
}