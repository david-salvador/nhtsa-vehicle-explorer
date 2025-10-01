import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  navLinks = [
    { path: '/home', label: 'Home', icon: 'home' },
    { path: '/vehicles', label: 'Vehicles', icon: 'directions_car' },
    { path: '/brands', label: 'Brands', icon: 'business' }
  ];
}
