import React from "react";
import {Link} from "@reach/router";


const NavButtons = (props)=>{
    const {button1, button1URL, button2, button2URL, image, handler} = props;
    return(
        <div style={{ backgroundColor: "#D3D0CB" }}>
            <div className={'row'}>
                <div className={'col'}>
                    <img src={image} alt={'Logo'}/>
                </div>
                <div className={'col'}>
                    <button className={'btn btn-link'} onClick={handler}>{button1}</button><Link to={button2URL} className={'btn'}>{button2}</Link>

                </div>
            </div>
        </div>
    )
}

export default NavButtons;