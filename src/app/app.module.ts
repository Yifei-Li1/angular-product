import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './components/products/products.component';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { authorizationGuard } from './guards/authorization.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';


export const routes: Routes = [
  { path: 'login', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [authorizationGuard],
  },
  { path: 'product/:id', component: ProductDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    NavigationComponent,
    ProductDetailComponent,
    AddProductDialogComponent,
    SignUpComponent,
    HomeComponent,
    EditProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
