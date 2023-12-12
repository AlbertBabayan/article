import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  private router = inject(Router)
  constructor(){}

  public singIn() {
    this.router.navigate(['login']);
  }
  public singUp() {
    this.router.navigate(['registration']);
  }
}
