export interface Academic {
    course: string;
    starDate: Date;
    endDate: Date;
    mark: number;
    institute: string;
  }
  
  export interface JobHistory {
    jobId: string;
    organaisation: string;
    startYear: Date;
    endYear: Date;
    role: string;
  }
  export interface Address {
    houseName: string;
    houseNUmber: string;
    streetName: string;
    city: string;
    pincode: string;
  }
  
  export interface ActiveUserStore {
    humanid?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    houseName?: string;
    houseNumber?: string;
    streetName?: string;
    city?: string;
    pincode?: string;
    fatherName?: string;
    motherName?: string;
    isAdmin?:boolean;
    active?:boolean;
    mob?: string;  
    email?: string;
    web?: string;
    role?:"user"|"trainer"|"admin"|"student";
    deleted?: boolean;
    verified?: boolean;
    profileImage?: string;
    approvedBy?: string;
    approvedDate?: Date;
    lastRevokeDate?: Date;
    password?:string,
    otp?:string,
    admin?:boolean;
    user?:boolean;
    student?:boolean;
    trainer?:boolean;
    otpVerified?:boolean;
    address?: Address[];
    academics?: Academic[];
    jobHistory?: JobHistory[];
    otpExpiresAt?:boolean;
    batchId?:string
  }
  

  export enum repeat {
    none='none',
    daily='daily',
    weekly='Weekly',
    Monthly='Monthly',
    anualy='anualy'
}
export enum audienceType{
    batch='batch',
    week = 'week',
    open = 'open',
    staff='staff',
    student='student',
    inhouse='inhouse'
}

export enum priority {
    high='high',
    low='low'
} 


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
  audience?:{};
  active?:boolean;
  deleted?:boolean;
  audienceType?:audienceType,
  prority?:priority;
  startDate?:Date  ;
  description?:string;
  dayName?:string;
  monthDay?:string;
  yearDay:string;
  matchedTasks?:object;
  createdDate?:Date;
  submissionDate?:Date;
}
