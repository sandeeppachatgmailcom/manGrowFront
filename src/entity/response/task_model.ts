export interface Task_model{
    taskId?:string;
    taskName?:string;
    taskSub?:string;
    taskDiscription?:string;
    taskLink?:string;
    taskType?:string
    repeat?:boolean;
    deleted?:boolean;
    active?:boolean;
    Validation?:boolean;
    validateBy?:string;
    series:boolean;
    nextTaskId:string
    possiblePostpone:number;
    associatedPrograms:object;
    createdDate?:Date;
    subMissionDate?:Date;
    taskDate?:Date
    }
   



    enum ActivityType {
        Reading = "Reading",
        Listening = "Listening",
        Speaking = "Speaking",
        Writing = "Writing",
        oneToOne= "OneToOne"
      }
    
    
    export interface Activity_Types{
        activityName:string;
        activityId:string;
        deleted:boolean;
        active:boolean,
        discription:string,
        type: ActivityType;
    }
    