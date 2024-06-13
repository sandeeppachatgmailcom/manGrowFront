import { useEffect, useState } from "react";
import axiosApi from "../framework/api/axios";
import { utilityApis } from "../entity/constants/api";

const useContactList = (searchText: string) => {
   
  const [user, setUser] = useState([]);
  const [initalData, setInitalData] = useState([]);
  //const [tempData,setTempData] = useState()
  const fetchUser = async () => {
     
    const data = await axiosApi.get(utilityApis.listGetActiveUsers);
     
    setInitalData(data.data);
    let tempList = data.data?.filter((item) =>
      item?.firstName?.toLowerCase().startsWith(searchText.toLowerCase())
    );
    
    setUser(tempList);
  };

  useEffect(() => {
      
      let tempList = initalData?.filter((item) =>
        item?.firstName?.toLowerCase().startsWith(searchText.toLowerCase())
      );
      
      setUser(tempList);
    
  }, [searchText]);
useEffect(()=>{
  
},[user])


  useEffect(() => {
    fetchUser();
  }, []);
  return user;

  //  return searchContacts(searchText);?
};

export default useContactList;

const users = {
  newNode: {
    children: {},
    isEnd: false,
  },

  root: {
    children: {},
    isEnd: false,
  },

  addName(tempName: string) {
    const name = tempName.toLowerCase(); // Lowercase before adding
    let current = this.root;
    for (let char of name) {
      if (!current.children[char]) {
        current.children[char] = {
          children: {},
          isEnd: false,
        };
      }
      current = current.children[char];
    }
    current.isEnd = true;
  },
};
