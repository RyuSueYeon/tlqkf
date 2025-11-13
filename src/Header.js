/* eslint-disable */

import blogTitle from './logo.svg';
import './Header.css';
import React, { useState } from 'react';

function Header({ setCurrentPage }) {

  const handleNavClick = (e, page) => {
    e.preventDefault(); // 기본 링크 동작 방지
    setCurrentPage(page);
  };
  
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="./" className="logo navbar-brand" onClick={(e) => handleNavClick(e, 'home')}>RyuSuyeon</a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="./" className="nav-link active navbar-text" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link navbar-text" onClick={(e) => handleNavClick(e, 'lol')}>롤 내전</a>
          </li>

          
        </ul>
      </div>
    </nav>
  );
}


export default Header;
