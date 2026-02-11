import { useState } from 'react';
import { useNavigate } from "react-router";

export default function Login(){
    const navigate = useNavigate();

    const loggedInStatus=()=>{
        let check = localStorage.getItem('LoggedIn')
        if(check === "True"){
            return true
        } else{
            return false
        }
    }

    const [formData, setFormData] = useState({
        username:'',
        password:''
    });

    const handleChange = (event)=>{
        const{name, value}=event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value,
        }));
    };

    const handleSubmit = async (event)=>{
        event.preventDefault();

        const userData={
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        await fetch('http://localhost:3133/user/login',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then((response)=>{
            console.log(response.status);
        }).then(
           localStorage.setItem('LoggedIn','True')
        ).then(
            navigate('/home')
        ).catch(error=>{
            alert(error)
        })
    };
    
    return(
        <div>
                <form onSubmit={handleSubmit}>
                <header>
                    <h1>Login</h1>
                </header>

                <label htmlFor='username'>Username:</label>
                <input
                id="username"
                name='username'
                type='text'
                value={formData.username}
                onChange={handleChange}
                placeholder='Jane Doe'
                required
                />

                    <label htmlFor='password'>Password:</label>
                    <input
                    id="password"
                    name='password'
                    type='text'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='*********'
                    required
                    />

                    {
                      loggedInStatus() ? <p>You are already logged in</p> 
                      :<button type='submit' className='login button'>
                      Login
                      </button>
                    }
                    </form>
        </div>
    )
}