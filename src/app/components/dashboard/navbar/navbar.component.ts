import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  username: string;
  wallet: string;
  term: string;
  image: string;
  subscription: Subscription;

  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  updateNewDataImage: any;
  constructor(
    private service: ServiceService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private authService: SocialAuthService,
    private injector: Injector
  ) {
    this.image = localStorage.getItem('image');
    this.image = null;
    if (this.subscription == undefined) {
      this.subscription =
        this.eventEmitterService.invokeProfileChange.subscribe(() => {
          debugger;
          this.profile();
        });
    }
  }

  ngOnInit(): void {
    debugger
    this.walletData();
    this.usernameData();
    this.profile();
  }
  profile() {
    debugger;
    const data = {
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('get_profile_by_id', data, 1).subscribe((res) => {
      this.updateNewDataImage = res.body.profile.avatar;
      if (this.updateNewDataImage == null) {
        this.updateNewDataImage = false;
      }
    });
    setInterval(() => {
      if (this.updateNewDataImage) {
        console.log(this.updateNewDataImage.substring(0, 23))
      }
    }, 5000);
  }
  logout() {
    sessionStorage.clear();
    this.signOutFunc();
    this.router.navigate(['/login']);
  }
  signOutFunc(): void {
    this.frontServices.vm.sidebarData = null;

    this.authService.signOut();
  }
  usernameData() {
    this.username = sessionStorage.getItem('username');
  }
  walletData() {
    this.wallet = sessionStorage.getItem('wallet');
  }
}
