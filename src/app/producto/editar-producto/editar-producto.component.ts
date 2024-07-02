import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {

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
      this.toastr.error(err.error.mensaje,'Fail',{
        timeOut: 3000, positionClass:'toast-top-center',
      });
      this.router.navigate(['/']);
    }
    
  );
  }


  onUpdate(): void{
    const id = this.activatedRoute.snapshot.params['id'];
    this.productoService.update(id, this.producto).subscribe(data=>{
      this.toastr.success('Producto Actualizado','OK',{
        timeOut: 3000, positionClass:'toast-top-center',
      });
      this.router.navigate(['/']);
    },
    err =>{
      this.toastr.error(err.error.mensaje,'Fail',{
        timeOut: 3000, positionClass:'toast-top-center',
      });
      this.router.navigate(['/']);
    });
  }

}
