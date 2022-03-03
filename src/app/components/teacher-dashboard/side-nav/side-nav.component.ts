import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { FrontService } from 'src/app/services/front.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  user: string;
  wallet: string;
  image: string;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private router: Router, private authService: SocialAuthService,
    private injector: Injector,
    ) {
    this.image = localStorage.getItem('image')
  }

  ngOnInit(): void {
    this.username();
    this.walletData();
  }
  logout() {
    sessionStorage.clear();
    this.frontServices.vm.sidebarData =null;

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
