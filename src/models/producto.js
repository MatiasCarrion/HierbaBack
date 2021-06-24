class Producto {

    constructor(id, nombre, categoriaId, proveedorId, precioCompra, minGanancia, maxGanancia, precioVenta, stock) {
      this.id = id;
      this.nombre = nombre;
      this.categoriaId = categoriaId;
      this.proveedorId = proveedorId;
      this.precioCompra = precioCompra;
      this.minGanancia = minGanancia;
      this.maxGanancia = maxGanancia;
      this.precioVenta = precioVenta;
      this.stock = stock;
    }
  }

module.exports.Producto = Producto;