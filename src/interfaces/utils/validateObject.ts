interface ValidationResult {
    valid: boolean;
  }
  
  interface ValidateObjectUtils {
    validateObject(object1: any, object2: any): ValidationResult;
  }
  
  export class ValidateOBject implements ValidateObjectUtils {
    validateObject(object1: any, object2: any): ValidationResult {
        for (const key in object1) {
        
        if (typeof object1[key]!='object' && key!= 'status' && key!='message'){
        if (object1[key] !== object2[key]) {
        
          return { valid: false };
        }
      }  

      }
  
      return { valid: true };
    }
  }
  
export const validateO = new ValidateOBject()

 
  