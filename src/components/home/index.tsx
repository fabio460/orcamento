import React,{useEffect, useState} from 'react'
import {getUsuarioAutenticadoApi } from '../../Api/authApi'
import {usuarioType} from '../../types'
import {Button} from '@mui/material'
import CardProduto from './cardProduto'
import "./index.css"
import { listarPorIdUsuarioApi } from '../../Api/usuarioApi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ModalAdicionarProduto from './modais/modalAdicionarProduto'
import { getTotal } from '../uteis'
import ModalCriarOrcamento from './modais/modalCriarOrcamento'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [usuario, setusuario] = useState<usuarioType>()
  const [dark, setDark] = useState<any>(localStorage.getItem("dark") === "true" ? true:false)
  const [atualizar, setAtualizar] = useState(false)
  async function getUsuario() {
    const r = await getUsuarioAutenticadoApi(localStorage.getItem("token") as string)
    const u = await listarPorIdUsuarioApi(r.user.id)
    setusuario(u)
    setLoading(false)
  }
  const handleDarkMode = ()=>{
    setDark(!dark)
    localStorage.setItem("dark",!dark?"true":"false")
  }
  useEffect(()=>{
    getUsuario()
  },[atualizar])
  const deslogar = ()=>{
    localStorage.removeItem("token")
    window.location.reload()
  }


  if (loading) {
    return <div>carregando ...</div>
  } else {    
    return (
      <ThemeProvider theme={dark ? darkTheme:{}}>
        <CssBaseline />
        <div className='homeContainer'>
          bem vindo {usuario?.nome}
          <Button onClick={deslogar}>sair</Button>
          <Button onClick={handleDarkMode}>dark</Button>
          <ModalCriarOrcamento idDoUsuario={usuario?.id as string} setAtualizar={setAtualizar} atualizar={atualizar}/>
          {
            usuario?.orcamento?.map((e, key)=>{
              return <div key={key} >
                <h4>{e.nome} - {getTotal(e.produto)}</h4>
                <div className='listaDeProdutos'>
                  {
                    e.produto.map((p, keyP)=>{
                      return <div  key={keyP}>
                        <CardProduto 
                            id={p.id as string}
                            nome={p.nome as string} 
                            loja={p.loja as string} 
                            marca={p.marca as string} 
                            valor={p.valor as number} 
                            endeerecoDaLoja={p.endeerecoDaLoja as string} 
                            setAtualizar={setAtualizar} atualizar={atualizar}
                            idDoOrcamento={p.idDoOrcamento as string}
                            selecionado={p?.selecionado as boolean}  
                          />
                      </div>
                    })
                  }
                  <ModalAdicionarProduto id={e.id} setAtualizar={setAtualizar} atualizar={atualizar}/>
                </div>
              </div>
            })
          }
        </div>       
    </ThemeProvider>
    )
  }
}
