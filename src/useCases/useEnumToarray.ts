 

  const useEnumToArray =(enumObject: any)=>{
    try {
      const data =  Object.keys(enumObject).map((key) => ({
        id: enumObject[key],
        name: key,
      }));

      return data
    } catch (error) {
      
    }
  }

  export default useEnumToArray