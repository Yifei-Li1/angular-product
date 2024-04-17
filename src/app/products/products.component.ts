import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/local-storage-service';
import { ProductsService } from '../service/products.service';

export type Tproduct = {
  Id: number;
  Name: string;
  Manufacturer: string;
  Price: number;
  ImgPath: string;
};
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  verified = false;
  products: Tproduct[] = [];
  token: string | null = '';
  name = '';
  manufacturer = '';
  price = '';
  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductsService
  ) {}
  ngOnInit() {
    this.token = this.localStorageService.get('token');
    console.log('checking token', this.token);
    if (this.token == undefined) {
      this.verified = false;
    } else
      this.productService.getProducts(this.token).subscribe({
        next: (data: Tproduct[]) => {
          this.products = data;
          console.log(data);
          this.verified = true;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  onCreate() {
    const newProduct = {
      name: this.name,
      manufacturer: this.manufacturer,
      price: this.price,
    };
    this.productService.addProduct(newProduct,this.token).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        if (this.token == undefined) {
        } else {
          this.productService.getProducts(this.token).subscribe({
            next: (data: Tproduct[]) => {
              this.products = data;
              console.log(data);
              this.verified = true;
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      },
      error: (error) => console.error('Error adding product', error),
    });
  }
}
