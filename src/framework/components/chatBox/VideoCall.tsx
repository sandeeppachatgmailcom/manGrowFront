import { useCallback, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { IoMicOff } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { IoVideocamOffSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { BsBoxArrowInUpLeft } from "react-icons/bs";
import ReactPlayer from 'react-player'
import VideoCallRoom from "../../../interfaces/pages/VideoCallRoom";
import PeerService from "../../services/peer"; 
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
const VideoCall = ({user,socket}:{user:any,socket:Socket}) => {
    const [mute, setMute] = useState(true)
    const [speakerMute, setSpeakerMute] = useState(true)
    const [camview, setCamview] = useState(true)
    const [call, setCall] = useState(false)
    const [room, setRoom] = useState(false)
    const  activeUser = useSelector((state:any)=> state.activeUser.user)
    const peer = new PeerService() 
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
     
    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room ${id}`);
        setRemoteSocketId(user.email);
      }, []);
      const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        const offer = await peer.getOffer();
        console.log(peer.peer,'peeeeeeeeeeeeeeeeeeeeee')
        console.log('calling....',remoteSocketId, offer)
        socket.emit("user:call", { from:activeUser.email ,to: remoteSocketId, offer });
        setMyStream(stream);
      }, [remoteSocketId, socket]);


      const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
         console.log('handling call from here ')  
          setRemoteSocketId(from);
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          setMyStream(stream);
          
      
          try {
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
            const ans = await peer.getAnswer(offer);

           // await peer.setLocalDescription(ans);
            console.log(peer.peer, 'passed')
            console.log('Answer created', ans);
             
            socket.emit("call:accepted", { from: activeUser.email, to: from, ans });
          } catch (error) {
            console.error("Error creating or setting answer: ", error);
          }
        },
        [socket]
      );
      
      const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
          console.log(track,'tracktrack')
          peer.peer.addTrack(track, myStream);
        }
      }, [myStream]);
    
      const handleCallAccepted = useCallback(
        ({ from, ans }) => {
          console.log('------------------>>>>>>><<<<<<<<<----------------')
          peer.setLocalDescription(ans);
          console.log("Call Accepted!");
          sendStreams();
          handleNegoNeeded()
        },
        [sendStreams]
      );
    
      const handleNegoNeeded = useCallback(async () => {
        console.log('nego started ',remoteSocketId)
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { from:activeUser.email ,offer, to: remoteSocketId });
      }, [remoteSocketId, socket]);
    
      useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
          peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
      }, [handleNegoNeeded]);
    
      const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
          console.log('nego recevd ',from,offer)
          const ans = await peer.getAnswer(offer);
          socket.emit("peer:nego:done", {  from:activeUser.email ,to: from, ans });
        },
        [socket]
      );
    
      const handleNegoNeedFinal = useCallback(async ({ans}) => {
        await peer.setLocalDescription(ans);
      }, []);
    
      useEffect(() => {
            socket.emit("room:join", { email:activeUser.email, room });
            peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
      }, []);
    useEffect(()=>{
      console.log(user)
 
    },[user])


      useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        // socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
    
        return () => {
          socket.off("user:joined", handleUserJoined);
          // socket.off("incomming:call", handleIncommingCall);
          socket.off("call:accepted", handleCallAccepted);
          socket.off("peer:nego:needed", handleNegoNeedIncomming);
          socket.off("peer:nego:final", handleNegoNeedFinal);
        };
      }, [
        socket,
        handleUserJoined,
        // handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
      ]);
    

    return(
        <div className="h-[100%]   w-full rounded-xl border-8 border-gray-500 border-opacity-20 flex flex-col">
           {/* {room ? <VideoCallRoom user={user} onClose={setRoom} /> : ''} */}
            <div className="relative flex w-full flex-col  rounded-xl    items-center overflow-scroll    bg-blue-950 justify-center     bg-opacity-5   h-[100%]">
                {/* <button onClick={() => setRoom(true)} className="flex relative text-black items-start     w-full   cursor-pointer  justify-start p-3  bg-opacity-35 m-1  h-[5%]">
                    {!room ? <BsBoxArrowInUpLeft /> : ''}
                </button> */}
                <div className="flex flex-col">
                    <>
                        {myStream ?
                            <div className="flex  first: w-full overflow-hidden h-[50%] rounded-xl border-4  bg-opacity-40">
                                <ReactPlayer playing={true} height={'100%'} width={'100%'} muted={false} url={myStream} />
                            </div> :
                            <button className="   rounded-full h-[50%] w-full    p-1 ">
                                {!user?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-15 text-white-200 border-4 rounded-full border-white  p-2 text-opacity-35" /> : <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />}
                            </button>

                        }
                    </>
                    <>
                        {remoteStream ?
                            <div className="flex   w-full overflow-hidden h-[50%] rounded-xl  border-4 border-green-700 bg-opacity-40">
                                <ReactPlayer playing={true} height={'100%'} width={'100%'} muted={false} url={remoteStream} />
                            </div> :
                            <button className="   rounded-full h-[50%] w-full  p-1 ">
                                {!user?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-15 text-white-200 border-4 rounded-full border-white  p-2 text-opacity-35" /> : <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />}
                            </button>

                        }
                    </>
                </div>
                <div className="absolute   animate-progress w-full ">

                    {!camview ? <div className=" rounded-full   h-2 w-full flex justify-around animate-dots">
                        <div className="h-6 w-6 bg-violet-500  items-center flex justify-center  rounded-full">R</div>
                        <div className="h-6 w-6 bg-indigo-500 items-center flex justify-center  rounded-full">i</div>
                        <div className="h-6 w-6 bg-blue-500 items-center flex justify-center  rounded-full">n</div>
                        <div className="h-6 w-6 bg-green-500 items-center flex justify-center  rounded-full">g</div>
                        <div className="h-6 w-6 bg-yellow-500 items-center flex justify-center  rounded-full">i</div>
                        <div className="h-6 w-6 bg-orange-500 items-center flex justify-center  rounded-full">n</div>
                        <div className="h-6 w-6 bg-gray-600  items-center flex justify-center  rounded-full">g</div>
                    </div> : ''}
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-opacity-50 bg-gray-800 rounded-t-xl h-[25%]">
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">
                        {mute ? <HiMiniSpeakerWave onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <HiMiniSpeakerXMark onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div>
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">
                        {speakerMute ? <IoMic onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <IoMicOff onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div>
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">
                      {!user.activeCall  ? <IoVideocamSharp onClick={() => { setCamview(!camview);   handleCallUser()   }} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            :<div className="flex w-full h-full">
                              <IoVideocamSharp onClick={() => { setCamview(!camview); handleIncommingCall({from:user.email, offer:user?.offer}) }} className=" border-4 ms-1 animate-pulse  rounded-full border-green-400 text-green-300 w-[100%] h-[100%] p-3" />
                              <IoVideocamOffSharp onClick={() => { setCamview(!camview); handleNegoNeeded() }} className=" border-4 ms-1 animate-pulse  rounded-full border-red-600 text-red-600 w-[100%] h-[100%] p-3" />
                            </div>
                      }
                         

                    </div >
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden   ">
                        {call && !user.activeCall ? <IoCall onClick={() => setCall(!call)} className="  border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : !call && !user.activeCall ? <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full border-gray-500  border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                            :''
                        }
                    </div >

                </div>
            </div>



        </div>
    )
}

export default VideoCall