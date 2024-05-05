import React from 'react';
import { useSelector } from 'react-redux';
import { DropdownMenuComponent } from '../../../entity/components/utilComponents/DropdownMenu';

const DropdownMenu: React.FC<DropdownMenuComponent> = (props) => {
    const { items, name, value, onChange } = props;
     
    const dartText = useSelector((state:any) => state.theme.inputtext);
    
    return (
        <div className="border border-gray-200  rounded h-[50px] align-middle block dropdown w-full">
            <select   name={name} value={value} className={`${dartText} h-full border w-full`} onChange={onChange}>
            <option selected  key={'select'} className='flex h-10 text-white '  > Select </option>   
                {items.map((item: any,index) => {
                 
                  return  <option className=' h-[100px] border m-1' key={index} value={item.id} selected={item.id === value}> {item.name} </option>
                })}
            </select>
        </div>
    );
};

export default DropdownMenu;
