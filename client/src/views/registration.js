import React, {useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import UserForm from "../components/userForm";
import NavButtons from "../components/navButtons";



const Registration = (props) =>{
    const [errors, setErrors] = useState({})
    const [userObj, setUserObj] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const register = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/users/register', userObj, {

            withCredentials:true
        })
            .then((response)=>{
                console.log(response.data);
                navigate('/')
            })
            .catch((error)=>{
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            })
    }

    return(
        <div className="vh-100" style={{backgroundColor: "#D3D0CB"}}>
            <NavButtons button1={'home'} button1URL={'/'} button2={'LogIn'} button2URL={'/'}/>
            <h1 style={{ color: "#2E5266" }}>User Registration</h1>
            <UserForm user={userObj} errors={errors} setUser={setUserObj} handler={register}/>
        </div>
        
    )
}

export default Registration
