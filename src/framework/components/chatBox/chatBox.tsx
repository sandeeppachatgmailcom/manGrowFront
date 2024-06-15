import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MdVideoCameraBack, MdOnlinePrediction } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoCall } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
import { Socket, io } from 'socket.io-client';
import { updateChatUser } from "../../ReduxStore/activeChatuser";
import useContactList from "../../../useCases/useContactList";
import SingleChat from "./SingleChat";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FcVideoCall } from "react-icons/fc";
import { toggleMultiUser } from "../../ReduxStore/multipleUser";
import classPeer from "../../services/peer";
import { connectSocket, disconnectSocket } from "../../ReduxStore/socket";

const ChatBox = ({ setStudent }: any) => {
  const multipleUser = useSelector((state) => state.multiUser.show)
  const [videoCallMessage, setVideoCallMessage] = useState()
  const [real, setReal] = useState([]);
  const currentChatUser = useSelector((state) => state.activeChatUser.user);
  const [conversation, setConversation] = useState({});
  const activeUser = useSelector((state: any) => state.activeUser.user);
  const [videoCallList, setVideoCallList] = useState([])
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef();
  const contact = useContactList(searchText);
  const [usersList, setUsersList] = useState([])
  const [initialSocket, setInitialSocket] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState('')
  const navigate = useNavigate()
  const [incomingCall, setIncominCall] = useState(false)
  const [remoteOffer,setRemoteOffer] = useState()
  const [activeCalls,setActiveCalls] = useState([]) 
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [socketId, setSocketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const peer = new classPeer()
  //const { socket, connected, socketId } = useSelector(state => state.socket);
  // new spcket connection established and assigned to a state 
  useEffect(() => {
    const newSocket = io("http://localhost:4000")  
    setSocket(newSocket);
    newSocket.on('connect', () => {
      setConnected(true);
      setSocketId(newSocket.id);
      setError(null);
    });
    newSocket.on('disconnect', () => {
      setConnected(false);
      setSocketId(null);
    });
    newSocket.on('connect_error', (err: Error) => {
      setError(err.message);
    });
    setSocket(newSocket);
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };

  }, []);
  // always update the list of onlineuserd , ueseeffect will work when ever change founde the varibales in dependancy
  useEffect(() => {
    const userList = contact?.map(user => ({
      ...user,
      online: onlineUsers.some(online => user.email === online.userId)
    })).sort((a, b) => b.online - a.online);
     
    if (userList?.length) {
      setUsersList(userList);
    }
  }, [onlineUsers, contact, socket]);

  useEffect(() => {
    const tempUserList = usersList.map((user) => {
      return {
        ...user,
        activeCall: activeCalls.some((active) => active.from === user.email),
        offer: activeCalls.filter((active) =>  active.from === user.email ?active.offer:null   )[0]?.offer 
      };
    });
    
  setUsersList(tempUserList);
     activeCalls.map((activeCall)=>{
      
      if(activeCall.from === user.email){
        setUser({
          ...user,
          activeCall:true,
          offer:activeCall.offer 
        })
      }
     }) 
  },[activeCalls]);

   

  //updating users list to identify call waiting 
  useEffect(() => {
    const userList = usersList.map((user) => ({
      ...user,
      incomingCall: videoCallList.some(caller => user.email === caller.email),
    }));

    setUsersList(userList);
  }, [videoCallList]);
  const handleAddUser =()=>{
  }
  // handling the logout and new connection when user changes 
  useEffect(() => {

    if (!Object.keys(activeUser)?.length) {
      socket?.emit("logout");
    } else {
      socket?.emit("addUser", { userid: activeUser.email });
    }
  }, [activeUser, socket]);
  // updating the user oncall
  useEffect(() => {

    dispatch(updateChatUser(user));
  }, [user, dispatch]);
  const handleUsersOnline = (message:any) => {
    setOnlineUsers(message);
  };
  const handleSendMessage = (message:any) => {
    if (message.receiverId === activeUser.email) {
      setReal(prevReal => [message, ...prevReal]);
    }
  };
  
   const endCurrentCall = (message:any) => {

    const result = usersList.filter((item) => item.email == message.senderId)
    const calledUser = result[0];
     
    setUser(calledUser)
    setIncominCall(false)
  }
  const checkOnline = (email:any) => {
    return onlineUsers.some(online => email === online.userId);
  };
  const endCall = (message:any) => {
    socket.emit("endCall", message)
  }
  const giveCallResPonce = (offer,user)=>{
     
    socket.emit('CallResPonce',{offer,user})
  }
  const handleCallResponce = (message)=>{
     
    setRemoteOffer(message)
  }
  const sendMessage = (message:any) => {
    socket?.emit("send-message", message);
  };
  const dialACall = (message:any) => {
    socket.emit("dialACall", { message })
  }
  const getConversation = async (receiverEmail:any) => {
    const data = {
      senderId: activeUser.email,
      receiverId: receiverEmail
    };
    const chat = await axiosApi.post(chatApi.intiateConversation, data);
    setConversation(chat.data.conversation);
    setReal(chat?.data?.messages);
  };
  const opennewTab = () => {

    window.open('http://localhost:5173/role', '_blank');
    dispatch(toggleMultiUser())
  }
  const searchUser = (e:any) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      const temp = activeCalls
      temp.push({from,offer}); 
      setActiveCalls([...temp])   
      
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
       
      console.log(`Incoming Call`, from, offer);
      //const ans = await peer.getAnswer(offer);
      //socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  ); 


  useEffect(() => {
    if (initialSocket) {
      socket?.emit("addUser", { userid: activeUser.email });
      setInitialSocket(false);
    }
    socket?.on("incomming:call", handleIncommingCall);

    socket?.on("usersOnline", handleUsersOnline);
    socket?.on("addUser", handleAddUser);
    socket?.on("send-message", handleSendMessage);
    
     
    return () => {
      socket?.off("incomming:call", handleIncommingCall);
      socket?.off("usersOnline", handleUsersOnline);
      socket?.off("addUser", handleAddUser);
      socket?.off("send-message", handleSendMessage);
       
    };
  }, [socket, initialSocket, activeUser.email, usersList]);

const handleAnswerCall =useCallback(()=>{
},[socket])

  return (
    <div className="shadow-lg p-2 flex flex-col overflow-scroll h-full rounded-xl">
      {multipleUser ?
        <div className="w-full items-center justify-center shadow-2xl h-[40%] flex-col flex border-8 overflow-scroll bg-blue-600 bg-opacity-15 border-opacity-20  border-gray-500 rounded-3xl rounded-tr-none p-1">

          <button onClick={opennewTab} className="items-center justify-center text-1xl w-1/2 p-2 h-[50%] flex-col flex m-1 rounded-xl bg-gray-500 bg-opacity-15">
            <IoPersonAddSharp className="h-[50%] w-[50%] m-1 p-1" />

          </button>


        </div>
        :
        <>
          <div className="w-full h-[10%] flex border border-opacity-20 border-gray-500 rounded-xl  p-1">
            <input ref={searchInput} onChange={searchUser} value={searchText} className="p-4 focus:outline-none focus:outline-gray-600 rounded-xl h-full w-full bg-transparent" type="text" />
            <button className="w-20 h-full p-5">
              <FaSearchengin className="h-full w-full" />
            </button>
          </div>
          <div className="border mt-2 border-opacity-20 border-gray-500 p-1 rounded-xl overflow-scroll h-[30%]">

            {usersList?.map((item) => (
              <div key={item?.email}  onClick={() => { item.firstName === user.firstName ? setUser({}) : getConversation(item?.email); setUser(item); setSelectedUser(item?.email); item.role == 'student' && activeUser.role != 'student' ? setStudent({ status: true, user: item?.email }) : setStudent({ status: false, user: item?.email }) }} className={`${!checkOnline(item?.email) ? 'text-opacity-50' : ''} rounded-xl cursor-pointer bg-opacity-30 ${item.email == selectedUser ? 'bg-blue-400' : 'bg-gray-500 bg-opacity-5 '} rounded-sm `}>
                <div className="m-1 h-[50px] w-full items-center flex text-start justify-between">
                  <div className="flex w-7/12 h-[100%]  items-start p-2">
                    <div className={`${!item?.online ? 'bg-opacity-40' : ''}    w-10 me-2 shadow-md h-[100%] rounded-full bg-blue-500   overflow-hidden`}>
                      <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${item?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                    </div>
                    <div className={`${item?.online ? 'text-green-400' : 'text-red-400'}`}>
                      <MdOnlinePrediction className="h-full" />
                    </div>
                    <button onClick={() => { }} className={`text-1xl `}>{item?.firstName}</button>
                  </div>
                  <div className="w-2/12 flex   overflow-hidden items-center h-full">
                    {item?.activeCall ? <FcVideoCall className="animate-pulse h-[100%] w-[100%]" /> : ''}
                  </div>
                  <div className="flex w-3/12">
                    <button className="mx-3 text-green-500"><IoChatbubbleEllipsesOutline /></button>
                    <button className="mx-3 text-green-500"><MdVideoCameraBack /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      <div className="h-[60%]   mt-5 overflow-scroll border border-opacity-10 p-1 border-gray-500 rounded-xl bg-opacity-15">

        {Object.keys(user)?.length ?
          <SingleChat socket={socket} giveCallResPonce={giveCallResPonce}  remoteStreamOffer ={remoteOffer} videoCallMessage={videoCallMessage} incomingCall={incomingCall} onChange={setReal} endCall={endCall} startCall={dialACall} sendMessage={sendMessage} chatHead={conversation} user={user} userChat={real} />
          : ''}
      </div>
    </div>
  );
};

export default ChatBox;
