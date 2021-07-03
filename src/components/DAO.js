class DAO {
  static insertProduct(product) {
    localStorage.setItem(product['id'], JSON.stringify(product));
  }

  static updateProduct(product) {
    this.insertProduct(product);
  }

  static deleteProduct(id) {
    localStorage.removeItem(id);
  }

  static selectProduct(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  static listProducts() {
    var values = [];
    var keys = Object.keys(localStorage);
    var i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }

  static countProducts() {
    return Object.keys(localStorage).length;
  }
}

export default DAO;
