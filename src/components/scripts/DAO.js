class DAO {

  // Adiciona um produto no localStorage.
  static insertProduct(product) {
    localStorage.setItem(product['id'], JSON.stringify(product));
  }

  // Atualiza um produto no localStorage.
  static updateProduct(product) {
    this.insertProduct(product);
  }

  // Deleta um produto do localStorage.
  static deleteProduct(id) {
    localStorage.removeItem(id);
  }

  // Seleciona um produto do localStorage.
  static selectProduct(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  // Verifica se um produto existe no localStorage.
  static existsProduct(id) {
    return this.selectProduct(id) !== null;
  }

  // Lista todos os produtos do localStorage.
  static listProducts() {
    var values = [];
    var keys = Object.keys(localStorage);

    for (var i = 0; i < keys.length; ++i) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }

  // Conta todos os produtos do localStorage.
  static countProducts() {
    return Object.keys(localStorage).length;
  }
}

export default DAO;
