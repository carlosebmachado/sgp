import '../../styles/ListProducts.css';

import Button from '../Button';
import Message from '../Message';
import DAO from '../DAO';

function ListProducts(props) {

    function getTableProducts() {
        var products = DAO.listProducts();
        return products.map(p => {
            return (
            <tr key={p['_id']}>
                <td>{p['name']}</td>
                <td>{p['unity']}</td>
                <td>{p['amount']}</td>
                <td>{p['price']}</td>
                <td>{p['perishable'] ? 'Sim' : 'Não'}</td>
                <td>{p['fab-date']}</td>
                <td>{p['exp-date']}</td>
                <td><Button onClick={editProduct} param={p['_id']}>Editar</Button></td>
                <td><Button onClick={deleteProduct} param={p['_id']} color="var(--color-danger)">Excluir</Button></td>
            </tr>
            );
        });
    }

    function editProduct(id) {
        props.onClick(1, id);
    }

    function deleteProduct(id) {
        DAO.deleteProduct(id);
        window.location.reload();
    }

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
                    {getTableProducts()}
                    {/* <tr>
                        <td>Abacaxi em Caldas</td>
                        <td>UN</td>
                        <td>10</td>
                        <td>R$ 21,50</td>
                        <td>Sim</td>
                        <td>10/10/2021</td>
                        <td>10/10/2019</td>
                        <td><Button>Editar</Button></td>
                        <td><Button color="var(--color-danger)">Excluir</Button></td>
                    </tr>
                    <tr>
                        <td>Abacaxi em Caldas</td>
                        <td>UN</td>
                        <td>10</td>
                        <td>R$ 21,50</td>
                        <td>Sim</td>
                        <td>10/10/2021</td>
                        <td>10/10/2019</td>
                        <td><Button>Editar</Button></td>
                        <td><Button color="var(--color-danger)">Excluir</Button></td>
                    </tr> */}
                </tbody>
            </table>
            <Message>Produto removido com sucesso.</Message>
            <Button>Adicionar Produto</Button>
        </div>
    );
}

export default ListProducts;
