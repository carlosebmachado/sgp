import './SideMenu.css';

function SideMenu(){
    return (
        <nav className="SideMenu">
            <h3>Menu</h3>
            <ul>
                <li><a href="">Listar produtos</a></li>
                <li><a href="">Cadastrar produto</a></li>
            </ul>
        </nav>
    );
}

export default SideMenu;
