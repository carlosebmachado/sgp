import React from 'react';
import DAO from '../DAO';
import Mask from '../Mask';
import Button from '../Button';
import '../../styles/ProductsForm.css';


class ProductsForm extends React.Component {
  constructor(props) {
    super(props);

    if (props.id !== '') {
      var editProduct = DAO.selectProduct(props.id);
      this.state = { 
        id: editProduct['id'],
        name: editProduct['name'],
        unity: editProduct['unity'],
        amount: editProduct['amount'],
        price: Mask.currencyMask(editProduct['price']),
        fabDate: editProduct['fabDate'],
        expDate: editProduct['expDate'],
        perishable: editProduct['perishable']
      };
    } else {
      this.state = { id: '', name: '', unity: '', amount: '', price: 'R$ 0,00', fabDate: '', expDate: '', perishable: false };
    }

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUnityChange = this.handleUnityChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleFabDateChange = this.handleFabDateChange.bind(this);
    this.handleExpDateChange = this.handleExpDateChange.bind(this);
    this.handlePerishableChange = this.handlePerishableChange.bind(this);
    this.clear = this.clear.bind(this);
    this.getActivityName = this.getActivityName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleUnityChange(event) {
    this.setState({ unity: event.target.value });
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handlePriceChange(event) {
    var value = Mask.currencyMask(event.target.value);
    this.setState({ price: value });
  }

  handleFabDateChange(event) {
    this.setState({ fabDate: event.target.value });
  }

  handleExpDateChange(event) {
    this.setState({ expDate: event.target.value });
  }

  handlePerishableChange(event) {
    var expDateInput = document.querySelector('#expDate');

    if (event.target.checked === false)
      expDateInput.setAttribute('class', '');
    else
      expDateInput.setAttribute('class', 'Mandatory');

    this.setState({ perishable: event.target.checked });
  }

  // Save or update the new product.
  handleSubmit(event) {
    var product = {};

    product['name'] = this.state.name;
    product['unity'] = this.state.unity;
    product['amount'] = this.state.amount;
    product['price'] = this.state.price;
    product['fabDate'] = this.state.fabDate;
    product['expDate'] = this.state.expDate;
    product['perishable'] = this.state.perishable;

    if (this.state.id !== '') {
      product['id'] = this.state.id;
      DAO.updateProduct(product);
    } else {
      product['id'] = DAO.countProducts();
      DAO.insertProduct(product);
    }

    this.clear();

    event.preventDefault();
  }

  // Set all values to default.
  clear() {
      this.setState({ id: '' });
      this.setState({ name: '' });
      this.setState({ unity: '' });
      this.setState({ amount: '' });
      this.setState({ price: '' });
      this.setState({ fabDate: '' });
      this.setState({ expDate: '' });
      this.setState({ perishable: false });
  }

  getActivityName() {
    return this.state.id !== '' ? 'Editar' : 'Cadastrar';
  }
  
  cancel(param) {
    this.props.onClick(param);
  }

  render() {
    return (
      <form className="ProductsForm" onSubmit={this.handleSubmit}>
        <h2>{this.getActivityName()} Produto</h2>

        <input type="hidden" id="id" value={this.state.id} onChange={this.handleIdChange}></input>

        <div className="FormGroup Size100">
          <label>Nome</label>
          <input type="text" id="name" className="Mandatory" value={this.state.name} onChange={this.handleNameChange}></input>
        </div>

        <div className="FormGroup Size33">
          <label>Un. de Medida</label>
          <input type="text" id="unity" className="Mandatory" value={this.state.unity} onChange={this.handleUnityChange}></input>
        </div>

        <div className="FormGroup Size33">
          <label>Quantidade</label>
          <input type="text" id="amount" value={this.state.amount} onChange={this.handleAmountChange}></input>
        </div>

        <div className="FormGroup Size33">
          <label>Preço</label>
          <input type="text" id="price" className="Mandatory" value={this.state.price} onChange={this.handlePriceChange}></input>
        </div>

        <div className="FormGroup Size50">
          <label>Data de Fabricação</label>
          <input type="text" id="fabDate" className="Mandatory" value={this.state.fabDate} onChange={this.handleFabDateChange}></input>
        </div>

        <div className="FormGroup Size50">
          <label>Data de Validade</label>
          <input type="text" id="expDate" value={this.state.expDate} onChange={this.handleExpDateChange}></input>
        </div>

        <div className="FormGroup Size100">
          <input type="checkbox" id="perishable" defaultChecked={this.state.perishable ? 'checked' : ''}  onChange={this.handlePerishableChange} />
          <label style={{ display: 'inline-block', marginLeft: 15 }}>Perecível?</label>
        </div>

        <input type="submit" value="Salvar" />
        {/* <Button onClick={saveProduct}>Salvar</Button> */}
        <Button color="var(--color-danger)" onClick={(event) => this.cancel(event)} param={0}>Cancelar</Button>
      </form>
    );
  }
}


// export default NewProduct;
export default ProductsForm;
