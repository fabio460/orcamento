import { headers } from "./headers"
import { link } from "./link"

export const listarProdutoApi = ()=>{
    return fetch(link+"produto/listar/",{
        headers:headers,
    })
    .then(r=>r.json())
}

export const listarPorIdProdutoApi = (id:string)=>{
    return fetch(link+"produto/listarPorId/"+id,{
        headers:headers,
    })
    .then(r=>r.json())
}

export const criarProdutoApi = (nome:string, valor:number, loja:string, marca:string, endeerecoDaLoja:string, idDoOrcamento:string)=>{
    return fetch(link+"produto/criar",{
        headers:headers,
        method:"post",
        body:JSON.stringify({nome, idDoOrcamento, valor, loja, marca, endeerecoDaLoja})
    })
    .then(r=>r.json()) 
}

export const atualizarProdutoApi = (id:string, nome:string, valor:number, loja:string, marca:string, endeerecoDaLoja:string, idDoOrcamento:string)=>{
    return fetch(link+"produto/atualizar",{
        headers:headers,
        method:"put",
        body:JSON.stringify({id,nome, idDoOrcamento, valor, loja, marca, endeerecoDaLoja})
    })
    .then(r=>r.json()) 
}

export const atualizarSelecionadoProdutoApi = (id:string, selecionado:boolean)=>{
    return fetch(link+"produto/selecionar",{
        headers:headers,
        method:"put",
        body:JSON.stringify({id,selecionado})
    })
    .then(r=>r.json()) 
}

export const deletarProdutoApi = (id:string)=>{
    return fetch(link+"produto/deletar",{
        headers:headers,
        method:"delete",
        body:JSON.stringify({id})
    })
    .then(r=>r.json()) 
}