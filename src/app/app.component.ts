import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './components/service.service';
import { FrontService } from './services/front.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  show: boolean = false;
  user: string;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) { return this._frontService };
    return this._frontService = this.injector.get(FrontService);
  }
  constructor(private router: Router, private service: ServiceService,
    private injector: Injector) { 

  }
  ngOnInit() {
    this.username();
    setTimeout(() => {
      this.frontServices.navigation.url = this.router['url']
    }, 1000);
  }


  onActivate(event) {
    window.scrollTo(0, 0)
  }
  // username
  username(){
    this.user = sessionStorage.getItem('username');
  }

}
