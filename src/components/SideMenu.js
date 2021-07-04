import React from 'react';
import '../styles/SideMenu.css';

function SideMenu(props) {

  return (
    <nav className="SideMenu">
      <div className="TitleBg">
        <h3>Menu</h3>
      </div>
      <ul>
        <li><a href="/list">Listar produtos</a></li>
        <li><a href="/manage">Cadastrar produto</a></li>
      </ul>
    </nav>
  );
}

export default SideMenu;
