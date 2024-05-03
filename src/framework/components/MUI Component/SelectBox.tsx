import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MuiBasicSelect(props:{name:string,value:any,onChange:any,items:any}) {
  
  const [options,setOptions] = React.useState<any>()  
  

   
  React.useEffect(()=>{
    setOptions(props.items)
    console.log(props.items,'props.items,')
  },[props.items])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.name}
          name={props.name}
          onChange={  props.onChange }
        >
          {options?.map((item:any)=>(
            <MenuItem selected={props.value==item.id?true:false} value={item?.id }>{item?.name}</MenuItem>
          ))}
          
           
        </Select>
      </FormControl>
    </Box>
  );
}