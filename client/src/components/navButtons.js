import React from "react";
import {Link} from "@reach/router";


const NavButtons = (props)=>{
    const {button1, handler1, button2, handler2, image} = props;
    return(
        <div className={'row'}>
            <div className={'col'}>
                <img src={image} alt={'Logo'}/>
            </div>
            <div className={'col'}>
                <button onClick={handler1}>{button1}</button><button onClick={handler2}>{button2}</button>
            </div>
        </div>
    )
}

export default NavButtons;