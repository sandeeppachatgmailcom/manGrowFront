
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdVideoCameraBack } from "react-icons/md";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { UserEntity_Model } from "../../../entity/response/userModel";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
const SingleChat = ({onChange, sendMessage,user,userChat,chatHead}: {onChange:()=>{} ,sendMessage:(message:{})=>{},  chatHead:{} ,user:{},userChat:object[]})=>{
    const activeUser :UserEntity_Model  = useSelector((state)=>state.activeUser.user)
    const [data,setData] = useState([...userChat])
    const[newData,setNewData] = useState({
        senderMessage:'',
        receiverMessage:'',
        TransDateTime: new Date().toISOString(),
        receiverId:user?.email,
        senderId:activeUser.email,
        conversationId:chatHead?.converationId
        
    }) 
    useEffect(()=>{
        setData(userChat)
    },[userChat])
     
    const sendData =async ()=>{
        const obj =
            {
                senderMessage:newData.senderMessage,
                receiverMessage:'',
                TransDateTime: new Date().toISOString(),
                receiverId:user?.email,
                senderId:activeUser.email,
                conversationId:chatHead?.converationId
            }
            console.log(obj,'Click reached')    
            
        if(newData?.senderMessage?.trim().length){
           
            const message =await axiosApi.post(chatApi.sendMessage,obj) 
            sendMessage(obj)
            // console.log(message.data)
            // setData([
            //     message.data ,...data
            // ])
            onChange([message.data ,...data])
        
        setNewData({
            senderMessage:'',
            receiverMessage:'',
            TransDateTime: new Date().toISOString(),
            receiverId:user?.email,
            senderId:activeUser.email,
            conversationId:''
        })
        }
    }
     
    const handleChage =(e:any)=>{
        const {name,value} = e.target;
        setNewData({
            ...newData,
            [name]:value
        })
        console.log(name,value,'name, value')
    } 
    



    return(
        <div className="w-full block rounded-xl     h-[100%] ">
            <div className="h-[15%] flex justify-between">
                <div  className="flex items-center h-[80%]  justify-start w-2/4 p-2    "> 
                    <div  className=" me-2 shadow-md border  h-10 w-10    rounded-full bg-blue-500 opacity-15  overflow-hidden "> 
                                        
                    </div>            
                    <button className="text-1xl w-10/12 h-[100%] text-2xl  items-center  flex " >{user?.firstName}</button>  
                </div> 
                <div className="flex w-2/4">
                                <button className="mx-3 text-green-500" > <IoChatbubbleEllipsesOutline /> </button>
                                <button className="mx-3 text-green-500" >  <MdVideoCameraBack />  </button>
                                <button className="mx-3 text-green-500"> <IoCall /> </button>
                            </div>
            </div>
            <div className="h-[500px] mt-2 mb-1   overflow-y-scroll  flex flex-col-reverse p-3">
                   
                    
                {data.sort((a,b)=>(b.TransDateTime - a.TransDateTime)).map((item)=>{
                 
                     return ( item.senderId == activeUser.email?( 
                       <div className="h-auto self-end   text-end    flex flex-col rounded-e-none rounded-t-xl rounded-s-xl bg-green-900 bg-opacity-20 justify-end m-1 flex-wrap  p-3 ">
                           <small className="">{activeUser.firstName + ' ' +activeUser.lastName }</small>
                           <p className="flex flex-wrap justify-end text-end w-full text-wrap overflow-wrap: break-word">{item.senderMessage } {item.receiverMessage  }</p>
                       
                        </div>):(<div className="h-20   self-start rounded-xl bg-blue-900  bg-opacity-20 rounded-s-none rounded-t-xl flex flex-col justify-start m-2 flex-wrap   p-2">
                        <small>{user?.firstName}</small>
                        <p className="flex flex-wrap justify-end text-start w-full text-wrap overflow-wrap: break-word">{item.receiverMessage}  {item.senderMessage }</p>
                        
                    </div>))    
                    
                }) } 
            </div>
            <div className=" bg-gray-600 flex p-1 bg-opacity-5">
            <div className="w-full h-[90%]   m-1 flex rounded-xl">
                    <input onChange={(e)=>{handleChage(e)}}  value={newData.senderMessage} name='senderMessage' className="p-2 focus:outline-none focus:outline-gray-600 rounded-xl border-opacity-80  border-gray-600 border m-2  h-[full] w-full bg-transparent flex " type="text"   id="" />  
                        <button onClick={()=>{sendData()}}   className=" rounded-xl  w-20 h-full p-5 focus:outline-none focus:outline-gray-500 ">
                        <IoSend  className="h-full w-full" />
                        </button>
        </div>
            </div>
        </div>
    )
}


export default SingleChat