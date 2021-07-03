import React from 'react';
import Button from '../Button';
import Message from '../Message';
import DAO from '../DAO';
import '../../styles/ListProducts.css';


class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tableData: DAO.listProducts(), success: false };

    this.editProduct = this.editProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  // Go to product page recovering the product from id.
  editProduct(id) {
    this.props.onClick(1, id);
  }

  // Go to product page to add a new product.
  addProduct(param) {
    this.props.onClick(1, '');
  }

  // Delete a product from id.
  deleteProduct(id) {
    DAO.deleteProduct(id);
    this.setState({ tableData: DAO.listProducts() });
    this.setState({ success: true });
  }

  render() {
    return (
      <div className="ListProducts">
        <h2>Listar Produtos</h2>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Un. de Medida</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Perecível?</th>
              <th>Data de Validade</th>
              <th>Data de Fabracação</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.tableData.map(p => {
              return (
                <tr key={p['id']}>
                  <td>{p['name']}</td>
                  <td>{p['unity']}</td>
                  <td>{p['amount']}</td>
                  <td>{p['price']}</td>
                  <td>{p['perishable'] ? 'Sim' : 'Não'}</td>
                  <td>{p['fabDate']}</td>
                  <td>{p['expDate']}</td>
                  <td><Button onClick={(event) => this.editProduct(event)} param={p['id']}>Editar</Button></td>
                  <td><Button onClick={(event) => this.deleteProduct(event)} param={p['id']} color="var(--color-danger)">Excluir</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {
          this.state.success ?
            <Message>Produto removido com sucesso.</Message>
            :
            ""
        }

        <Button onClick={this.addProduct}>Adicionar Produto</Button>
      </div>
    );
  }
}

export default ListProducts;
