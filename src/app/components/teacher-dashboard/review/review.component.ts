import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewData: any;
  mainpageLoder: boolean = true;
  sidebarData: any;
  buttonColor: any;
  totalPages: any[];
  current_page = 1;
  buttonShow: boolean = true;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  username: string;
  subTitle: any;
  user: string;
  coursesName: void;
  titlename: void;
  subtitle: void;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    this.getReview(1, 0);
    this.sidebar();
    // this.addInitialForms();
    this.usernames();
    // this.addInitialForms();
  }
  usernames(){
    this.user = sessionStorage.getItem('username');
  }
  
  // sidebar api
  sidebar() {
    const data ={
      user_id : sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar',data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
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
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  showshubmenu() {
    this.ismenuShow = !this.ismenuShow
  }

  showsubmenu() {
    this.ismenu = !this.ismenu
  }

  showsub() {
    this.ismenusub = !this.ismenusub
  }

  dashboardShow1() {
    this.dashboardShow = !this.dashboardShow
  }

  profileShow1() {
    this.profileShow = !this.profileShow
  }
  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }

  // get review api
  getReview(page = 1, i) {
    this.current_page = Number(page);
    const data = {
      id: "1",
      "page": page,
      user_id : sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.service.post('get-teacher-review', data, 1).subscribe(res => {
  this.mainpageLoder = false;
  this.reviewData = res.body.result;
      if (res.body.total_review === 1 || res.body.total_review === 0) {
        this.buttonShow = false;
      }
      if (res.body.result.length < 0) {
        this.mainpageLoder = false;
        this.totalPages = [];

        for (let i = 0; i < res.body.total_review; i++) {
          this.totalPages.push(i + 1);
        }
      }
    })
  }
  // pagination
  direction(direction) {
    if (direction == 0) {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1
        this.getReview(this.current_page, 0);
      }

    } else {
      if (this.current_page < this.totalPages.length) {
        this.current_page = this.current_page + 1
        this.getReview(this.current_page, 0);
      }


    }
  }
  //sidebar accordion
  toggleAccordian(event, index,name,id) {
   this.coursesName = sessionStorage.setItem('course_name',name)
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data,title) {
    this.titlename = sessionStorage.setItem('title', title)
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
  getChildSData(child,subtitle) {
    this.subtitle = sessionStorage.setItem('subtitle',subtitle)
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/multimedia/contentStyle'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
}
