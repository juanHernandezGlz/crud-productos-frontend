export class Producto {
    id?:number;
    nombre: string | undefined;
    precio: number | undefined;

    constructor(nombre:string, precio:number){
        this.nombre = nombre;
        this.precio = precio;
    }

}

