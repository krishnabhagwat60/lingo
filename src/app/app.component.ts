import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from './components/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  show: boolean = false;
  user: string;

  constructor(private router: Router, private service: ServiceService) { 

  }
  ngOnInit() {
    this.username();
  }

  onActivate(event) {
    window.scrollTo(0, 0)
  }
  // username
  username(){
    this.user = sessionStorage.getItem('username');
  }

}
