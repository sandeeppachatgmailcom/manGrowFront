import { useEffect, useState } from "react";
import axiosApi from "../framework/api/axios";
import { utilityApis } from "../entity/constants/api";

const useContactList = (searchText: string) => {
  const [user,setUser] = useState([]);
  //const [tempData,setTempData] = useState()  
  const fetchUser=async ()=>{
    const data = await axiosApi.get(utilityApis.listGetActiveUsers)
    setUser(data.data)
  } 

  useEffect(() => {
   fetchUser();
  }, []);
 return user

    // const searchContacts = (searchText: string) => {
    // const lowerSearchText = searchText.toLowerCase(); // Lowercase search text
    // const results = [];

    // function traverse(node: any, currentWord = '') {
    //   if (node.isEnd) {
    //     results.push(currentWord);
    //   }

    //   for (const char in node.children) {
    //     traverse(node.children[char], currentWord + char);
    //   }
    // }
    //traverse(user.root);
    //return results.filter((word) => word.startsWith(lowerSearchText));
 //   };

 // return searchContacts(searchText);
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
