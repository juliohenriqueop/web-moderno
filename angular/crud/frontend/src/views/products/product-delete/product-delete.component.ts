import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model'
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

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

  handleDelete(): void {
    this.productsService.delete(this.product.id).subscribe(() => {
      this.productsService.notify('O produto foi apagado com sucesso.', true)
      this.router.navigate(['products'])
    }, () => {
      this.productsService.notify('Não foi possível apagar o produto.', false)
    })
  }

  handleCancel(): void {
    this.router.navigate(['products'])
  }
}
