import React from 'react';
import DAO from './scripts/DAO';
import Mask from './scripts/Mask';
import Link from './Link';
import Message from './Message';
import moment from 'moment';
import '../styles/ProductsForm.css';


class ProductsForm extends React.Component {
  constructor(props) {
    super(props);

    var url = new URL(window.location.href);
    var id = url.searchParams.get('id');

    // se o id foi passado e existe no lcoalStorage
    // então estamos editando
    if (id != null && DAO.existsProduct(id)) {
      var editProduct = DAO.selectProduct(id);

      // aplica as máscaras
      if (editProduct['unity'] === 'Litro') {
        editProduct['amount'] = Mask.normalizeLiter(editProduct['amount']);
      } else if (editProduct['unity'] === 'Quilograma') {
        editProduct['amount'] = Mask.normalizeKilo(editProduct['amount']);
      } else {
        editProduct['amount'] = String(editProduct['amount']) + ' un';
      }
      editProduct['price'] = Mask.currencyMask(Mask.normalizeCurrency(editProduct['price']));
      editProduct['fabDate'] = Mask.dateToPtBr(editProduct['fabDate']);
      if (editProduct['expDate'] !== '')
        editProduct['expDate'] = Mask.dateToPtBr(editProduct['expDate']);

      this.state = {
        id: editProduct['id'],
        name: editProduct['name'],
        unity: editProduct['unity'],
        amount: editProduct['amount'],
        price: editProduct['price'],
        fabDate: editProduct['fabDate'],
        expDate: editProduct['expDate'],
        perishable: editProduct['perishable'],
        error: false,
        message: 'Por favor, preencha todos os campos.'
      };
    } else {
      // senão estamos adicionando
      this.state = {
        id: '',
        name: '',
        unity: 'none',
        amount: '',
        price: 'R$ 0,00',
        fabDate: '__/__/____',
        expDate: '__/__/____',
        perishable: false,
        error: false,
        message: 'Por favor, preencha todos os campos.'
      };
    }

    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUnityChange = this.handleUnityChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleFabDateChange = this.handleFabDateChange.bind(this);
    this.handleExpDateChange = this.handleExpDateChange.bind(this);
    this.handlePerishableChange = this.handlePerishableChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getActivityName = this.getActivityName.bind(this);
    this.setMandatory = this.setMandatory.bind(this);
    this.setError = this.setError.bind(this);
  }

  handleIdChange(event) {
    this.setState({ id: event.target.value });
  }

  handleNameChange(event) {
    // aplica o limite de caracteres e a obrigatoriedade de letras
    var value = Mask.removeNonLetter(event.target.value);
    value = Mask.limitMask(value, 50);
    this.setState({ name: value });
  }

  handleUnityChange(event) {
    // aplica as máscaras dependendo da un. de medida selecionada
    if (event.target.value === 'Litro') {
      this.setState({ amount: Mask.literMask(this.state.amount) });
    } else if (event.target.value === 'Quilograma') {
      this.setState({ amount: Mask.kiloMask(this.state.amount) });
    } else if (event.target.value === 'Unidade') {
      this.setState({ amount: Mask.unityMask(this.state.amount) });
    } else {
      this.setState({ amount: '' });
    }
    this.setState({ unity: event.target.value });
  }

  handleAmountChange(event) {
    var value = '';
    // só gerencia as máscaras se alguma unidade tiver sido selecionada
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
    // aplica a máscara monetária
    var value = Mask.currencyMask(event.target.value);
    this.setState({ price: value });
  }

  handleFabDateChange(event) {
    // aplica a máscara de data
    var value = Mask.dateMask(event.target.value);
    this.setState({ fabDate: value });
  }

  handleExpDateChange(event) {
    // aplica a máscara de data
    var value = Mask.dateMask(event.target.value);
    this.setState({ expDate: value });
  }

  handlePerishableChange(event) {
    // gerencia o aviso de obrigatoriedade da data de validade
    this.setMandatory('#expDate', event.target.checked);
    this.setState({ perishable: event.target.checked });
  }

