import React from 'react';
import '../styles/SideMenu.css';


function SideMenu() {
  return (
    <nav className="SideMenu">
      <header className="TitleBg">
        <h3>Menu</h3>
      </header>
      <ul>
        <li><a href="/list">Listar produtos</a></li>
        <li><a href="/manage">Cadastrar produto</a></li>
      </ul>
      <footer>
        <small>By Carlos Machado.</small>
      </footer>
    </nav>
  );
}

export default SideMenu;
