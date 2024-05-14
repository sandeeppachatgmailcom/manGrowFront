import { useSelector } from "react-redux"
import { BsPencilFill } from "react-icons/bs";
import { BsFillFloppyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Typing_Component } from "../../../entity/components/common/Typing";
const Typing = (_props:Typing_Component)=>{
    const theme = useSelector((state:any)=>state.theme)
    return(
        <div className="w-100 p-4 shadow-md h-[auto] border border-gray-300 border-opacity-45  rounded-xl " >
            <div className="justify-end text-end">
                    <h5>Date :01/04/2023 </h5>
                    <h5>Deadline:02/04/2023</h5>
            </div>
           <h5 >Today’s Activity - 🤔Guess the Songs🎶</h5> 
           <h5 >🎤 Choosing Songs: Each person gets to pick 2-3 songs from either Malayalam or Tamil movies 🎥 </h5> 
           <p>Reading Lyrics: Instead of singing, each student will translate the lyrics into English and recite them aloud to their batchmates 🎙
            🎧 Listening Carefully: While one person is reading the lyrics, everyone else needs to listen closely to the words, but no Googling allowed 🙅‍♂
            🧐 Guessing the Song: If you think you know which song is being read, raise your hand and say the name of the movie and the title of the song. You can even sing a few lines from the song if you’re confident 😎
            🏆 Determining the Winner: The person who correctly guesses the most songs wins the game 🥳
            </p>
            <textarea name="textarea" id="myTextarea" className= {`${theme.inputtext}w-full h-32 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500`} placeholder="Enter your text..."  ></textarea>
            <div className="justify-end text-end">
                    
            <button className="rounded  shadow-sm m-2 p-2 w-30 text-yellow-600" ><BsPencilFill />  </button> 
                    <button className="rounded  shadow-sm m-2 p-2 w-30 text-green-600 "><BsFillFloppyFill /> </button> 
                    <button className="rounded  shadow-sm m-2 p-2 w-30 text-red-600"><MdDelete  /> </button> 
            </div>
        </div>
    )
}


export default Typing
