import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {

  nombre: string = '';
  precio: number = 0;
  producto: Producto = new Producto(this.nombre,this.precio);

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.details(id).subscribe(data =>{
      this.producto = data;
    },
    err =>{
      this.volver();
    }
  );

  }

  volver(): void{
    this.router.navigate(['/']);
  }


}
