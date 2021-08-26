import React, {useState} from "react";
import axios from "axios";
import {navigate} from "@reach/router";
import UserForm from "../components/userForm";



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
                console.log(error.response);
                setErrors(error.response);
            })
    }

    return(
        <div className="vh-100" style={{backgroundColor: "#D3D0CB"}}>
            <div className="container h-50">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div className="card" style={{backgroundColor: "#9FB1BC", borderRadius: "15px"}}>
                            <div className="card-body p-5">
                                <h1 style={{ color: "#2E5266" }}>User Registration</h1>
                                <UserForm user={userObj} errors={errors} setUser={setUserObj} handler={register}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Registration
