export interface DropdownMenuComponent{
    name:string,
    value:string,
    onChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void ,
    items:{name:string,id:string}[]
}