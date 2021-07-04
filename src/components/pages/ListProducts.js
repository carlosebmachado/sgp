import React from 'react';
import Header from '../Header';
import ContentWrapper from '../ContentWrapper';
import SideMenu from '../SideMenu';
import Tab from '../Tab';
import ProductsTable from '../ProductsTable';

function ListProducts() {
  return (
    <div className="ListProducts">
      <Header />
      <ContentWrapper>
        <SideMenu />
        <Tab>
          <ProductsTable />
        </Tab>
      </ContentWrapper>
    </div>
  );
}

export default ListProducts;
