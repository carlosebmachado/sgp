import { useState } from 'react';
import '../../styles/NewProduct.css';

import DAO from './../DAO';
import Button from '../Button';

function NewProduct(props) {
    var editProduct = {'_id': '', 'name': '', 'unity': '', 'amount': '', 'price': '', 'fab-date': '', 'exp-date': '', 'perishable': false};

    function initialVerification() {
        if (props.id !== null) {
            editProduct = DAO.selectProduct(props.id);
        }
    }

    function handleMandatoryExpDate() {
        var expDateInput = document.querySelector('#exp-date');
        if (expDateInput.getAttribute('class') === 'Mandatory')
            expDateInput.setAttribute('class', '');
        else
            expDateInput.setAttribute('class', 'Mandatory');
    }

    function getActivityName() {
        return props.id !== null ? 'Editar' : 'Cadastrar';
    }

    function saveProduct(param) {
        var id = document.querySelector('#_id').value;
        var name = document.querySelector('#name').value;
        var unity = document.querySelector('#unity').value;
        var amount = document.querySelector('#amount').value;
        var price = document.querySelector('#price').value;
        var fabDate = document.querySelector('#fab-date').value;
        var expDate = document.querySelector('#exp-date').value;
        var perishable = document.querySelector('#perishable').checked;

        var product = {};

        product['name'] = name;
        product['unity'] = unity;
        product['amount'] = amount;
        product['price'] = price;
        product['fab-date'] = fabDate;
        product['exp-date'] = expDate;
        product['perishable'] = perishable;

        if (id !== '') {
            product['_id'] = id;
            DAO.updateProduct(product);
        } else {
            id = DAO.countProducts();
            product['_id'] = id;
            DAO.insertProduct(product);
        }

        clear();
    }

    function clear() {
        document.querySelector('#_id').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#unity').value = '';
        document.querySelector('#amount').value = '';
        document.querySelector('#price').value = '';
        document.querySelector('#fab-date').value = '';
        document.querySelector('#exp-date').value = '';
        document.querySelector('#perishable').checked = false;
    }

    function cancel(param) {
        props.onClick(0);
    }

    return (
        <div className="NewProduct">
            {initialVerification()}
            <h2>{getActivityName()} Produto</h2>
            <form>
                <input type="hidden" id="_id" value={editProduct['_id']}></input>
                <div className="FormGroup Size100">
                    <label>Nome</label>
                    <input type="text" id="name" className="Mandatory" defaultValue={editProduct['name']}></input>
                </div>
                <div className="FormGroup Size33">
                    <label>Un. de Medida</label>
                    <input type="text" id="unity" className="Mandatory" defaultValue={editProduct['unity']}></input>
                </div>
                <div className="FormGroup Size33">
                    <label>Quantidade</label>
                    <input type="text" id="amount" defaultValue={editProduct['amount']}></input>
                </div>
                <div className="FormGroup Size33">
                    <label>Preço</label>
                    <input type="text" id="price" className="Mandatory" defaultValue={editProduct['price']}></input>
                </div>
                <div className="FormGroup Size50">
                    <label>Data de Fabricação</label>
                    <input type="text" id="fab-date" className="Mandatory" defaultValue={editProduct['fab-date']}></input>
                </div>
                <div className="FormGroup Size50">
                    <label>Data de Validade</label>
                    <input type="text" id="exp-date" defaultValue={editProduct['exp-date']}></input>
                </div>
                <div className="FormGroup Size100">
                    <input type="checkbox" id="perishable" defaultChecked={editProduct['perishable'] ? 'checked' : ''} onClick={handleMandatoryExpDate}/>
                    <label style={{display: 'inline-block', marginLeft: 15}}>Perecível?</label>
                </div>
            </form>

            <Button onClick={saveProduct}>Salvar</Button>
            <Button color="var(--color-danger)" onClick={cancel}>Cancelar</Button>
        </div>
    );
}

export default NewProduct;
