import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  wallet: string;
   term:string
  image: string;
  updateNewDataImage :any;
  constructor(private service: ServiceService,private router: Router,private authService: SocialAuthService) {
    this.image = localStorage.getItem('image')
   }

  ngOnInit(): void {
    this.usernameData();
    this.walletData();
    this.usernameData();
    this.profile();
  }
  profile(){
    const data = {
      "user_id": sessionStorage.getItem('uid')
    }
    this.service.post('get_profile_by_id', data, 1).subscribe(res => {
      debugger
      this.updateNewDataImage = res.body.profile.avatar;
    }
    )
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
