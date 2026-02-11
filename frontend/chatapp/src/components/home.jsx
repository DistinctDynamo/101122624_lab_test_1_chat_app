import { useNavigate } from "react-router";
import { useState,useEffect } from 'react';
import GroupChat from "./groupchatroom";

export default function Home(){
    const navigate = useNavigate();
    const [ room, setRoom ] = useState("");

    const loggedIn = localStorage.getItem('LoggedIn')

    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn',"False")
    };

    const openChatBox =(event)=>{
        event.preventDefault();
        navigate("/groupChat", { state: { currRoom: room } })
    }

    const handleChange = (event) =>{
        setRoom(event.target.value)
    }

    <GroupChat currRoom={room}/>

    if (loggedIn === "True"){
        return(
            <div>
                <form onSubmit={openChatBox}>
                    <label for="room">Choose a Room:</label>
                    <select value={room} name="room" onChange={handleChange}>
                    <option value="Gbc">Gbc</option>
                    <option value="Card Games">Card Games</option>
                    <option value="Sports">Sports</option>
                    <option value="Pets">Pets</option>
                    <option value="Food">Food</option>
                    </select>

                    <input type="submit"></input>
                </form>
                <p>{room}</p>
                <button onClick={logOut}>LogOut</button>
                
            </div>
        )
    }else{
        navigate("/login")
        localStorage.setItem('LoggedIn','False')
    }
}

