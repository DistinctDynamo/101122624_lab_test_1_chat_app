import { useState } from 'react';
import { useNavigate } from "react-router";
const express = require('express');
const app = express();

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
        email:'',
        password:'',
    });

    const handleChange = (event)=>{
        const{name, value}=event.target;
        setFormData((previous)=>({
            ...previous,
            [name]:value,
        }));
    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        const userData={
            username: formData.username,
            email: formData.email,
            password: formData.password
        }
        app.post('http://localhost:3000/user/login',userData)
        .then((response)=>{
            console.log(response.status, response.data.token);
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

                    <label htmlFor='email'>Email:</label>
                    <input
                    id="email"
                    name='email'
                    type='text'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='JaneDoe@123.gmail.com'
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