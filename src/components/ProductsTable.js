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

    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // Aplica o id a ser deletado no state e achama o popup de exclusão.
  handleDeleteProduct(id) {
    this.setState({ question: true });
    this.setState({ id: id });
  }

  // Deleta o produto do id contido no state.
  handleConfirm() {
    DAO.deleteProduct(this.state.id);
    this.setState({ tableData: DAO.listProducts() });
    this.setState({ success: true });
    this.setState({ error: false });
    this.setState({ question: false });
  }

  // Cancela a exclusão.
  handleCancel() {
    this.setState({ success: false });
    this.setState({ error: true });
    this.setState({ question: false });
  }

  render() {
    return (
      <div className="ListProducts">
        <h2>Listar Produtos</h2>

        {/* Table */}
        <div className="TableWrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
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
                    <td>{p['id']}</td>
                    <td>{p['name']}</td>
                    <td>{p['unity']}</td>
                    <td>{p['amount']}</td>
                    <td>{p['price']}</td>
                    <td>{p['perishable'] ? 'Sim' : 'Não'}</td>
                    <td>{p['fabDate']}</td>
                    <td>{p['expDate']}</td>
                    <td><Link href={'/manage?id=' + p['id']}>Editar</Link></td>
                    <td><Button onClick={(event) => this.handleDeleteProduct(event)} param={p['id']} color="var(--color-danger)">Excluir</Button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Success Message */}
        {
          this.state.success ?
            <Message>Produto excluído com sucesso.</Message>
            :
            ""
        }

        {/* Failure Message */}
        {
          this.state.error ?
            <Message color="var(--color-error)">Produto não excluído.</Message>
            :
            ""
        }

        <Link href="/manage">Adicionar Produto</Link>

        {/* Question Box */}
        {
          this.state.question ?
            <PopUp title="Aviso" message="Você tem certeza que deseja excluir o item?" cancel={this.handleCancel} confirm={this.handleConfirm}></PopUp>
            :
            ""
        }
      </div>
    );
  }
}

export default ProductsTable;
