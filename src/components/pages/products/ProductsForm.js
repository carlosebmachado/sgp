import React from 'react';
import DAO from '../../scripts/DAO';
import Mask from '../../scripts/Mask';
import Button from '../../Button';
import Message from '../../Message';
import moment from 'moment';
import '../../../styles/ProductsForm.css';


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
        price: editProduct['price'],
        fabDate: editProduct['fabDate'],
        expDate: editProduct['expDate'],
        perishable: editProduct['perishable'],
        error: false
      };
    } else {
      this.state = { id: '', name: '', unity: 'none', amount: '', price: 'R$ 0,00', fabDate: '__/__/____', expDate: '__/__/____', perishable: false, error: false, message: 'Por favor, preencha todos os campos.' };
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
    this.setMandatory = this.setMandatory.bind(this);
    this.setError = this.setError.bind(this);
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value });
  }

  handleNameChange(event) {
    var value = Mask.removeNonLetter(event.target.value);
    value = Mask.limitMask(value, 50);
    this.setState({ name: value });
  }

  handleUnityChange(event) {
    this.setState({ unity: event.target.value });
  }

  handleAmountChange(event) {
    var value = '';
    if (this.state.unity === 'Litro') {
      value = Mask.literMask(event.target.value);
    } else if (this.state.unity === 'Quilograma') {
      value = Mask.kiloMask(event.target.value);
    } else if (this.state.unity === 'Unidade') {
      value = Mask.unityMask(event.target.value);
    }
    this.setState({ amount: value });
  }

  handlePriceChange(event) {
    var value = Mask.currencyMask(event.target.value);
    this.setState({ price: value });
  }

  handleFabDateChange(event) {
    var value = Mask.dateMask(event.target.value);
    this.setState({ fabDate: value });
  }

  handleExpDateChange(event) {
    var value = Mask.dateMask(event.target.value);
    this.setState({ expDate: value });
  }

  handlePerishableChange(event) {
    this.setMandatory('#expDate', event.target.checked);
    this.setState({ perishable: event.target.checked });
  }

  // Save or update the new product.
  handleSubmit(event) {
    var someError = false;

    if (this.state.name === '') {
      this.setError('#name', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    if (this.state.unity === 'none') {
      this.setError('#unity', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    if (this.state.price === 'R$ 0,00') {
      this.setError('#price', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    if (!moment(this.state.fabDate, 'DD/MM/YYYY').isValid()) {
      this.setError('#fabDate', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    if (this.state.perishable && !moment(this.state.expDate, 'DD/MM/YYYY').isValid()) {
      this.setError('#expDate', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    if (this.state.perishable) {
      if(Date.parse(Mask.dateToGlobal(this.state.fabDate)) > Date.parse(Mask.dateToGlobal(this.state.expDate))){
        this.setError('#fabDate', true);
        this.setError('#expDate', true);
        this.setState({ message: 'A data de fabricação não pode ser maior que a data de validade.' })
        someError = true;
     }
    }
    if(this.state.perishable && Date.parse(Date()) > Date.parse(Mask.dateToGlobal(this.state.expDate))){
      this.setError('#expDate', true);
      this.setState({ message: 'O produto está vencido.' })
      someError = true;
   }
    
    if (someError) {
      this.setState({ error: true });
      event.preventDefault();
      return;
    } else {
      this.setState({ error: false });
    }

    // create the product json
    var product = {};
    product['name'] = this.state.name;
    product['unity'] = this.state.unity;
    product['amount'] = this.state.amount;
    product['price'] = this.state.price;
    product['fabDate'] = this.state.fabDate;
    product['expDate'] = this.state.expDate;
    product['perishable'] = this.state.perishable;
    
    // remove date mask if the product is perishable
    if (!this.state.perishable) {
      product['expDate'] = '';
    }

    if (this.state.id !== '') {
      // if id is not empty, it'll update
      product['id'] = this.state.id;
      DAO.updateProduct(product);
    } else {
      // if id is empty, it'll add as new product
      product['id'] = DAO.countProducts();
      DAO.insertProduct(product);
    }

    this.clear();
    event.preventDefault();
  }

  setMandatory(id, value) {
    var expDateInput = document.querySelector(id);
    if (value)
      expDateInput.setAttribute('class', 'Mandatory');
    else
      expDateInput.setAttribute('class', '');
  }

  setError(id, value) {
    var expDateInput = document.querySelector(id);
    if (value)
      expDateInput.setAttribute('class', 'Error');
    else
      expDateInput.setAttribute('class', '');
  }

  // Set all values to default.
  clear() {
    this.setState({ id: '' });
    this.setState({ name: '' });
    this.setState({ unity: 'none' });
    this.setState({ amount: '' });
    this.setState({ price: 'R$ 0,00' });
    this.setState({ fabDate: '__/__/____' });
    this.setState({ expDate: '__/__/____' });
    this.setState({ perishable: false });
    this.setMandatory('#name', true);
    this.setMandatory('#unity', true);
    this.setMandatory('#price', true);
    this.setMandatory('#fabDate', true);
    this.setMandatory('#expDate', false);
  }

  // Get page title.
  getActivityName() {
    return this.state.id !== '' ? 'Editar' : 'Cadastrar';
  }

  // Cancel insert/update and returns to list products.
  cancel(param) {
    this.props.onClick(param);
  }

  render() {
    return (
      <form className="ProductsForm" onSubmit={this.handleSubmit}>
        <h2>{this.getActivityName()} Produto</h2>

        {/* ID */}
        <input type="hidden" id="id" value={this.state.id} onChange={this.handleIdChange}></input>

        {/* Name */}
        <div className="FormGroup Size100">
          <label>Nome</label>
          <input type="text" id="name" className="Mandatory" value={this.state.name} onChange={this.handleNameChange}></input>
        </div>

        {/* Unit of Measurement */}
        <div className="FormGroup Size33">
          <label>Un. de Medida</label>
          <select id="unity" className="Mandatory" value={this.state.unity} onChange={this.handleUnityChange}>
            <option value="none">Selecione a un. de medida</option>
            <option value="Litro">Litro</option>
            <option value="Quilograma">Quilograma</option>
            <option value="Unidade">Unidade</option>
          </select>
        </div>

        {/* Amount */}
        <div className="FormGroup Size33">
          <label>Quantidade</label>
          <input type="text" id="amount" value={this.state.amount} onChange={this.handleAmountChange}></input>
        </div>

        {/* Price */}
        <div className="FormGroup Size33">
          <label>Preço</label>
          <input type="text" id="price" className="Mandatory" value={this.state.price} onChange={this.handlePriceChange}></input>
        </div>

        {/* Manufacturing Date */}
        <div className="FormGroup Size50">
          <label>Data de Fabricação</label>
          <input type="text" id="fabDate" className="Mandatory" value={this.state.fabDate} onChange={this.handleFabDateChange}></input>
        </div>

        {/* Expirations Date */}
        <div className="FormGroup Size50">
          <label>Data de Validade</label>
          <input type="text" id="expDate" value={this.state.expDate} onChange={this.handleExpDateChange}></input>
        </div>

        {/* Is Perishable */}
        <div className="FormGroup Size100">
          <input type="checkbox" id="perishable" defaultChecked={this.state.perishable ? 'checked' : ''} onChange={this.handlePerishableChange} />
          <label style={{ display: 'inline-block', marginLeft: 15 }}>Perecível?</label>
        </div>

        {
          this.state.error ?
            <Message color="var(--color-error)">{this.state.message}</Message>
            :
            ""
        }

        <input type="submit" value="Salvar" />
        <Button color="var(--color-danger)" onClick={(event) => this.cancel(event)} param={0}>Cancelar</Button>
      </form>
    );
  }
}

// export default NewProduct;
export default ProductsForm;
