import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  constructor(
    private productsService: ProductsService,
    private router: Router) {
  }

  handleCreate(product: Product): void {
    this.productsService.create(product).subscribe(() => {
      this.productsService.notify('O produto foi criado com sucesso.', true)
      this.router.navigate(['products'])
    }, () => {
      this.productsService.notify('Não foi possível criar o produto.', false)
    })
  }

  handleCancel(): void {
    this.router.navigate(['products'])
  }

}
