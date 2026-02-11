import { useState,useEffect } from 'react';

export default function chatbox({room,setModalOpen}){
     const [ room, setRoom ] = useState({});

     return(
        <div>
        <p>${room}</p>

        <button
            onClick={() => {
            setModalOpen ({ state: false, id: "" });
            }}>
            Cancel
        </button>
        </div>
        
     )
}