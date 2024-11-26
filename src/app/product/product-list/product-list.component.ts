import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  products: Product[] = [];
  filteredProducts: Product[] = [];
  sortOrder: string = '';

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackBar.open('Product added to cart', '', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      },
    });
  }

  applyFilter(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    // console.log(searchTerm);
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    )
    this.sortProducts(this.sortOrder);
  }

  sortProducts(sortValue: string) {
    this.sortOrder = sortValue;
    if (this.sortOrder === 'priceLowHigh') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'priceHighLow') {
      this.filteredProducts = this.filteredProducts.sort((a, b) => b.price - a.price);
    }

  }
}
