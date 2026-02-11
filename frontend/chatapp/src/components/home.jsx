import { useNavigate } from "react-router";


export default function home(){
    const navigate = useNavigate();

    const loggedIn = localStorage.getItem('LoggedIn')

    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn',"False")
    };

    return(
        <button onClick={logOut}>LogOut</button>
    )
    
}

