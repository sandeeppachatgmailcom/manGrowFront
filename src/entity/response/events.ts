import { audienceType, priority, repeat } from "../constants/enum";

export interface Event_Model{
    eventName?:string;
    staffInCharge?:string;
    repeat?:repeat ;
    location?:string;
    timeFixed?:boolean;
    startDateTime?:string;
    endDateTime?:string;
    taskID?:string;
    eventId?:string;
    cancelled?:boolean;
    active?:boolean;
    deleted?:boolean;
    audienceType?:audienceType,
    prority?:priority;
    startDate?:Date;
    description?:string
}
