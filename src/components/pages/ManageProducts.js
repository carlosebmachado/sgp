import React from 'react';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import ContentWrapper from '../ContentWrapper';
import SideMenu from '../SideMenu';
import Tab from '../Tab';
import ProductsForm from '../ProductsForm';


function ManageProducts() {
  return (
    <div className="ManageProducts">
      <Header />
      <Breadcrumb>
        <a href="/home" className="BCs">Início /</a><a href="/list" className="BCs">Listar Produtos /</a><span className="BCs">Gerenciar Produto</span>
      </Breadcrumb>
      <ContentWrapper>
        <SideMenu />
        <Tab>
          {/* conteúdo principal */}
          <ProductsForm />
        </Tab>
      </ContentWrapper>
    </div>
  );
}

export default ManageProducts;
