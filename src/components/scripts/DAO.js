class DAO {

  // Insert a product in localStorage.
  static insertProduct(product) {
    localStorage.setItem(product['id'], JSON.stringify(product));
  }

  // Update a product in localStorage.
  static updateProduct(product) {
    this.insertProduct(product);
  }

  // Delete a product from localStorage.
  static deleteProduct(id) {
    localStorage.removeItem(id);
  }

  // Select a product from localStorage.
  static selectProduct(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  // Verify if exists the product from id in localStorage.
  static existsProduct(id) {
    return this.selectProduct(id) !== null;
  }

  // List all products from localStorage.
  static listProducts() {
    var values = [];
    var keys = Object.keys(localStorage);

    for (var i = 0; i < keys.length; ++i) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
  }

  // Count all products in localStorage.
  static countProducts() {
    return Object.keys(localStorage).length;
  }
}

export default DAO;
