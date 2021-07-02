import './ListProducts.css';

import Button from "../Button";

function ListProducts(){
    return (
        <div className="ListProducts">
            <h2>Listar Produtos</h2>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Un. de Medida</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Perecível?</th>
                    <th>Data de Validade</th>
                    <th>Data de Fabracação</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
                <tr>
                    <td>Abacaxi em Caldas</td>
                    <td>UN</td>
                    <td>10</td>
                    <td>R$ 21,50</td>
                    <td>Sim</td>
                    <td>10/10/2021</td>
                    <td>10/10/2019</td>
                    <td><button>Editar</button></td>
                    <td><button>Excluir</button></td>
                </tr>
                <tr>
                    <td>Abacaxi em Caldas</td>
                    <td>UN</td>
                    <td>10</td>
                    <td>R$ 21,50</td>
                    <td>Sim</td>
                    <td>10/10/2021</td>
                    <td>10/10/2019</td>
                    <td><button>Editar</button></td>
                    <td><button>Excluir</button></td>
                </tr>
            </table>
            <Button>Adicionar Produto</Button>
        </div>
    );
}

export default ListProducts;
