import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';  
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
  
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = []; 

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
          this.http.get<Producto[]>('https://cliente-fdd75-default-rtdb.europe-west1.firebasedatabase.app/productos_idx.json')
          .subscribe((resp: Producto[]) => {
            this.productos = resp;
            this.cargando = false;
            resolve(void 0);
          });
    })
  }

getProducto(id: string) {
  return this.http.get<ProductoDescripcion>(`https://cliente-fdd75-default-rtdb.europe-west1.firebasedatabase.app/productos/${id}.json`);
}
  
  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      //cargar productos
      this.cargarProductos().then(() => {
        //ejecutar después de tener los productos
        //aplicar el filtro
        this.filtrarProductos(termino);
      })
    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }

    
  }

  private filtrarProductos(termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();
    
    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
        this.productosFiltrado.push(prod);
      }
    })
  }

}
