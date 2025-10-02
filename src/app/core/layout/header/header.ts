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
    { path: '/vehicles/452', label: 'bmw_deeplink', icon: 'link' },
    { path: '/vehicles/441', label: 'tesla_deeplink', icon: 'link' },
  ];
}
