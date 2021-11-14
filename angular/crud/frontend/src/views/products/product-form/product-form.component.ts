import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  @Input() title: string
  @Input() disableNameField: boolean
  @Input() disablePriceField: boolean
  @Input() actionButtonTitle: string

  @Output('onActionButtonClick') actionButtonClickEvent: EventEmitter<Product>
  @Output('onCancelButtonClick') cancelButtonClickEvent: EventEmitter<Product>

  @Input() product: Product = {
    name: '',
    price: null
  }

  constructor() {
    this.actionButtonClickEvent = new EventEmitter<Product>()
    this.cancelButtonClickEvent = new EventEmitter<Product>()
  }

  handleActionButtonClick(): void {
    this.actionButtonClickEvent.emit(this.product)
  }

  handleCancelButtonClick(): void {
    this.cancelButtonClickEvent.emit(this.product)
  }

}