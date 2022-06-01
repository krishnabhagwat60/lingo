import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-teacher-view-student',
  templateUrl: './teacher-view-student.component.html',
  styleUrls: ['./teacher-view-student.component.css']
})
export class TeacherViewStudentComponent implements OnInit {
  buttonColor: any;
  viewData: any;
  mainpageLoder: boolean = true;
  msgShow: string;
  buttonShow: boolean = true;
  totalPages: any[];
  current_page = 1;
  id: string;
  sidebarData: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  errmsg: string;
  coursesName: void;
  title: void;

  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
  }

  ngOnInit(): void {
    this.viewCourseData(1, 0);
    this.sidebar();
    this.username();
  }
  username() {
    this.user = sessionStorage.getItem('username');
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
  // sidebar api
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar', data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }
  viewCourseData(page = 1, i) {
    this.current_page = Number(page);
    const data = {
      "course_id": this.id,
      "page": page
    }
    this.buttonColor = i;
    this.service.post('view-student', data, 1).subscribe(res => {
      this.viewData = res.body.data;
      this.mainpageLoder = false;
      if (!this.viewData.length) {
        this.errmsg = 'Data Not Found';
      }
      if (res.body.data === 1 || res.body.data === 0) {
        this.buttonShow = false;
      }
      // else{
      //   this.mainpageLoder = true;
      // }
      if (res.body.total === 1 || res.body.total === 0) {
        this.buttonShow = false;
      }
      this.totalPages = [];

      for (let i = 0; i < res.body.total; i++) {
        this.totalPages.push(i + 1);
      }
    })
  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course-id', id)
    this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data, title) {
    this.title = sessionStorage.setItem('title', title)
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
}
