import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent {
  productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarProductos();
  }

  cargarProductos(): void{
    this.productoService.lista().subscribe(
      data => {
        this.productos = data;
      }, 
      err =>{
        console.log(err);
      }
    );
  }

  borrar(id: any){
    this.productoService.delete(id).subscribe(data =>{
      this.toastr.success('Producto eliminado','OK',{
        timeOut: 3000, positionClass:'toast-top-center',
      });
      this.cargarProductos();
    },
    err =>{
      this.toastr.error(err.error.mensaje,'Fail',{
        timeOut: 3000, positionClass:'toast-top-center',
      });
    }
  );
  }
}
