import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { PdfComponent } from './pdf/pdf.component';

const routes: Routes = [
  {path:'',component:ProductListComponent},
  {path:'pdf',component:PdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