  // Salva ou Atualiza um produto.
  handleSubmit(event) {
    var someError = false;

    // vai gerar erro:

    // se o nome for vazio
    if (this.state.name === '') {
      this.setError('#name', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    // se a unidade de medida não tiver sido selecionada
    if (this.state.unity === 'none') {
      this.setError('#unity', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    // se o preço estiver vazio
    if (this.state.price === 'R$ 0,00') {
      this.setError('#price', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    // se a data de fabricação for inválida
    if (!moment(this.state.fabDate, 'DD/MM/YYYY').isValid()) {
      this.setError('#fabDate', true);
      this.setState({ message: 'Data inválida.' })
      someError = true;
    }
    // se for perecível e a data de fabricação for inválida
    if (this.state.perishable && !moment(this.state.expDate, 'DD/MM/YYYY').isValid()) {
      this.setError('#expDate', true);
      this.setState({ message: 'Por favor, preencha todos os campos.' })
      someError = true;
    }
    // se for perecível e data de fabricação for maior que a data de validade
    if (this.state.perishable) {
      if (Date.parse(Mask.dateToGlobal(this.state.fabDate)) > Date.parse(Mask.dateToGlobal(this.state.expDate))) {
        this.setError('#fabDate', true);
        this.setError('#expDate', true);
        this.setState({ message: 'A data de fabricação não pode ser maior que a data de validade.' })
        someError = true;
      }
    }
    // se a data de validade for menor que a data atual
    if (this.state.perishable && Date.parse(Date()) > Date.parse(Mask.dateToGlobal(this.state.expDate))) {
      this.setError('#expDate', true);
      this.setState({ message: 'O produto está vencido.' })
      someError = true;
    }

    // se houver algum erro o produto não é inserido
    if (someError) {
      this.setState({ error: true });
      event.preventDefault();
      return;
    } else {
      this.setState({ error: false });
    }

    // cria o produto 'json'
    var product = {};
    product['name'] = this.state.name;
    product['unity'] = this.state.unity;
    product['amount'] = this.state.amount;
    product['price'] = this.state.price;
    product['fabDate'] = this.state.fabDate;
    product['expDate'] = this.state.expDate;
    product['perishable'] = this.state.perishable;

    // converte os dados
    if (product['unity'] === 'Litro') {
      product['amount'] = parseFloat(Mask.removeLiterMask(product['amount']));
    } else if (product['unity'] === 'Quilograma') {
      product['amount'] = parseFloat(Mask.removeKiloMask(product['amount']));
    } else {
      var amount = Mask.removeUnityMask(product['amount']);
      product['amount'] = parseInt(amount !== '' ? amount : '0', 10);
    }
    product['price'] = parseFloat(Mask.removeCurrencyMask(product['price']));
    product['fabDate'] = Mask.dateToGlobal(product['fabDate']);
    product['expDate'] = Mask.dateToGlobal(product['expDate']);

    // se o produto não for perecível a máscara vazia é removida
    if (product['expDate'] === '____-__-__') {
      product['expDate'] = '';
    }

    // se o id não é vazio, então o produto é editado
    if (this.state.id !== '') {
      product['id'] = this.state.id;
      DAO.updateProduct(product);
    } else {
      // senão um novo produto é adicionado
      product['id'] = DAO.countProducts();
      DAO.insertProduct(product);
    }
  }

  // Aplica a classe Mandatory para o id passado.
  setMandatory(id, value) {
    var expDateInput = document.querySelector(id);
    if (value)
      expDateInput.setAttribute('class', 'Mandatory');
    else
      expDateInput.setAttribute('class', '');
  }

  // Aplica a classe Error para o id passado.
  setError(id, value) {
    var expDateInput = document.querySelector(id);
    if (value)
      expDateInput.setAttribute('class', 'Error');
    else
      expDateInput.setAttribute('class', '');
  }

  // Pega o título da página.
  getActivityName() {
    return this.state.id !== '' ? 'Editar' : 'Cadastrar';
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
          <label style={{ display: 'inline-block', marginLeft: 15 }}>Perecível</label>
        </div>

        {/* Error Message */}
        {
          this.state.error ?
            <Message color="var(--color-error)">{this.state.message}</Message>
            :
            ""
        }

        <small className="MandatoryNotice"><div></div> Campos em amarelo são obrigatórios.</small>

        {/* botões de salvar e cancelar */}
        <input type="submit" value="Salvar" />
        <Link href="/list" color="var(--color-danger)">Cancelar</Link>
      </form>
    );
  }
}

export default ProductsForm;
