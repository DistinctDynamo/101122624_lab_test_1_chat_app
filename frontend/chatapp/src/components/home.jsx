import { useNavigate } from "react-router";
import Chatbox from './groupchatroom';

export default function home(){
    const navigate = useNavigate();

    const loggedIn = localStorage.getItem('LoggedIn')

    const [openModal, setOpenModal] = useState(
        {
            state:false,
            id:""
        });

    const logOut=()=>{
        navigate("/login")
        localStorage.setItem('LoggedIn',"False")
    };

    const openChatBox = () => {
          {openModal.state && <Chatbox room={openModal.id} setModalOpen={setOpenModal} />}
    }

    if (loggedIn == true){
        return(
            <div>
                <form onSubmit={openChatBox}>
                    <label for="room">Choose a Room:</label>
                    <select id="room" name="room">
                    <option value="Gbc">Gbc</option>
                    <option value="Card Games">Card Games</option>
                    <option value="Sports">Sports</option>
                    <option value="Pets">Pets</option>
                    <option value="Food">Food</option>
                    </select>

                    <input type="submit"></input>
                </form>

                <button onClick={logOut}>LogOut</button>
            </div>
        )
    }else{
        navigate("/login")
        localStorage.setItem('LoggedIn','False')
    }
  
}

