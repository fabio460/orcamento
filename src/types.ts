import { Router } from "express"

export type usuarioType = {
    id:string
    nome :string
    email :string
    senha :string
    orcamento:orcamentoType[]
}

export type usuarioAutenticadoType = {
    iat:number
    user:usuarioType
}

export type orcamentoType = {
    id :string 
    nome :string
    produto: produtoType[]
    idDoUsuario :string 
    precoTotal: number
}

export type historicoDeDatasDosProdutosType = {
   id:string,
   datas:string
   idDoProduto:string
   preco: number
}

export type produtoType = {
    id? :string
    nome? :string
    valor?: number
    loja? :string
    dataDoPreco? :string
    marca? :string
    endeerecoDaLoja? :string
    idDoOrcamento? :string 
    selecionado? :boolean
    historicoDeDatasDosProdutos: historicoDeDatasDosProdutosType[]
}

export type routerType={
    endpoint:string
    route:Router
}