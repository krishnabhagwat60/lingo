import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: string;
  wallet: string;
  image: string;

  constructor(private router: Router, private authService: SocialAuthService) {
    this.image = localStorage.getItem('image')
  }

  ngOnInit(): void {
    this.username();
    this.walletData();
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login'])
    this.signOut();
  }
  signOut(): void {
    this.authService.signOut();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  walletData() {
    this.wallet = sessionStorage.getItem('wallet');
  }
}
