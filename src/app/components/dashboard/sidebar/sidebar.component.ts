import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../../service.service';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebarData: any;
  coursesName: void;
  subTitle: any;
  courseid: void;
  name: void;
  studentRating: void;
  isCoursesRender: number = 0;
  //@ViewChild(StudentDashboardComponent) itemShow;
  //@Input()  = '';
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  subscription: Subscription;
  constructor(
    private service: ServiceService,
    private router: Router,
    private eventEmitterService: EventEmitterService,
    private injector: Injector,


  ) {

  }

  ngOnInit(): void {
    this.studentSideBar();

    console.log('selectedChild',  this.frontServices.vm.selectedChildId )
    console.log('selectedCourseId',  this.frontServices.vm.selectedCourseId )

  }
  ngAfterViewInit() {
    this.studentSideBar();
  }
  ngOnChanges() {

  }
  studentSideBar() {




    const data = {
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('student_sidebar', data, 1).subscribe((res) => {
      this.sidebarData = res.body.result;
      if (this.sidebarData != null && this.sidebarData.length > 0) {
        var filteredData = this.unique(this.sidebarData, ['course_id']);
        this.sidebarData = filteredData;
        this.frontServices.vm.sidebarData = this.sidebarData;
      }
      this.isCoursesRender = 1;
    });

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
    debugger
    this.coursesName = sessionStorage.setItem('course_name', name);
    this.coursesName = sessionStorage.setItem('course_id', id);
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData.forEach((element) => {
        element.isActive = false;
      });
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data) {
    debugger
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
    debugger
    sessionStorage.setItem('subId', child);
    this.courseid = sessionStorage.setItem('course_id', id);
    this.name = sessionStorage.setItem('teacher_name', name);
    this.studentRating = sessionStorage.setItem('student_rating', rating);
    this.frontServices.vm.selectedChildId = child && child.length > 0 ? parseInt(child) : 0;
    this.frontServices.vm.selectedCourseId = id && id.length > 0 ? parseInt(id) : 0;

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

  /**
   * Porfolio isotope and filter
   */
}
function on(arg0: string, arg1: string, arg2: (e: any) => void, arg3: boolean) {
  throw new Error('Function not implemented.');
}
