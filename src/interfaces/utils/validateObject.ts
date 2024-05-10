 
 
  export class ValidateOBject implements validateObject_Utils {
     
    
    validateObject(obj1: any, obj2: any): boolean {
      if(Object.keys(obj1).length ==Object.keys(obj2).length  ){
        for (let key in obj1){
           if( typeof(obj1[key]) !== 'object' && typeof(obj2[key]) !== 'object'  ){
               if(obj1[key] !== obj2[key])  return false
           }
           else if ( typeof(obj1[key]) == 'object' && typeof(obj2[key]) == 'object'  ){
              const result =  this.validateObject(obj1[key],obj2[key])
              if(!result) return false
           }
           else return false
        }       
     }
     else return false 
     return true
 }
  }
export const validateObj = new ValidateOBject()
 
 
  