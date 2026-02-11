import { useState } from 'react';
import { useNavigate } from "react-router";

export default function Signup(){
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username:'',
        first_name:'',
        last_name:'',
        password:'',
    });

    const handleChange = (event)=>{
        event.preventDefault();
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
            first_name: formData.first_name,
            last_name: formData.last_name,
            password: formData.password
        }  
        fetch('http://localhost:3133/user/signup',{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }).then(
            navigate('/login')
        )
        .catch(error=>{
            alert(error)
        })
    };
    
    return(
        <div>
                <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Sign Up</h1>
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

                <label htmlFor='first_name'>First Name:</label>
                <input
                id="first_name"
                name='first_name'
                type='text'
                value={formData.first_name}
                onChange={handleChange}
                placeholder='Jane'
                required
                />

                <label htmlFor='last_name'>Last Name:</label>
                <input
                id="last_name"
                name='last_name'
                type='text'
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Doe'
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

                <button type='submit' className='sign up button'>
                    Sign-Up
                </button>
                </form>
            
        </div>
    )
}

