import React from 'react';
import Header from '../Header';
import ContentWrapper from '../ContentWrapper';
import SideMenu from '../SideMenu';
import Tab from '../Tab';
import ProductsForm from '../ProductsForm';

function ManageProducts() {
  return (
    <div className="ManageProducts">
      <Header />
      <ContentWrapper>
        <SideMenu />
        <Tab>
          <ProductsForm />
        </Tab>
      </ContentWrapper>
    </div>
  );
}

export default ManageProducts;
