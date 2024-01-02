import React,{  } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {CssBaseline} from '@mui/material'
import CardProduto from './cardProduto'
import ModalCriarOrcamento from './modais/modalCriarOrcamento'
import ModalDeletarOrcamento from './modais/modalDeletarOrcamento'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModalAtualizaOrcamento from './modais/modalAtualizarOrcamento'
import ModalAdicionarProduto from './modais/modalAdicionarProduto'
import { usuarioType } from '../../types';
import { getTotal } from "../uteis";
import AppBarContainer from "./appBar";
import MenuPerfil from "./menuPerfil";


const drawerWidth = 240;

export default function HomeBody(
        {props, usuario, handleDarkMode, dark, setAtualizar, idDoMaisBarato, deslogar, atualizar}:
        {props?:any, usuario?:usuarioType, handleDarkMode?:any, dark?:any,setAtualizar?:any, idDoMaisBarato?:any, deslogar?:any, atualizar:any}
    ) 
    {
          const navItems:any = [
            <ListItemText onClick={handleDarkMode}>{dark ? <BedtimeIcon/>:<WbSunnyIcon/>}</ListItemText>,
            <ModalCriarOrcamento idDoUsuario={usuario?.id as string} setAtualizar={setAtualizar} atualizar={atualizar}/>,
            <MenuPerfil deslogar={deslogar} usuario={usuario as usuarioType} atualizar={atualizar} setAtualizar={setAtualizar}/>
          ];
          const  window  = props;
          const [mobileOpen, setMobileOpen] = React.useState(false);
          
          const handleDrawerToggle = () => {
              setMobileOpen((prevState) => !prevState);
            };
            
          const drawer = (
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} component={"div"}>
              <div>

                <Typography variant="h6" sx={{ my: 2 }}>
                  <div>bem vindo {usuario?.nome}</div>
                </Typography>
                <Divider />
                <List>
                  {navItems.map((item:any, keynav:number) => (
                    <ListItem key={keynav} disablePadding>
                      <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Box>
          );
  
    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
         <AppBarContainer navItems={navItems} handleDrawerToggle={handleDrawerToggle} usuario={usuario} />
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            component={"div"}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" className="BoxStyle">
          <Toolbar />
          <div className='homeContainer' >
              {
                usuario?.orcamento?.map((e, key)=>{
                  return <div key={key} >
                    <Stack direction="row" spacing={1} className="headerHomeBody" sx={{display:"flex", flexWrap:"wrap", width:"80vw"}}>
                      <Chip sx={{margin:1}} label={e.nome} />
                      <Chip sx={{margin:1}} label={getTotal(e.produto)} variant="outlined" />
                      <ModalAtualizaOrcamento id={e.id} idDoUsuario={e.idDoUsuario} nome={e.nome} setAtualizar={setAtualizar} atualizar={atualizar}/>
                      {e.id === idDoMaisBarato && <Chip sx={{margin:1}} label={"Mais barato"} variant="filled" color='success' />}
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
                                nomeDoOrcamento={e.nome as string}
                                historico={p.historicoDeDatasDosProdutos}
                              />
                          </div>
                        })
                      }
                      <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>            
                        <ModalAdicionarProduto id={e.id} setAtualizar={setAtualizar} atualizar={atualizar} nomeDoOrcamento={e.nome as string}/>
                        <ModalDeletarOrcamento id={e.id} nome={e.nome} setAtualizar={setAtualizar} atualizar={atualizar}/>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>       
        </Box>
      </Box>
    );
  }
  