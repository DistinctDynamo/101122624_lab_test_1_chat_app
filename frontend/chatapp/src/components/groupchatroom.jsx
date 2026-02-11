import React from 'react';
import { useLocation } from "react-router";

export default function GroupChat(){
    const location = useLocation();
    const { currRoom } = location.state || {};

    return(
        <div>
            <p>{currRoom || "No room selected"}</p>

        </div>
    );
}