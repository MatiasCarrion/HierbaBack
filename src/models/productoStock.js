class ProductoStock {

    constructor(id, nombre, categoria, stock, precioCompra, precioVenta) {
      this.id = id;
      this.nombre = nombre;
      this.categoria = categoria;
      this.stock = stock;
      this.precioCompra = precioCompra;
      this.precioVenta = precioVenta;
    }
  }

module.exports.ProductoStock = ProductoStock;