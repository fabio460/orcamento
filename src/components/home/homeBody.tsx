import React,{  } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Button, CssBaseline, IconButton, MenuItem} from '@mui/material'
import CardProduto from './cardProduto'
import ModalCriarOrcamento from './modais/modalCriarOrcamento'
import ModalDeletarOrcamento from './modais/modalDeletarOrcamento'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModalAtualizaOrcamento from './modais/modalAtualizarOrcamento'
import ModalAdicionarProduto from './modais/modalAdicionarProduto'
import { usuarioType } from '../../types';
import { getTotal } from "../uteis";


interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
    */
   window?: () => Window;
}

const drawerWidth = 240;

export default function HomeBody(
        {props, usuario, handleDarkMode, dark, setAtualizar, idDoMaisBarato, deslogar, atualizar}:
        {props?:any, usuario?:usuarioType, handleDarkMode?:any, dark?:any,setAtualizar?:any, idDoMaisBarato?:any, deslogar?:any, atualizar:any}
    ) 
    {
          const navItems:any = [
            <ListItemText onClick={handleDarkMode}>{dark ? <BedtimeIcon/>:<WbSunnyIcon/>}</ListItemText>,
            <ModalCriarOrcamento idDoUsuario={usuario?.id as string} setAtualizar={setAtualizar} atualizar={atualizar}/>,
            <ListItemText onClick={deslogar}>sair</ListItemText>
          ];
          const  window  = props;
          const [mobileOpen, setMobileOpen] = React.useState(false);
          
          const handleDrawerToggle = () => {
              setMobileOpen((prevState) => !prevState);
            };
            
            const drawer = (
                <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
           <div>bem vindo {usuario?.nome}</div>
        </Typography>
        <Divider />
        <List>
          {navItems.map((item:any) => (
            <ListItem key={item} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    const container = window !== undefined ? () => window().document.body : undefined;
  
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
                <div>bem vindo {usuario?.nome}</div>
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item:any) => (
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
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
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3, width:"100%" }}>
          <Toolbar />
          <div className='homeContainer' >
              {
                usuario?.orcamento?.map((e, key)=>{
                  return <div key={key} >
                    <Stack direction="row" spacing={1} sx={{display:"flex", flexWrap:"wrap", width:"80vw"}}>
                      <Chip sx={{margin:4}} label={e.nome} />
                      <Chip sx={{margin:4}} label={getTotal(e.produto)} variant="outlined" />
                      <ModalAtualizaOrcamento id={e.id} idDoUsuario={e.idDoUsuario} nome={e.nome} setAtualizar={setAtualizar} atualizar={atualizar}/>
                      {e.id === idDoMaisBarato && <Chip sx={{margin:4}} label={"Mais barato"} variant="filled" color='success' />}
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
        </Box>
      </Box>
    );
  }
  