import React from 'react';
import '../styles/SideMenu.css';

function SideMenu(props) {

    return (
        <nav className="SideMenu">
            <div className="TitleBg">
                <h3>Menu</h3>
            </div>
            <ul>
                <li><div onClick={() => {props.onClick(0)}}>Listar produtos</div></li>
                <li><div onClick={() => {props.onClick(1)}}>Cadastrar produto</div></li>
            </ul>
        </nav>
    );
}

export default SideMenu;
