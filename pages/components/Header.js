import globalConstants from '@/Utilities/globalConstants';
import React, { useEffect, useState } from 'react';
import { FaUser } from "react-icons/fa";

const Header = () => {

    return (
        <nav className="navbar">
            <div className="logo">
                <a href='/'>
                    <img src={globalConstants.logoImgUrl} alt='logo' />
                </a>
            </div>

            {/* <div className="search">
                <input type="text" placeholder="Search..." />
            </div> */}

            <div className="user">
                <FaUser size={30} className='user-icon' />
            </div>
        </nav>
    );
};

export default Header;
