import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  wallet: string;
   term:string
  images: string;
  constructor(private router: Router,private authService: SocialAuthService) {
    this.images = localStorage.getItem('image')
   }

  ngOnInit(): void {
    this.usernameData();
    this.walletData();
    this.usernameData();
  }
  logout(){
    sessionStorage.clear();
    this.signOutFunc();
    this.router.navigate(['/login'])
  }
  signOutFunc(): void {
    this.authService.signOut();
  }
  usernameData(){
    this.username = sessionStorage.getItem('username');
  }
  walletData(){
    this.wallet = sessionStorage.getItem('wallet');
  }
}
