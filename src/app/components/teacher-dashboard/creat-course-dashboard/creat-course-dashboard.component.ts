import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-creat-course-dashboard',
  templateUrl: './creat-course-dashboard.component.html',
  styleUrls: ['./creat-course-dashboard.component.css']
})
export class CreatCourseDashboardComponent implements OnInit {
  sidebarData: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  currentCardIndex = 0;
  subTitle: any;
  user: string;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.sidebar();
    this.username();
  }
  username() {
    this.user = sessionStorage.getItem('username');
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }

  getSubTitle(parent) {
    const data = {
      "title_id": parent,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('submenu-listing', data, 1).subscribe(res => {
      this.subTitle = res.body.result
    })
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
  //sidebar accordion
  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  getIndex(activeIndex){
    this.currentCardIndex = activeIndex;
  }
  prev() {
    console.log('prev')
    this.currentCardIndex = this.currentCardIndex--;
    if (this.currentCardIndex != 0) {

      this.currentCardIndex = this.currentCardIndex - 1;
    }
    else {
      this.currentCardIndex =2;
    }
    console.log(this.currentCardIndex)

  }
  next() {
    console.log('next')
    if (this.currentCardIndex >= 0 && this.currentCardIndex < 2) {

      this.currentCardIndex = this.currentCardIndex + 1;
    }
    else {
      this.currentCardIndex = 0;
    }
    console.log(this.currentCardIndex)
  }
  toggleSubTitle(event, index, data) {
    for (let i = 0; i < this.sidebarData.length; i++) {
      const title = this.sidebarData[i].title;
      for (let j = 0; j < title.length; j++) {
        const id = title[j].titleid
        if (data === id) {
          const element = event.target;
          element.classList.toggle('active');
          if (title[j].isActive) {
            title[j].isActive = false;
          } else {
            title[j].isActive = true;
          }
        }
      }
    }
  }
  getChildSData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  subscription(planid) {
    debugger
    const data = {
      plan_id: planid,
      current_user_id: sessionStorage.getItem('uid')
    }
    debugger
    this.service.post('Applied-Subscription-plan', data, 1).subscribe(res => {
      if (res.body.user_login_status == 1 && res.body.result == 'success')
        debugger
      {
        this.router.navigate(['/teacherDashboard/thank-you-teacher']);
      }
    });

  }
  // btnClick(){
  //   debugger
  //   this.router.navigateByUrl('/teacherDashboard/plansAndPricing');
  // };
}
