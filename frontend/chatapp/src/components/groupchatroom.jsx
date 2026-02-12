import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router";
import { useLocation } from "react-router";


export default function GroupChat(){
    const navigate = useNavigate();
    const location = useLocation();
    const { currRoom, user } = location.state || {};

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

    const handleSubmit = async(event) =>{
        event.preventDefault();

        const messageData = {
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
        }).then((response)=>{
            console.log(response.status);
        }).catch(error=>{
            alert(error)
        })
    }

    const leaveGroup = ()=>{
        navigate('/home')
    }

    return(
        <div>
            <h1>{currRoom || "No room selected"}</h1>

            <form onSubmit={handleSubmit}>
            <label htmlFor='message'>Message:</label>
            <input
              id="message"
              name='message'
              type='text'
              value={formData.message}
              onChange={handleChange}
            />
            <button type='submit'>Post</button>
            </form>

        <button onClick={leaveGroup}>Leave Group</button>
        </div>
    );
}