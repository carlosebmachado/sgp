import React from 'react';
import Button from './Button';
import Link from './Link';
import Message from './Message';
import PopUp from './Popup';
import DAO from './scripts/DAO';
import '../styles/ProductsTable.css';


class ProductsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { tableData: DAO.listProducts(), id: '', success: false, error: false, question: false };

    this.deleteProduct = this.deleteProduct.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
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
                  <td><Link href={'/manage?id=' + p['id']}>Editar</Link></td>
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

        <Link href="/manage">Adicionar Produto</Link>

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

export default ProductsTable;
