import React, { useState, useEffect } from "react";
import { Event_Model } from "../../../entity/components/admin/events"; // Assuming correct path

const Event_Single = (props: { event: Event_Model, index: number }) => {
    const [formData, setFormData] = useState<Event_Model | undefined>(props.event); // Initialize with props.event or undefined
   
    useEffect(() => {
        setFormData({ ...props.event });
    }, [props]); // Run only when props change

    return (

        <div   className={`m-1  cursor-pointer flex    w-full   ` }>
            
            <div  className="block w-5/6 p-2 ">
                <h1 className="font-semibold flex flex-nowrap text-nowrap ">{formData?.eventName} </h1> {/* Access properties using optional chaining */}
            </div>
        </div>

    );
};

export default Event_Single;
