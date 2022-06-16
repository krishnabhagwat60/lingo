import { Component, ElementRef, Injector, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {
  sidebarData: any;
  coursesName: void;
  subTitle: any;
  subscription: Subscription;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  @ViewChildren('mainMenuBtn') mainMenus: QueryList<ElementRef>;
  @ViewChildren('mainSubMenuBtn') mainSubMenus: QueryList<ElementRef>;
  @ViewChildren('subAnchorMenu') subAnchorMenu: QueryList<ElementRef>;
  constructor(private service: ServiceService,   private eventEmitterService: EventEmitterService, private router: Router, private injector: Injector) { 
    if (this.subscription == undefined) {
      this.subscription = this.eventEmitterService.
        invokeMenuList.subscribe(() => {
          
          this.frontServices.vm.courseChanged = false;
          this.studentSideBar();
        });
    }
  }

  ngOnInit(): void {
    this.studentSideBar()
  }
  studentSideBar() {
    if ( this.frontServices == null ||
      this.frontServices.vm == null ||
      this.frontServices.vm.sidebarData == null ||
      this.frontServices.vm.sidebarData.length == 0) {

      const data = {
        user_id: sessionStorage.getItem('uid')
      }
      this.service.post('student_sidebar', data, 1).subscribe(res => {
        this.sidebarData = res.body.result;
        this.frontServices.vm.sidebarData=this.sidebarData;
        this.frontServices.vm.sidebarData = this.sidebarData;
          if (this.frontServices.vm.selectedMainMenuIndex > 0) {
            this.mainMenus.forEach((item, index) => {
              if (index === this.frontServices.vm.selectedMainMenuIndex - 1)
                (item.nativeElement as HTMLElement).click();
            });
  
          }
      })
    }
    else{
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
  toggleAccordian(event, index, name) {
    this.coursesName = sessionStorage.setItem('course_name', name)
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
  getChildSData(child) {
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
}
