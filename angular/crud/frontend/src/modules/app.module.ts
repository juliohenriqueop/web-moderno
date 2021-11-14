import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePT)

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';

import { IconDirective } from '../directives/icon.directive';
import { ForDirective } from '../directives/for.directive';

import { AppComponent } from '../components/app/app.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MenuComponent } from '../components/menu/menu.component';
import { HomeComponent } from '../views/home/home.component';
import { ProductsComponent } from '../views/products/products.component';
import { ProductFormComponent } from '../views/products/product-form/product-form.component';
import { ProductListComponent } from '../views/products/product-list/product-list.component';
import { ProductCreateComponent } from '../views/products/product-create/product-create.component';
import { ProductUpdateComponent } from '../views/products/product-update/product-update.component';
import { ProductDeleteComponent } from '../views/products/product-delete/product-delete.component';

@NgModule({
  declarations: [
    IconDirective,
    ForDirective,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductDeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
