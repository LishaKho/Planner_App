import React from "react";
import {Link} from "@reach/router";
import Logo from "./images/logo.png";


const NavButtons = (props)=>{
    const {button1, button1URL, button2, button2URL, handler} = props;
    return(
        <div style={{ backgroundColor: "#D3D0CB" }}>
            <div className={'row'}>
                <div className={'col'}>
                    <img src={Logo} alt={'Logo'}/>
                </div>
                <div className={'col'}>
                    <button className={'btn btn-link'}><Link to={button1URL}>{button1}</Link></button>
                {
                    handler? <button className={'btn btn-link'} onClick={handler}>Logout</button>:
                        <button className={'btn btn-link'}><Link to={button2URL}>{button2}</Link></button>
                }
                </div>
            </div>
        </div>
    )
}

export default NavButtons;