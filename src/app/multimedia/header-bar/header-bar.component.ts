import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ServiceService } from 'src/app/components/service.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})
export class HeaderBarComponent implements OnInit {
  user: string;
  wallet: string;
  sidebarData: any;
  coursesName: void;

  constructor(private router: Router,private service:ServiceService,private authService:SocialAuthService) { }

  ngOnInit(): void {
    this.username();
    this.walletData();
    this.sidebar();
  }
  logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login'])
    this.signOut()
  }
  signOut(): void {
    this.authService.signOut();
  }
  // username
  username(){
    this.user = sessionStorage.getItem('username');
  }
  walletData(){
    this.wallet = sessionStorage.getItem('wallet');
  }
  // sidebar api
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
      sessionStorage.setItem('course_id',id)
      setTimeout(() => {
      this.router.navigate(['/teacherDashboard/editCourse']);
      }, 100);
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
}
