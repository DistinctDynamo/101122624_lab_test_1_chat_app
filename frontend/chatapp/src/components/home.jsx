import { useNavigate } from "react-router";
import { useState } from 'react';
import { useLocation } from "react-router";

export default function Home(){
    const navigate = useNavigate();
    const location = useLocation();
    const [ room, setRoom ] = useState("");
    const { user } = location.state || {};
    const loggedIn = localStorage.getItem('LoggedIn')

    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn',"False")
    };

    const openChatBox =(event)=>{
        event.preventDefault();
        navigate("/groupChat", { state: { currRoom: room, user: user } })
    }

    const handleSubmit = (event) =>{
       setRoom(event.target.value)
    }

    if (loggedIn === "True"){
        return(
            <div>
                <form onSubmit={openChatBox}>
                    <label for="room">Choose a Room:</label>
                    <select value={room} name="room" onChange={handleSubmit}>
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

