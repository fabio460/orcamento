import { headers } from "./headers"
import { link } from "./link"

export const logarApi = ( email:string, senha:string)=>{
    return fetch(link+"auth/logar",{
        headers:headers,
        method:"post",
        body:JSON.stringify({email, senha})
    })
    .then(r=>r.json())
}

export const autenticarApi = (token:string)=>{
    return fetch(link+"auth/autenticar",{
        headers:{
            "x-access-token":token
        },
        method:"post",
    })
    .then(r=>r.status)
}

export const getUsuarioAutenticadoApi = (token:string)=>{
    return fetch(link+"auth/autenticar",{
        headers:{
            "x-access-token":token
        },
        method:"post",
    })
    .then(r=>r.json())
}

