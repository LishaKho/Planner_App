import React from "react";
import {Link} from "@reach/router";
import Logo from "./images/logo.png";


const NavButtons = (props)=>{
    const {button1, button1URL, button2, button2URL, handler} = props;
    return(
        <div style={{ backgroundColor: "#D2E5266" }}>
            <div className={'row '} style={{ backgroundColor: "#6E8898" }}>
                <div className={'col'}>
                    <img src={Logo} alt={'Logo'}/>
                </div>
                <div className={'col navbar-alignment'}>
                    <button className={'btn btn-link nav-button'}><Link to={button1URL}>{button1}</Link></button>
                {
                    handler? <button className={'nav-button btn btn-link'} onClick={handler}>Logout</button>:
                        <button className={'nav-button btn btn-link'}><Link to={button2URL}>{button2}</Link></button>
                }
                </div>
            </div>
        </div>
    )
}

export default NavButtons;