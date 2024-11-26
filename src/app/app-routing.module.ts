import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},// pathMatch: 'full' means that the whole URL path needs to match the redirect path for the redirect to occur.
  {path: 'products', component: ProductListComponent},
  {path: 'cart', component: CartViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
