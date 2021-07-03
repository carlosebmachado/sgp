import React, { useState } from 'react';
import SideMenu from './SideMenu';
import Page from './pages/products/Tab';
import ListProducts from './pages/products/ListProducts';
import ProductsForm from './pages/products/ProductsForm';
import '../styles/ContentWrapper.css';


function ContentWrapper() {
  const [curPage, setPage] = useState(0);
  const [id, setId] = useState('');

  function setPageWithId(page, id = '') {
    setPage(page);
    setId(id);
  }

  return (
    <div className="ContentWrapper">
      <SideMenu onClick={setPageWithId} />
      {
        curPage === 0 ?
          <Page><ListProducts onClick={setPageWithId} /></Page>
          :
          <Page><ProductsForm id={id} onClick={setPageWithId} /></Page>
      }
    </div>
  );
}

export default ContentWrapper;
