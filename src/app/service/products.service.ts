import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getProducts(token:string):any{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('https://localhost:44377/api/products', { headers: headers, responseType: 'json' });

  }
  addProduct(product: { name: string, manufacturer: string, price: string},token:string|null): Observable<any> {
    // Construct the JSON body from the method parameters
    const body = {
      Name: product.name,
      Manufacturer: product.manufacturer,
      Price: product.price,
      ImgPath: "temp/temp"
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post("https://localhost:44377/api/Product", body,{ headers: headers });
  }
  
  deleteProduct(productId: string,token:string|null)  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`https://localhost:44377/api/Products/${productId}`,{headers:headers});
  }
  updateProduct(product: { id:string,name: string, manufacturer: string, price: string},token:string|null): Observable<any>{
    console.log("product id",product.id)
    const body = {
      Id:product.id,
      Name: product.name,
      Manufacturer: product.manufacturer,
      Price: product.price,
      ImgPath: "temp/temp"
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`https://localhost:44377/api/Products/${product.id}`, body,{ headers: headers });
  }
}
