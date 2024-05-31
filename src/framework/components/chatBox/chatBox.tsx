
import { useEffect, useRef, useState } from "react"
import { MdVideoCameraBack } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { ChatBox_Component } from "../../../entity/components/common/ChatBox";
import SingleChat from "./SingleChat";
import { FaSearchengin } from "react-icons/fa6";
import useContactList from "../../../useCases/useContactList";
import { useSelector } from "react-redux";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
import {io} from 'socket.io-client'

const ChatBox = (_props:ChatBox_Component)=>{
    const socket = useRef({})
    const [real,setReal] = useState([])
    const [conversation,setConversation] = useState({})    
    const activeUser = useSelector((state:any)=>state.activeUser.user)
    const [user,setUser] = useState('')
    const [searchText,setSearchText] = useState('')
    const searchInput = useRef()
   // const [socket,setSocket] = useState(null)
    const  contact  = useContactList(searchText)
    
    socket.current =  io('ws://localhost:4000')
    
     

        useEffect(()=>{
             

        },[])

       





    const sendMessage = (message:{})=>{
            console.log(message,'my new Message')
            socket?.current?.emit("user-message",message)
            
    } 
   
    const getConversation = async (receiverEmail :string)=>{
        const data = {
            senderId:activeUser.email,
            receiverId:receiverEmail
        }
        const chat = await axiosApi.post(chatApi.intiateConversation,data )
        setConversation(chat.data.conversation)
        setReal(chat?.data?.messages)
    }
    
    
      
     
    const searchuser = (e:any)=>{
        
        const {name,value} = e.target
        setSearchText(value)
        
    } 

   
    



       useEffect(()=>{
        
        
       },[])
       socket?.current?.on("connect", () => {
        socket?.current?.emit('message', {
            message: 'Hello World',
            sender: 'User1',
            receiver: 'User2',
          });
          
          socket?.current?.on("user-message",(data) => {
            console.log('Received message:', data);
            setReal([...real,data])
         })
      });
   


    return(
        <div className=" shadow-lg   p-2 flex flex-col h-[100%]   rounded-xl">
            <div className="w-full h-[100px]   flex border border-opacity-20 border-gray-500  rounded-xl p-1">
                  <input ref={searchInput} onChange={(e:HTMLInputElement)=>{searchuser(e)}} value={searchText} className="p-4 focus:outline-none focus:outline-gray-600 rounded-xl  h-full w-full bg-transparent" type="text" name="" id="" />  
                  <button className="w-20 h-full p-5">
                    <FaSearchengin className="h-full w-full" />
                  </button>
            </div>
            <div className="border  mt-2 border-opacity-20 border-gray-500 p-1 rounded-xl overflow-scroll h-[300px]">
                {contact?.map((item,index)=>{
                  
                    return(
                        <div id={index}   onClick={()=>{item.firstName == user.firstName ?setUser({}): getConversation(item.email);setUser(item); }} className=" bg-gray-500 bg-opacity-10   rounded-sm">
                            <div id={index} className="m-1 h-[50px] flex text-start justify-between">
                                <div  className="flex items-start p-2  "> 
                                    <div  className="w-10 me-2 shadow-md h-[100%] rounded-full bg-blue-500 opacity-15  overflow-hidden "> 
                                        
                                    </div>
                                    <button className="text-1xl" >{item?.firstName}</button>  
                                </div> 
                                <div className="flex">
                                    <button className="mx-3 text-green-500" > <IoChatbubbleEllipsesOutline /> </button>
                                    <button className="mx-3 text-green-500" >  <MdVideoCameraBack />  </button>
                                    <button className="mx-3 text-green-500"> <IoCall /> </button>
                                </div>
                        </div>
                        
                        </div>
                    )
                })}
            </div>
            <div className="  h-[700px] mt-5 overflow-hidden border border-opacity-0 border-gray-500  rounded-xl bg-opacity-15  ">
            
             {Object.keys(user).length ?
                   <SingleChat onChange={setReal} sendMessage = {sendMessage}  chatHead= {conversation}  user = {user} userChat={ real} />   
            :''}
            </div> 
            
        </div>
    )
}

export default ChatBox