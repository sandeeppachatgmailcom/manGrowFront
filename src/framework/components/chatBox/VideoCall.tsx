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
import peer from "../../services/peer";
const VideoCall = ({ remoteStreamOffer, giveCallResPonce, videoCallMessage, user, dialCall, incomingCall, endCall }) => {
    const [mute, setMute] = useState(true)
    const [speakerMute, setSpeakerMute] = useState(true)
    const [camview, setCamview] = useState(true)
    const [call, setCall] = useState(false)
    const [room, setRoom] = useState(false)
    const [myStream, setMyStream] = useState()
    const [remoteStream, setRemoteStream] = useState()

    const handleoutGoingCall = async () => {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        console.log(stream)
        setMyStream(stream)
        const offer = await peer.getOffer()

        dialCall(offer, stream)

    }
    useEffect(() => {
        peer.peer.addEventListener('track', async ev => {
            const remoteStreem = ev.stream
        })
    }, [])
    useEffect(() => {
        try {
            (async () => {
                const remoteStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
                remoteStream.getTracks().forEach(track =>{
                    peer.addTracks(track,remoteStream)
                })
                const stream = await peer.getAnswer(remoteStreamOffer)
                 
                setRemoteStream(stream)
            })()
    

        } catch (error) {
            
        }
    }, [remoteStreamOffer,peer])

    useEffect(() => {
        console.log(remoteStream, 'remoteStreamremoteStream')
        if(remoteStream){
            
        }
    }, [remoteStream])

    const handleEndCall = () => {
        setMyStream(null)
        endCall()
    }
    const handleIncomingCall = async (videoCallMessage) => {
        const stream: any = await navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        setMyStream(stream)
        peer.setLocalDescription(videoCallMessage?.message?.offer)
        console.log(videoCallMessage, 'my Tracks')
        for (const tracks of myStream.getTracks()) {
            console.log(tracks, 'dddddsdsdsdds')
            await peer.peer.addTrack(track, myStream);
        }
    }
    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer()
        giveCallResPonce(offer, user)
    }, [])


    useEffect(() => {
        incomingCall ? setCamview(false) : setCamview(true)
        if (videoCallMessage) handleIncomingCall(videoCallMessage.message.offer)

    }, [incomingCall, videoCallMessage])
    return (
        <div className="h-[100%]   w-full rounded-xl border-8 border-gray-500 border-opacity-20 flex flex-col">
            {room ? <VideoCallRoom user={user} onClose={setRoom} /> : ''}
            <div className="relative flex w-full flex-col  rounded-xl    items-center overflow-scroll    bg-blue-950 justify-center  border  bg-opacity-5   h-[100%]">
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

                        {camview && !incomingCall ? <IoVideocamSharp onClick={() => { setCamview(!camview); !incomingCall ? handleoutGoingCall() : handleEndCall() }} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : !camview && incomingCall ? <IoVideocamOffSharp onClick={() => { setCamview(!camview); handleNegoNeeded() }} className=" border-4 ms-1 animate-pulse  rounded-full border-green-400 text-green-300 w-[100%] h-[100%] p-3" />
                                : <IoVideocamOffSharp onClick={() => { setCamview(!camview); endCall() }} className=" border-4 ms-1 animate-pulse  rounded-full border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }

                    </div >
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden   ">
                        {call ? <IoCall onClick={() => setCall(!call)} className="  border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full border-gray-500  border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div >

                </div>
            </div>



        </div>
    )
}

export default VideoCall