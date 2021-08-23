import React from "react";
import {Link} from "@reach/router";


const NavButtons = (props)=>{
    const {button1, button1URL, button2, button2URL, image} = props;
    return(
        <div className={'row'}>
            <div className={'col'}>
                <img src={image} alt={'Logo'}/>
            </div>
            <div className={'col'}>
                <Link to={button1URL} className={'btn'}>{button1}</Link><Link to={button2URL} className={'btn'}>{button2}</Link>
            </div>
        </div>
    )
}

export default NavButtons;