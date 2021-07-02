import './ContentWrapper.css';

import SideMenu from './SideMenu';
import ListProducts from './pages/ListProducts';

function ContentWrapper(){
    return (
        <div className="ContentWrapper">
            <SideMenu />
            <ListProducts />
        </div>
    );
}

export default ContentWrapper;
