import React, {useState} from "react";
import {navigate} from "@reach/router";
import axios from "axios";
import NavButtons from "../components/navButtons";

const Login = (props) =>{
    const [errors, setErrors] = useState({})
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
                setErrors(error.response.data);
            })
    }


    return(
        <div>
            <NavButtons button1={'Home'} button1URL={'/'} button2={'Register'} button2URL={'/registration'}/>
            <div className="vh-100" style={{backgroundColor: "#D3D0CB"}}>
                <h1 style={{ color: "#2E5266" }}>Welcome Back!</h1>
                <div className="vh-100" style={{backgroundColor: "#D3D0CB"}}>
                    <div className="d-flex align-items-start h-100">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-start h-100">
                                <div className="col-8 col-sm-7">
                                    <div className="card" style={{backgroundColor: "#9FB1BC", borderRadius: "15px"}}>
                                        <div className="card-body p-4">
                                            <form onSubmit={login}>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="">Username:</label><br/>
                                                    {
                                                        errors?<span className={'text-danger'}>{errors.message}</span>:
                                                            null
                                                    }
                                                    <input className="form-control form-control-md" type="text"  name={'username'} onChange={(e)=>setUsername(e.target.value)}/>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="">Password:</label>
                                                    <input className="form-control form-control-md" type="password"  name={'password'} onChange={(e)=>setPassword(e.target.value)}/>
                                                </div>
                                                <input type="submit" value={'Login'} style={{ backgroundColor: "#6E8898", color: "white" }}/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )


}

export default Login