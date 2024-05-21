import  {  useState } from 'react';
 import uploadVideo from '../../services/saveVideo';
 
const GeneralTask = (props:any) => {
   
  
   
   
  const [capturedValue, setCapturedValue] = useState<string | null>(props.value);
   
  const handleChange = (e:HTMLTextAreaElement)=>{
    props.onChange(e)
  }



   return (
    <div className=" w-full border-4 border-green-600 rounded-xl overflow-hidden">
          <div className=" top-4 left-4">
            <textarea value={props.value}  name={props.name} onChange={handleChange} className='w-full h-[250px] bg-gray-500 text-white focus:outline-none  '   >  </textarea>
              <div className='flex justify-end'>
              <button
                onClick={() => props.onSaveClick()}
                className="   bg-blue-500 text-white rounded-md   shadow-sm m-2 p-4 w-20      " >
                SAVE
              </button>
              </div>
          </div>
      </div>
  );
};

export default GeneralTask;
