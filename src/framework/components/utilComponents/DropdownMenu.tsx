import React from 'react';
import { useSelector } from 'react-redux';
import { DropdownMenuComponent } from '../../../entity/components/utilComponents/DropdownMenu';

const DropdownMenu: React.FC<DropdownMenuComponent> = (props) => {
    const { items, name, value, onChange } = props;
     
    const dartText = useSelector((state:any) => state.theme.inputtext);
    
    return (
        <div className="dropdown w-full">
            <select name={name} value={value} className={`${dartText} w-full`} onChange={onChange}>
            <option selected  key={'select'}  > Select </option>   
                {items.map((item: any,index) => {
                 
                  return  <option key={index} value={item.id} selected={item.id === value}> {item.name} </option>
                })}
            </select>
        </div>
    );
};

export default DropdownMenu;
