import React,{useEffect, useState} from 'react'
import {getUsuarioAutenticadoApi } from '../../Api/authApi'
import {orcamentoType, usuarioType} from '../../types'
import {Button, IconButton} from '@mui/material'
import CardProduto from './cardProduto'
import "./index.css"
import { listarPorIdUsuarioApi } from '../../Api/usuarioApi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ModalAdicionarProduto from './modais/modalAdicionarProduto'
import { getMaisCaro, getTotal } from '../uteis'
import ModalCriarOrcamento from './modais/modalCriarOrcamento'
import ModalDeletarOrcamento from './modais/modalDeletarOrcamento'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import IconeCarregando from '../iconeCarregando'
import ModalAtualizaOrcamento from './modais/modalAtualizarOrcamento'
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
  
  let idDoMaisBarato = getMaisCaro(usuario?.orcamento as orcamentoType[]) 

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
    return <ThemeProvider theme={dark ? darkTheme:{}}>
      <CssBaseline />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
        <IconeCarregando tam={60}/>
      </div>
    </ThemeProvider>
  } else {    
    return (
      <ThemeProvider theme={dark ? darkTheme:{}}>
        <CssBaseline />
        <div className='homeContainer'>
          bem vindo {usuario?.nome}
          <Button onClick={deslogar}>sair</Button>
          <IconButton onClick={handleDarkMode}>{
            dark ? <BedtimeIcon/>:<WbSunnyIcon/>
          }</IconButton>
          <ModalCriarOrcamento idDoUsuario={usuario?.id as string} setAtualizar={setAtualizar} atualizar={atualizar}/>
          {
            usuario?.orcamento?.map((e, key)=>{
              return <div key={key} >
                <Stack direction="row" spacing={1} sx={{display:"flex", flexWrap:"wrap", width:"80vw"}}>
                  <Chip label={e.nome} />
                  <Chip label={getTotal(e.produto)} variant="outlined" />
                  <ModalAtualizaOrcamento id={e.id} idDoUsuario={e.idDoUsuario} nome={e.nome} setAtualizar={setAtualizar} atualizar={atualizar}/>
                  {e.id === idDoMaisBarato && <Chip label={"Mais barato"} variant="filled" color='success' />}
                </Stack>
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
                            dataDoPreco={p.dataDoPreco as string}
                          />
                      </div>
                    })
                  }
                  <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>            
                    <ModalAdicionarProduto id={e.id} setAtualizar={setAtualizar} atualizar={atualizar}/>
                    <ModalDeletarOrcamento id={e.id} nome={e.nome} setAtualizar={setAtualizar} atualizar={atualizar}/>
                  </div>
                </div>
              </div>
            })
          }
        </div>       
    </ThemeProvider>
    )
  }
}
