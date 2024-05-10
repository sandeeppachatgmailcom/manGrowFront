
import React, { useState } from 'react';
import { DeepObjectComparison_UseCase } from '../entity/useCases/ObjectComparison_UseCase';

const useCompareObjects :DeepObjectComparison_UseCase = (obj1:Record<string,any>, obj2:Record<string,any>) => {
  const [isEqual, setIsEqual] = useState(false); // Initial state: objects not equal
  // Memoize the comparison result for performance optimization
  const compareObjects = React.useMemo(() => {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }

    for (const key   in obj1 ) {
      const value1:any = obj1[key]  ;
      const value2:any = obj2[key];
      if (typeof value1 !== 'object' && typeof value2 !== 'object') {
        if (value1 !== value2) {
          return false;
        }
      } else if (typeof value1 === 'object' && typeof value2 === 'object') {
        // Recursive comparison for nested objects
        const result = useCompareObjects(value1, value2);
        if (!result) {
          return false;
        }
      } else {
        return false; // Type mismatch
      }
    }

    return true;
  }, [obj1, obj2]); // Dependency array for memoization

  // Update state only when comparison results change
  
  React.useEffect(() => {
    setIsEqual(compareObjects);
  }, [compareObjects]);

  return isEqual;
};

export default useCompareObjects;

