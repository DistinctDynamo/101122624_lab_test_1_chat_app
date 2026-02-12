import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from "react-router";

export default function GroupChat(){
    const location = useLocation();
    const user = localStorage.getItem('User')
    const { currRoom } = location.state || {};
    const clientIo = io();

    const [ formData, setFormData ] = useState({
        message:''
    });

    const handleChange = (event)=>{
        const{name, value}=event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value,
        }));
    };

    const postMessage = async(event) =>{
        event.preventDefault();

        const messageData ={
            from_user: user,
            room: currRoom,
            message: formData.message
        }

        await fetch('http://localhost:3133/groupMessage',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(messageData)
        })

        clientIo.emit('message',formData.message)
    }

    const leaveGroup = () =>{
        clientIO.emit('leave-group',currRoom),
        navigate('/home')
    }
    
    return(
        
        <div>
            <h1>{currRoom || "No room selected"}</h1>
            
            <form onSubmit={postMessage}>
            <label htmlFor='message'>Message:</label>

            <input
              id="message"
              name='message'
              type='text'
              value={formData.message}
              onChange={handleChange}
            />

            <button type='submit'>Post</button>
            <button onClick={leaveGroup()}>Leave Group</button>
            </form>
        
        </div>
    );
}