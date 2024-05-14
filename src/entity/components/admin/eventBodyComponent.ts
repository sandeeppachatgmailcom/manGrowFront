import { Event_Model } from "../../StateStore/activeUser";

export interface EventBody_Component{
    event?:Event_Model;
    position?:number;
    onChange?:any
}