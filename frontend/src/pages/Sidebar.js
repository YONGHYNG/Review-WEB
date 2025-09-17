import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
    return (
        <nav className="sidebar">
            <div className="sidebar-header">
                <h1>My Community</h1>
            </div>
            <ul className="category-list">
                <li>
                    {/* to="/"는 홈페이지를 의미합니다. */}
                    <NavLink to="/" end>홈</NavLink>
                </li>
                <li>
                    <NavLink to="/item">관심종목</NavLink>
                </li>
                <li>
                    <NavLink to="/market">장터</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;