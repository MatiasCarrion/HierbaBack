class ProductoLog {

    constructor(id,productoId,categoriaId, proveedorId, precioCompra, minGanancia, maxGanancia, precioVenta, existencia, stock, accionId, usuarioId, creadoEl) {
      this.id = id;
      this.productoId = productoId;
      this.categoriaId = categoriaId;
      this.proveedorId = proveedorId;
      this.precioCompra = precioCompra;
      this.minGanancia = minGanancia;
      this.maxGanancia = maxGanancia;
      this.precioVenta = precioVenta;
      this.existencia = existencia;
      this.stock = stock;
      this.accionId = accionId;
      this.usuarioId = usuarioId;
      this.creadoEl = creadoEl;
    }
  }

module.exports.ProductoLog = ProductoLog;