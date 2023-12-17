import { headers } from "./headers"
import { link } from "./link"

export const listarUsuarioApi = ()=>{
    return fetch(link+"usuario/listar",{
        headers:headers,
    })
    .then(r=>r.json())
}

export const listarPorIdUsuarioApi = (id:string)=>{
    return fetch(link+"usuario/listarPorId/"+id,{
        headers:headers,
    })
    .then(r=>r.json())
}

export const criarUsuarioApi = (nome:string, email:string, senha:string)=>{
    return fetch(link+"usuario/criar",{
        headers:headers,
        method:"post",
        body:JSON.stringify({nome, email, senha})
    })
    .then(r=>r.json())
}

export const atualizarUsuarioApi = (id:string, nome:string, email:string, senha:string)=>{
    return fetch(link+"usuario/atualizar",{
        headers:headers,
        method:"put",
        body:JSON.stringify({id ,nome, email, senha})
    })
    .then(r=>r.json())    
}

export const deletarUsuarioApi = (id: string)=>{
    return fetch(link+"usuario/deletar",{
        headers:headers,
        method:"delete",
        body:JSON.stringify({id})
    })
    .then(r=>r.json())
}