import { Component } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private headerService: HeaderService) { }

  get title(): string {
    return this.headerService.data.title
  }

  get iconName(): string {
    return this.headerService.data.iconName
  }

  get routeURL(): string {
    return this.headerService.data.routeURL
  }

}
