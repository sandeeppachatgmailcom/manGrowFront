import React, { useState, useEffect } from "react";
import { Event_Model } from "../../../entity/components/admin/events"; // Assuming correct path

const Event_Single = (props: { event: Event_Model, index: number }) => {
    const [formData, setFormData] = useState<Event_Model | undefined>(props.event); // Initialize with props.event or undefined
   
    useEffect(() => {
        setFormData({ ...props.event });
    }, [props]); // Run only when props change

    return (

        <div   className={`cursor-pointer flex w-full ` }>
            {formData?.eventName?.trim()}
        </div>

    );
};

export default Event_Single;
