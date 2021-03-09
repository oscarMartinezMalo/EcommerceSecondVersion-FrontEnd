import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'shared/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  cart$: Observable<ShoppingCart>;
  user: User;

  constructor(
     private shoppingCartServive: ShoppingCartService,
     private authService: AuthService,
     private router: Router
     ) {
    this.cart$ = shoppingCartServive.cart$;
    authService.user$?.subscribe( user => { this.user = user; });
  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/products']);
  }

}
