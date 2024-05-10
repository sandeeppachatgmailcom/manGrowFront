

interface Student {
    email: string;
    startDate: Date;
    endDate: Date;
  }
  
export interface StudentsPending_Component {
        (students: Student) :any
    }