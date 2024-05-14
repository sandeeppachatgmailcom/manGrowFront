 

  const useEnumToArray =(enumObject: any)=>{
    const data =  Object.keys(enumObject).map((key) => ({
        id: enumObject[key],
        name: key,
      }));

      return data
  }

  export default useEnumToArray