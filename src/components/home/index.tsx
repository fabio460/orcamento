import React,{useEffect, useState} from 'react'

import {getUsuarioAutenticadoApi } from '../../Api/authApi'
import {orcamentoType, usuarioType} from '../../types'

import "./index.css"
import { listarPorIdUsuarioApi } from '../../Api/usuarioApi'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getMaisCaro } from '../uteis'

import IconeCarregando from '../iconeCarregando'
import HomeBody from './homeBody';
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
          <HomeBody
            usuario={usuario} 
            atualizar={atualizar} 
            dark={dark}
            deslogar={deslogar}
            handleDarkMode={handleDarkMode}
            idDoMaisBarato={idDoMaisBarato}
            setAtualizar={setAtualizar}
          />
   
      </ThemeProvider>
    )
  }
}





