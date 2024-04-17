import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, NgModel } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { provideRouter } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [{ path: 'login', component: LoginComponent },
{ path: 'products', component: ProductsComponent },];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    NavigationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
