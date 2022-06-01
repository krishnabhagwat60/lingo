import { getUrlScheme } from '@angular/compiler';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../service.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css'],
})
export class ThankYouComponent implements OnInit {
  url: string;
  mainpageLod: boolean = false;
  updateNewDataImage: any;

  user: string;
  sidebarData: any;
  coursesName: void;
  subTitle: any;
  courseid: void;
  name: void;
  studentRating: void;
  courseName: string;
  subscription: Subscription;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }

  constructor(
    private service: ServiceService,
    private authService: SocialAuthService,
    private route: ActivatedRoute,
    private eventEmitterService: EventEmitterService,
    private router: Router,
    private injector: Injector
  ) {
    this.route.queryParams.subscribe((params) => {
      this.url = params['url'];
    });
    if (this.subscription == undefined) {
      this.subscription = this.eventEmitterService.invokeMenuList.subscribe(
        () => {
       
          this.studentSideBar();
        }
      );
    }
  }

  ngOnInit(): void {
    if (!this.frontServices.vm.courseSubmitted) {
      this.submitEnroll();
    }
    this.user = sessionStorage.getItem('username');

    this.updateNewDataImage = localStorage.getItem('image');
    if(this.updateNewDataImage == null)
    {
      this.updateNewDataImage = false;
    }

    this.courseName = localStorage.getItem('course_name');
    this.studentSideBar();
  }
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.signOutFunc();
    this.router.navigate(['/login']);
    // this.signOut();
  }
 
  signOutFunc(): void {
    this.frontServices.vm.sidebarData = null;

    this.authService.signOut();
  }
  studentSideBar() {

    if (
      this.frontServices == null ||
      this.frontServices.vm == null ||
      this.frontServices.vm.sidebarData == null ||
      this.frontServices.vm.sidebarData.length == 0 ||
      this.frontServices.vm.courseChanged
    ) {
      const data = {
        user_id: sessionStorage.getItem('uid'),
      };
      setTimeout(() => {
        this.service.post('student_sidebar', data, 1).subscribe((res) => {
          this.sidebarData = res.body.result;
          this.frontServices.vm.sidebarData = this.sidebarData;
          this.frontServices.vm.courseChanged = false;
        });
      }, 100);
    } else {
      this.sidebarData = this.frontServices.vm.sidebarData;
    }
  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    // this.coursesName = sessionStorage.setItem('course_name', name);
    // this.coursesName = sessionStorage.setItem('course_id', id);
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
        const id = title[j].titleid;
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
    this.courseid = sessionStorage.setItem('course_id', id);
    this.name = sessionStorage.setItem('teacher_name', name);
    this.studentRating = sessionStorage.setItem('student_rating', rating);
    sessionStorage.getItem('course_id');
    sessionStorage.getItem('teacher_name');
    this.router.navigate(['/teacherDashboard/student-view'], {
      queryParams: { id: sessionStorage.getItem('subId') },
    });
  }

  getSubTitle(parent) {
    const data = {
      title_id: parent,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('submenu-listing', data, 1).subscribe((res) => {
      this.subTitle = res.body.result;
    });
  }
  submitEnroll() {
    const data = {
      course_id: localStorage.getItem('enrollId'),
      user_id: sessionStorage.getItem('uid'),
      order_id: this.url,
    };
    this.service.post('course-enroll', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.frontServices.vm.courseChanged = true;
        this.eventEmitterService.onMenuChanged();
        this.mainpageLod = false;
      }
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('course_name')
    localStorage.removeItem('enrollId')
    if (this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
