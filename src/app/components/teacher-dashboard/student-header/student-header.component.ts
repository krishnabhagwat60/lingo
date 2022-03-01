import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) { return this._frontService };
    return this._frontService = this.injector.get(FrontService);
  }
  constructor(private service: ServiceService, private router: Router, private injector: Injector) { }

  ngOnInit(): void {
    this.studentSideBar()
  }
  studentSideBar() {
    debugger
    console.log('student-header',this.frontServices.vm);

    if (this.frontServices != null && this.frontServices.vm != null && this.frontServices.vm.sidebarData != null && this.frontServices.vm.sidebarData.length == 0) {

      const data = {
        user_id: sessionStorage.getItem('uid')
      }
      this.service.post('student_sidebar', data, 1).subscribe(res => {
        this.sidebarData = res.body.result;
        this.frontServices.vm.sidebarData=this.sidebarData;
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
      // console.log(res);
      this.subTitle = res.body.result
    })
  }
}
