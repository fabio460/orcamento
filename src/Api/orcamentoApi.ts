import { headers } from "./headers"
import { link } from "./link"

export const listarOrcamentoApi = ()=>{
    return fetch(link+"orcamento/listar",{
        headers:headers,
    })
    .then(r=>r.json())
}

export const listarPorIdOrcamentoApi = (id:string)=>{
    return fetch(link+"orcamento/listarPorId/"+id,{
        headers:headers,
    })
    .then(r=>r.json())
}

export const criarOrcamentoApi = (idDoUsuario:string, nome:string)=>{
    return fetch(link+"orcamento/criar",{
        headers:headers,
        method:"post",
        body:JSON.stringify({nome, idDoUsuario})
    })
    .then(r=>r.json())
}

export const atualizarOrcamentoApi = (id:string, idDoUsuario:string, nome:string)=>{
    return fetch(link+"orcamento/atualizar",{
        headers:headers,
        method:"put",
        body:JSON.stringify({id,nome, idDoUsuario})
    })
    .then(r=>r.json()) 
}

export const deletarOrcamentoApi = (id: string)=>{
    return fetch(link+"orcamento/deletar",{
        headers:headers,
        method:"delete",
        body:JSON.stringify({id})
    })
    .then(r=>r.json())
}