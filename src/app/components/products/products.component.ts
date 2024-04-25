import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { LocalStorageService } from '../../service/local-storage-service';
import { ProductsService } from '../../service/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { CurrencyPipe } from '@angular/common';

export type Tproduct = {
  Id: string;
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
export class ProductsComponent implements OnInit, AfterViewInit {
  verified = false;

  token: string | null = '';
  tableData: any;
  name = '';
  manufacturer = '';
  price = '';
  displayedColumns: string[] = [
    'Id',
    'Name',
    'Manufacturer',
    'Price',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private localStorageService: LocalStorageService,
    private productService: ProductsService,
    private router: Router,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }
  ngOnInit() {
    this.token = this.localStorageService.get('token');
    console.log('checking token', this.token);
    if (this.token == undefined) {
      this.verified = false;
    } else
      this.productService.getProducts(this.token).subscribe({
        next: (data: Tproduct[]) => {
        
          this.tableData = new MatTableDataSource<Tproduct>(data);
          console.log(data);
          this.verified = true;
          this.tableData.paginator = this.paginator
          this.tableData.sort = this.sort;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }
  

  ngAfterViewInit() {
    console.log("ng after view init")
    //setTimeout(() => this.tableData.paginator = this.paginator,300);
       
    console.log("paginator")
  }

  
  onLogout() {
    this.localStorageService.remove('token');
    this.router.navigate(['/login']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }
  detailClicked(row: any) {
    console.log(row);
    this.router.navigate(['/product', row.Id], {
      state: { product: row },
    });
  }
  editClicked(product: any) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '250px',
      data: {name: product.name,manufacturer:product.manufacturer, price: product.price}
    });
    console.log(product)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // Here you can handle updates to the product
      const newProduct = {
        id:product.Id,
        name:result.name,
        manufacturer:result.manufacturer,
        price:result.price
      }
      this.productService.updateProduct(newProduct,this.token).subscribe({
        next: (response) => {
          console.log('Product updated successfully', response);
          if (this.token == undefined) {
          } else {
            this.productService.getProducts(this.token).subscribe({
              next: (data: Tproduct[]) => {
                
                this.tableData = new MatTableDataSource(data);
                console.log(data);
                this.verified = true;
                this.tableData.paginator = this.paginator
                this.tableData.sort = this.sort;
              },
              error: (err: any) => {
                console.log(err);
              },
            });
          }
        },
        error: (error) => console.error('Error adding product', error),
      });
    });
  }
  
  deleteClicked(row: any) {
    this.productService.deleteProduct(row.Id, this.token).subscribe({
      next: (response) => {
        console.log('Product delete successfully', response);
        if (this.token == undefined) {
        } else {
          this.productService.getProducts(this.token).subscribe({
            next: (data: Tproduct[]) => {
              
              this.tableData = new MatTableDataSource(data);
              console.log(data);
              this.verified = true;
              this.tableData.paginator = this.paginator
              this.tableData.sort = this.sort;
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        }
      },
    });
  }
  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '400px',
      data: {
        Name: this.name,
        Manufacturer: this.manufacturer,
        Price: this.price,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (result) {
        console.log(result);
        this.productService.addProduct(result, this.token).subscribe({
          next: (response) => {
            console.log('Product added successfully', response);
            if (this.token == undefined) {
            } else {
              this.productService.getProducts(this.token).subscribe({
                next: (data: Tproduct[]) => {
                  
                  this.tableData = new MatTableDataSource(data);
                  console.log(data);
                  this.verified = true;
                  this.tableData.paginator = this.paginator
                  this.tableData.sort = this.sort;
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
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log("sorting function called")
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
