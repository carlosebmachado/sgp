import React from 'react';
import Header from '../Header';
import Breadcrumb from '../Breadcrumb';
import ContentWrapper from '../ContentWrapper';
import SideMenu from '../SideMenu';
import Tab from '../Tab';
import ProductsTable from '../ProductsTable';


function ListProducts() {
  return (
    <div className="ListProducts">
      <Header />
      <Breadcrumb>
        <a href="/home" className="BCs">Início /</a><span className="BCs">Listar Produtos</span>
      </Breadcrumb>
      <ContentWrapper>
        <SideMenu />
        <Tab>
          {/* conteúdo principal */}
          <ProductsTable />
        </Tab>
      </ContentWrapper>
    </div>
  );
}

export default ListProducts;
