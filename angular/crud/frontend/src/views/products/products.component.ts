import { Component } from '@angular/core';
import { HeaderService } from 'src/components/header/header.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  constructor(
    private headerService: HeaderService,
    private router: Router
  ) {
    this.headerService.data = {
      title: 'Produtos',
      iconName: 'storefront',
      routeURL: 'products'
    }
  }

  navigateToCreateProduct(): void {
    this.router.navigate(['/products/create'])
  }

}
