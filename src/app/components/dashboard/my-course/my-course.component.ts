import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { FrontService } from 'src/app/services/front.service';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {
  courseData: any;
  buttonColor: any;
  current_page = 1;
  totalPages: any[];
  buttonShow: boolean = true;
  mainpageLoder: boolean = true;
  sidebarData: any;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  user: string;
  coursesName: void;
  pages: number;
  err: string;
  questionButton: boolean = false;
  questionButtons: boolean = false;
  errMsg: string;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) { return this._frontService };
    return this._frontService = this.injector.get(FrontService);
  }
  constructor(private service: ServiceService, private router: Router,private authService: SocialAuthService,private injector: Injector) { 
    this.user = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.getCourseData(1, 0);
    // this.username();
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  logout(){
sessionStorage.clear();
localStorage.clear();
this.frontServices.vm.sidebarData =null;

    this.signOut();
    this.router.navigate(['/login'])
  }
  signOut(): void {

    this.authService.signOut();
  }
  //  get course data
  getCourseData(page = 1, i) {
    this.pages = page
    this.mainpageLoder = true;
    const data = {
      "page": page,
      user_id: sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.current_page = Number(page);
    this.service.post('student-course', data, 1).subscribe(res => {
      this.mainpageLoder = false;
      this.courseData = res.body.data;
      if (res.body.total === 1 || res.body.total === 0) {
        this.buttonShow = false;
      }
      if(i == 1 ){
        this.questionButton = true;
        
        // this.questionButtons = true
      }else if(i == 0){
        this.questionButton = false;
        this.questionButtons = false

      }
      if (i + 1 == res.body.total) {
        this.questionButtons = true
        this.questionButton = true;
      }else if(i = !res.body.total){
        this.questionButtons = false
      }
      if (res.body.data) {
        this.mainpageLoder = false;
      }
      this.totalPages = [];

      for (let i = 0; i < res.body.total; i++) {
        this.totalPages.push(i + 1);
      }
     
    })
  }
  // pagination
  direction(direction) {
    if (direction == 0) {
      if (this.current_page > 1) {
        this.current_page = this.current_page - 1
        this.getCourseData(this.current_page, 0);
      }

    } else {
      if (this.current_page < this.totalPages.length) {
        this.current_page = this.current_page + 1
        this.getCourseData(this.current_page, 0);
      }


    }
  }
  // start course
  viewDetail(id) {
    this.router.navigate(['/dashboard/course_detail'], { queryParams: { id: id } });
  }
  searchform = new FormGroup({
    searchData : new FormControl('')
  })
  searchDatas() {
    
    // this.mainpageLoder = true;
    const data =
    {
      "name": this.searchform.value.searchData,
      "teaching_language": '',
      "course_language": '',
      "teacher_id": '',
      "level_id": '',
      "rating": '',
      "page": this.pages,
    }
    // this.buttonColor = i;
    this.service.post('course-filter', data, 1).subscribe(res => {
      this.totalPages = [];

      for (let i = 0; i < res.body.total_course; i++) {
        this.totalPages.push(i + 1);
        
      }
      if (res.body.total_course === 1 || res.body.total_course === 0) {
        this.buttonShow = false;
      }
      if (res.body.data[0].message == 'No Data Found') {
        this.errMsg = 'No Data Found'
      } else {
        this.errMsg = ''
      }
      this.mainpageLoder = false;
      this.courseData = res.body.data;
      if (res.body.data.message == 'No Data Found') {
        this.err = 'No Data Found'
      } else {
        this.err = ''
      }

    })
  }
}
