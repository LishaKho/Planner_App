import React, {useState} from "react";
import {navigate} from "@reach/router";
import axios from "axios";
import NavButtons from "../components/navButtons";

const Login = (props) =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const login = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:8000/api/users/login", {
            username: username,
            password: password
        },{
            withCredentials: true
        })
            .then((response)=>{
                console.log(response.data);
                navigate('/myPlanner');
            })
            .catch((error)=>{
                console.log(error.response);
            })
    }


    return(
        <div>
            <NavButtons button1={'home'} button1URL={'/'} button2={'Register'} button2URL={'/registration'}/>
            <div>
                <h1>Welcome Back</h1>
                <form onSubmit={login}>
                    <div className={'form-group'}>
                        <label htmlFor="">Username</label>
                        <input type="text" className={'form-control'} name={'username'} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className={'form-group'}>
                        <label htmlFor="">Password</label>
                        <input type="password" className={'form-control'} name={'password'} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <input type="submit" value={'Login'}/>
                </form>
            </div>

        </div>
    )


}

export default Login