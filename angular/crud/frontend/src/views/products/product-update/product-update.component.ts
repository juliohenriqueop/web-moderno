import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router) {
  }

  ngOnInit(): void {
    const productId: number = parseInt(this.route.snapshot.paramMap.get('id'))
    this.productsService.getById(productId).subscribe(product => {
      this.product = product
    }, () => {
      this.productsService.notify('Não foi possível acessar o produto.', false)
      this.router.navigate(['products'])
    })
  }

  handleSave(product: Product): void {
    this.productsService.update(product).subscribe(() => {
      this.productsService.notify('O produto foi modificado com sucesso.', true)
      this.router.navigate(['products'])
    }, () => {
      this.productsService.notify('Não foi possível modificar o produto.', false)
    })
  }

  handleCancel(): void {
    this.router.navigate(['products'])
  }

}
