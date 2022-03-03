import { getUrlScheme } from '@angular/compiler';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-cancel-payment',
  templateUrl: './cancel-payment.component.html',
  styleUrls: ['./cancel-payment.component.css']
})
export class CancelPaymentComponent implements OnInit {
  url: string;
  user: string;
  sidebarData: any;
  coursesName: void;
  subTitle: any;
  courseid: void;
  name: void;
  studentRating: void;
  courseName: string;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) { return this._frontService };
    return this._frontService = this.injector.get(FrontService);
  }
  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router, private injector: Injector) {
    this.route.queryParams.subscribe(params => {
      this.url = params['url'];
    });
  }

  ngOnInit(): void {
    this.studentSideBar()
    this.submitEnroll();
    this.user = sessionStorage.getItem('username');
    this.courseName = localStorage.getItem('course_name');
  }
  logout() {
    sessionStorage.clear();
    this.frontServices.vm.sidebarData =null;
    
    this.router.navigate(['/login'])
    // this.signOut();
  }
  studentSideBar() {
    console.log('cancel payment view', this.frontServices.vm);

    if (this.frontServices != null && this.frontServices.vm == null && this.frontServices.vm.sidebarData == null && this.frontServices.vm.sidebarData.length == 0) {

      const data = {
        user_id: sessionStorage.getItem('uid')
      }
      this.service.post('student_sidebar', data, 1).subscribe(res => {
        this.sidebarData = res.body.result;
        if (this.sidebarData != null && this.sidebarData.length > 0) {
          var filteredData = this.unique(this.sidebarData, ['course_id']);
          this.sidebarData = filteredData;
          this.frontServices.vm.sidebarData = this.sidebarData;
        }
      })
    } else {
      this.sidebarData = this.frontServices.vm.sidebarData;
    }
  }
  unique(arr, keyProps) {
    return Object.values(
      arr.reduce((uniqueMap, entry) => {
        const key = keyProps.map((k) => entry[k]).join('|');
        if (!(key in uniqueMap)) uniqueMap[key] = entry;
        return uniqueMap;
      }, {})
    );
  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    this.coursesName = sessionStorage.setItem('course_id', id)
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
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
  getChildSData(child, id, name, rating) {
    sessionStorage.setItem('subId', child);
    this.courseid = sessionStorage.setItem('course_id', id)
    this.name = sessionStorage.setItem('teacher_name', name)
    this.studentRating = sessionStorage.setItem('student_rating', rating)
    sessionStorage.getItem('course_id')
    sessionStorage.getItem('teacher_name')
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
  submitEnroll() {
    const data = {
      "course_id": localStorage.getItem('enrollId'),
      "user_id": sessionStorage.getItem('uid'),
      order_id: this.url
    }
    this.service.post('course-enroll', data, 1).subscribe(res => {

    }
    )
  }
}

