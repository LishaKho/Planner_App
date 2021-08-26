import React from "react";

const UserForm = (props) =>{
    const {user, setUser, handler, errors, buttonLabel} = props;


    const inputChange = (e) =>{
        console.log('input value ' + e.target.value);

        console.log('input name ' + e.target.name);

        let newUserObj = {...user}
        newUserObj[e.target.name] = e.target.value;

        setUser(newUserObj);
    }



    return(
        <div>
            <form onSubmit={handler}>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="">Username:</label>
                        {
                            errors.username? <span className={'text-danger'}>{errors.username.message}</span>:
                            null
                        }
                        <input type="text" name={'username'} className="form-control form-control-md" onChange={(e)=>inputChange(e)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="first name">First Name:</label>
                        {
                            errors.firstName? <span className={'text-danger'}>{errors.firstName.message}</span>:
                            null
                        }
                        <input type="text" name={'firstName'} className="form-control form-control-md" onChange={(e)=>inputChange(e)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="last name">Last Name:</label>
                        {
                            errors.lastName? <span className={'text-danger'}>{errors.lastName.message}</span>:
                            null
                        }
                        <input type="text" name={'lastName'} className="form-control form-control-md" onChange={(e)=>{inputChange(e)}}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">Email:</label>
                        {
                            errors.email? <span className={'text-danger'}>{errors.email.message}</span>:
                            null
                        }
                        <input type="email" name={'email'} className="form-control form-control-md" onChange={(e)=>inputChange(e)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">Password:</label>
                            {
                                errors.password? <span className={'text-danger'}>{errors.password.message}</span>:
                                null
                            }
                            <input type="password" name={'password'} className="form-control form-control-md" onChange={(e)=>inputChange(e)}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="confirmPassword">Confirm Password:</label>
                            {
                                errors.confirmPassword? <span className={'text-danger'}>{errors.confirmPassword.message}</span>:
                                null
                            }
                            <input type="password" name={'confirmPassword'} className="form-control form-control-md" onChange={(e)=>inputChange(e)}/>
                </div>
                            <input type="submit" value={buttonLabel} style={{ backgroundColor: "#6E8898", color: "white" }}/>
            </form>
        </div>
    )
}

export default UserForm;


//className="col-12 col-md-9 col-lg-7 col-xl-6"