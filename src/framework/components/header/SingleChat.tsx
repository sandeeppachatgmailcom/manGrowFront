

type props = any
const SingleChat =({nameObj}:props)=>{
    console.log(nameObj)
    return(
        <div className="h-[50%] rounded-xl w-full   ">
            <div className="flex items-center justify-start h-[15%] shadow-lg rounded-t-lg">
                 <h5 className="ms-2 font-semibold"> {nameObj.name.toUpperCase()}</h5>
            </div>
            <div className="h-[70%] shadow-md ">

            </div>
            <div className="flex items-center  h-[15%] shadow-lg rounded-b-lg mb-1">
                <input className="h-[80%] rounded-full w-4/5  m-1 " type="text" name="" id="" />
                {/* <button className="h-full " ><FaLocationArrow /></button> */}
            </div>
        </div>
    )
}

export default SingleChat