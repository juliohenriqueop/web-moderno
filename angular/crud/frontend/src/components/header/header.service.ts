import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Header } from './header.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private headerSubject = new BehaviorSubject<Header>({
    title: 'Início',
    iconName: 'home',
    routeURL: '/'
  })

  constructor() { }

  set data(header: Header) {
    this.headerSubject.next(header)
  }

  get data(): Header {
    return this.headerSubject.value
  }

}
