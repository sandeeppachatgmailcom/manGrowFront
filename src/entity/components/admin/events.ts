import { audienceType, priority, repeat } from "./enum";

export interface Event_Model{
    eventName?:string;
    staffInCharge?:string;
    repeat?:repeat ;
    location?:string;
    timeFixed?:boolean;
    startDateTime?:Date;
    endDateTime?:Date;
    taskID?:string;
    eventId?:string;
    cancelled?:boolean;
    active?:boolean;
    deleted?:boolean;
    audienceType?:audienceType,
    prority?:priority
}
