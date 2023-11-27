import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { ToastrService } from 'ngx-toastr';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs= pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  products: any[] = [];
  cantidadComprada:number
  constructor(private productService: ProductServiceService,private toastr: ToastrService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.toastr.success('Productos Cargados ','Exito',{
        timeOut: 2000,
        positionClass:'toast-top-center'
      });
      this.products = data.map(product => ({
        ...product,
        cantidad: product.cantidad > 0 ? product.cantidad : 'No disponible en stock'
      }));
    });
  }
  buyProduct(product: any) {
    const productId = product.id;
    const quantityToBuy = product.quantityToBuy ;


    if (quantityToBuy === undefined || quantityToBuy <= 0) {
      this.toastr.warning('Ingrese una cantidad válida mayor a cero', 'Advertencia', {
        timeOut: 2000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    this.productService.buyProduct(productId, quantityToBuy).subscribe(
      (response: any) => {
        const productName = response.nombre;
        const productPrice = response.precio;
        const totalToPay = response.totalToPay;

        const documentDefinition = {
          content: [
            {text: 'Factura de Compra', style: 'header'},

            {
              style: 'tableExample',
              table: {
                body: [
                  ['Producto ID', 'Nombre del Producto', 'Precio Unidad','Cantidad a comprar','Total a pagar'],
                  [`${productId}`, `${productName}`, `$${productPrice}`,`${quantityToBuy}`,`$${totalToPay}`]
                ]
              }
            }
          ]
        };

        const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
        pdfDocGenerator.open();

        this.toastr.info('Compra exitosa', 'Informacion', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      },
      (error) => {
        console.error('Error al comprar el producto:', error);
        this.toastr.error('Error al comprar el producto la cantidad no esta disponible en stock', 'Error', {
          timeOut: 2000,
          positionClass: 'toast-top-center'
        });
      }
    );
  }

}

