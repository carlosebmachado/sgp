import { useState } from 'react';
import '../styles/ContentWrapper.css';

import SideMenu from './SideMenu';
import Page from './pages/Page';
import ListProducts from './pages/ListProducts';
import NewProduct from './pages/NewProduct';

function ContentWrapper() {
    const [curPage, setPage] = useState(1);
    const [id, setId] = useState(null);

    function setPageWithId(page, id = null) {
        setPage(page);
        setId(id);
    }

    return (
        <div className="ContentWrapper">
            <SideMenu onClick={setPageWithId}/>
            {
                curPage === 0 ?
                <Page><ListProducts onClick={setPageWithId}/></Page>
                :
                <Page><NewProduct id={id} onClick={setPageWithId}/></Page>
            }
        </div>
    );
}

export default ContentWrapper;
