
import { useState } from "react"
import { MdVideoCameraBack } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { ChatBox_Component } from "../../../entity/components/common/ChatBox";
const ChatBox = (_props:ChatBox_Component)=>{

    const [contact,_setContact] = useState(['Sanoop ','Chandhini','midhun','veshal','ranjith','aswin'])

    return(
        <div className=" shadow-lg   overflow-y-auto rounded-xl">
            {contact.map((name,index)=>{
                return(
                    <div id={index} className="m-1 h-[40px] flex text-center justify-between">
                        <div  className="flex "> 
                            <button className="text-1xl" >{name}</button>  
                        </div> 
                        <div className="flex">
                        <button className="mx-3 text-green-500" > 
                        <IoChatbubbleEllipsesOutline />
                            </button>
                            <button className="mx-3 text-green-500" > 
                                <MdVideoCameraBack /> 
                            </button>
                            <button className="mx-3 text-green-500">
                            <IoCall />
                            </button>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ChatBox