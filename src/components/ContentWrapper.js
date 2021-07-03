import React, { useState } from 'react';
import '../styles/ContentWrapper.css';

import SideMenu from './SideMenu';
import Page from './pages/Page';
import ListProducts from './pages/ListProducts';
import ProductsForm from './pages/ProductsForm';

function ContentWrapper() {
    const [curPage, setPage] = useState(0);
    const [id, setId] = useState('');

    function setPageWithId(page, id = '') {
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
                <Page><ProductsForm id={id} onClick={setPageWithId}/></Page>
            }
        </div>
    );
}

export default ContentWrapper;
