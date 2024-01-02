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
export const dataFormatada2 = (dataBruta:string)=>{
   const dia = dataBruta.split(" ")[2]
   const ano = dataBruta.split(" ")[3]
   const mes = dataBruta.split(" ")[1]

   return dia +"/"+mes+"/"+ano
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
   const menor = res?.reverse()
   if (arr) {
      return menor[0]?.id 
   } else {
      return ""      
   }
}

export const trocaVirgulaPorPonto = (valor:string)=>{
   const str = valor.toString()
   const  strComPonto = str.replace(",",".")
   return parseFloat(strComPonto)
}

export const emailValido = (email:string)=>{
    const regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const emailValido = regEmail.test(email);
    return emailValido;
}

export const senhaValida = (senha:string)=>{
    const regSenha = /^[a-zA-Z0-9]{5}/;
    const senhaValida = regSenha.test(senha)
    return senhaValida;
}

export const nomeValido = (nome:string)=>{
    const regNome = /^[a-zA-Z]{3}/
    const nomeValido = regNome.test(nome)
    return nomeValido;
}


export const ignoreMaiusMinusAcent = (nome:string)=>{
   return nome.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
