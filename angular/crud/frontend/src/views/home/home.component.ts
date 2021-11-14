import { Component } from '@angular/core';
import { HeaderService } from 'src/components/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private headerService: HeaderService) {
    this.headerService.data = {
      title: 'Início',
      iconName: 'home',
      routeURL: '/'
    }
  }

}
