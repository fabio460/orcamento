import  React,{useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Checkbox, Typography } from '@mui/material';
import { elementType } from './types';
import ModalUpdate from './modalUpdate';
import { formatoMonetario } from './uteis';
import { useAppDispatch } from '../../redux/hooks';
import { setCheckBox } from '../../redux/reducers/checkBoxReducer';
import { setCheckBox2 } from '../../redux/reducers/checkBoxReducer2';
import { setCheckBox3 } from '../../redux/reducers/checkBoxReducer3';


export default function Cards({element, remove, list, listName,check=true, setList}:{element:elementType,check?:boolean,list: elementType[], listName:string, setList:any,remove:any}){
  const dis = useAppDispatch()
  const handleChecked = (e:any)=>{
     check=e.target.checked
     let checkBoxSelected = {
      id:element.id as string,
      checked:e.target.checked
     }
     if (listName === "list") {
       dis(setCheckBox(checkBoxSelected))
     }
     if (listName === "list2") {
      dis(setCheckBox2(checkBoxSelected))
     }
     if (listName === "list3") {
      dis(setCheckBox3(checkBoxSelected))
     }
  }
  return (
    <Card sx={{m:1, width:"250px", height:"270px", display:"flex", flexDirection:"column", justifyContent:"space-between"
    }}>
      <CardContent>
        <div style={{display:"flex", justifyContent:"flex-end"}}><Checkbox onChange={handleChecked} sx={{padding:0}} defaultChecked={true}/></div>
        <Typography>{element.name}</Typography>    
        <Typography>{element.model}</Typography> 
        <Typography>Loja - {element.store}</Typography>    
        <Typography>Valor {formatoMonetario(element.value)}</Typography>    
      </CardContent>
      <div>
        <CardActions sx={{m:0,p:"4px 5px"}}>
          <ModalUpdate element={element} list={list} setList={setList} listName={listName}/>
        </CardActions>
        <CardActions sx={{m:0,p:"4px 5px"}}>
          <Button fullWidth variant='outlined' color='error' onClick={remove}>remover</Button>
        </CardActions>
      </div>
    </Card>
  );
}
