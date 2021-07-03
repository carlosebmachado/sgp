import React from 'react';
import Button from '../../Button';
import Message from '../../Message';
import PopUp from '../../Popup';
import DAO from '../../scripts/DAO';
import '../../../styles/ListProducts.css';


class ListProducts extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tableData: DAO.listProducts(), id: '', success: false, error: false, question: false };

    this.editProduct = this.editProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  // Go to product page recovering the product from id.
  editProduct(id) {
    this.props.onClick(1, id);
  }

  // Go to product page to add a new product.
  addProduct(param) {
    this.props.onClick(1, '');
  }

  // Set id to delete and call delete popup menu.
  deleteProduct(id) {
    this.setState({ question: true });
    this.setState({ id: id});
  }

  // Delete a product from id.
  confirm() {
    DAO.deleteProduct(this.state.id);
    this.setState({ tableData: DAO.listProducts() });
    this.setState({ success: true });
    this.setState({ error: false });
    this.setState({ question: false });
  }

  cancel() {
    this.setState({ success: false });
    this.setState({ error: true });
    this.setState({ question: false });
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
            <Message>Produto excluído com sucesso.</Message>
            :
            ""
        }
        {
          this.state.error ?
            <Message color="var(--color-error)">Produto não excluído.</Message>
            :
            ""
        }

        <Button onClick={this.addProduct}>Adicionar Produto</Button>

        {
          this.state.question ?
            <PopUp title="Aviso" message="Você tem certeza que deseja excluir o item?" cancel={this.cancel} confirm={this.confirm}></PopUp>
            :
            ""
        }
      </div>
    );
  }
}

export default ListProducts;
