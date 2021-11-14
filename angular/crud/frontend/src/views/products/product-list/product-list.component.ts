import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  tableColumns: string[] = ['name', 'price', 'actions']
  pageSizeOptions: number[] = [8]

  dataSource: MatTableDataSource<Product>

  @ViewChild(MatTable) table: MatTable<Product>
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.list().subscribe(products => {
      this.dataSource = new MatTableDataSource(products)
      this.dataSource.paginator = this.paginator
      
      this.table.dataSource = this.dataSource;
    })
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.dataSource.filter = value.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

}
