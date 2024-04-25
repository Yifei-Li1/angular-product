import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  productId: string|null = "";
  product:any
  imageUrl = "../../assets/productImg.PNG"
  constructor(private route: ActivatedRoute,private router: Router) { 
    const navigation = this.router.getCurrentNavigation()?.extras.state
    this.product = navigation?.['product']
  }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
    });
    
    console.log(this.product)
  }
}
