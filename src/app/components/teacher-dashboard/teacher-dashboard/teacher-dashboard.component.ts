import { Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ServiceService } from '../../service.service';
declare var $: any;
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { FrontService } from 'src/app/services/front.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  // @ViewChild('invite') invite: ElementRef;
  @ViewChild('invite') myInputVariables: ElementRef;

  getCourse: any;
  sidebarData: any;
  current_page = 1;
  totalPages: any[];
  pageno: any;
  buttonColor: number;
  mainpageLoder: boolean = true;
  buttonShow: boolean = true;
  inviteFormData = new FormArray([])
  inviteName: any;
  audSrc: any;
  msgShow: string;
  submitted: boolean = false; isAnyOneEmailAdded = false;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  err: string;
  term: string;
  coursesName: void;
  subtitle: void;
  title: void;
  prevButton: boolean = false;
  questionButton: boolean = false;
  questionButtons: boolean = false;
  pages: number;
  inviteId: any;
  courseName: any;
  image: string;
  isEmailDiasable = false;
  isBulkuploaded = false;
  studentInvitationFile: File[] = [];
  // email = (<HTMLInputElement>document.getElementById("email")).value;
  // bulk = (<HTMLInputElement>document.getElementById("bulk")).value;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(private service: ServiceService, private router: Router,
    private injector: Injector,
    private authService: SocialAuthService, private ngxCsvParser: NgxCsvParser) {
    this.image = localStorage.getItem('image')
  }

  ngOnInit(): void {
    this.getTeacherCourse(1, 0);
    this.AccordionInitialForms(0);
    this.username();
  }
  logout() {
    sessionStorage.clear();
    this.frontServices.vm.sidebarData = null;

    this.router.navigate(['/login'])
    this.signOut()
  }
  signOut(): void {
    this.authService.signOut();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/view-student'], { queryParams: { viewpage: id } });
  }
  // get teacher course api
  getTeacherCourse(page = 1, i) {
    this.pages = page
    this.mainpageLoder = true;
    this.current_page = Number(page);
    const data = {
      "id": "1",
      "page": page,
      user_id: sessionStorage.getItem('uid')
    }
    this.buttonColor = i;
    this.service.post('get-teacher-course', data, 1).subscribe(res => {
      this.getCourse = res.body.data;
      console.log(this.getCourse)
      if (!this.getCourse.length) {
        this.err = 'No Data Found'
      }
      if (res.body.data) {
        this.mainpageLoder = false;
      }
      if (res.body.total === 1 || res.body.total === 0 || res.total_course == null) {
        this.buttonShow = false;
      }
      if (i == 1) {
        this.questionButton = true;

        // this.questionButtons = true
      } else if (i == 0) {
        this.questionButton = false;
        this.questionButtons = false

      }
      if (i + 1 == res.body.total) {
        this.questionButtons = true
        this.questionButton = true;
      } else if (i = !res.body.total) {
        this.questionButtons = false
      }
      this.totalPages = [];
      for (let i = 0; i < res.body.total; i++) {
        if (res.body.total > 1) {
          this.prevButton = true;
        }
        this.totalPages.push(i + 1);
      }
    })
  }

  // pagination
  direction(direction, i) {
    window.scrollTo(0, 0)
    if (direction == 0) {

      if (this.current_page != 1) {
        var data = this.current_page - 1
        this.getTeacherCourse(data, data - 1)
      }
    } else {
      var data = this.current_page + 1
      this.getTeacherCourse(data, data - 1)
    }
  }

  // invite form validate
  inviteForm = new FormGroup({
    courseName: new FormControl('',),
    bulk: new FormControl(''),

  })




  // accept student api
  viewDetail(id) {
    this.router.navigate(['/teacherDashboard/teacherCourseDetail'], { queryParams: { id: id } });
  }
  acceptCourseDetail(id) {
    this.router.navigate(['/teacherDashboard/accept_details'], { queryParams: { id: id } });
  }

  // course published api
  publishApi(id) {
    const data = {
      "courseid": id
    }
    this.service.post('course-published', data, 1).subscribe(res => {
      this.getTeacherCourse(1, 0);
    })
  }
  AccordionInitialForms(index) {

    this.addNewServiceData()
    this.inviteFormData.controls.length - 1;
  }
  setEmailControl(index) {
    return this.inviteFormData.controls[index].invalid;
  }
  // setForm(event) {
  //   debugger
  //  let email =event.value
  //  console.log(email)

  // }
  // onKey(event: any) {
  //   debugger
  //   let shiv = event.target.value
  //   console.log(shiv);

  // }
  setVisibilityUploader() {
    return this.inviteFormData.value.every(x => x.email != '') && this.inviteFormData.controls.every(x => x.status == "VALID");
  }
  addNewServiceData() {
    debugger
    this.isAnyOneEmailAdded = true;
    const searchForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
    })

    this.inviteFormData.push(searchForm);

    this.inviteFormData.controls['email'].valueChanges.subscribe(value => {
      debugger;
      if (this.inviteFormData.length && this.inviteFormData.value[0].email.length) {
        this.isBulkuploaded = true;

      } else {
        this.isBulkuploaded = false
      }
    });
  }

  deleteServiceFieldData(formIndex) {
    this.inviteFormData.removeAt(formIndex);
  }

  audFileSelected(event: any) {
    debugger
    const fileCheck = event.target.files[0];
    for (let index = 0; index < event.target.files.length; index++) {
      this.inviteName = (event.target.files[index].name);
      const file = event.target.files[index];
      this.ngxCsvParser.parse(file, { header: false, delimiter: ',' })
        .pipe().subscribe((result: Array<any>) => {
          this.audSrc = result;
          this.inviteFormData.clear();
          this.addNewServiceData()
          //  (this.addImageData as FormGroup).get('audio').patchValue('');
        }, (error: NgxCSVParserError) => {
        });

      this.studentInvitationFile.push(file);
    }
    if (fileCheck && fileCheck != undefined && fileCheck != null) {
      this.isEmailDiasable = true;
    } else {
      this.isEmailDiasable = false
    }
  }

  removeFile(event: any) {
    this.inviteForm.controls.bulk.setValue('')
    this.isEmailDiasable = false; this.inviteName = '';
  }

  emailData() {
    debugger
    this.audSrc = ''
    this.inviteName = ''
    this.myInputVariables.nativeElement.value = '';

    //   console.log(shiv);



  }
  // get invite id
  getInviteId(id, name) {
    this.inviteId = id
    this.courseName = name
  }
  // invite api
  get f() { return this.inviteFormData.controls; }
  inviteApi() {
    var data = {}
    if (!this.audSrc) {
      const dataInvite = this.inviteFormData.getRawValue();
      data = {
        email: dataInvite,
        course_name: this.inviteForm.value.courseName ? this.inviteForm.value.courseName : this.coursesName,
        course_id: this.inviteId
      }
    } else {
      const dataInvite = []
      this.audSrc.forEach(element => {
        dataInvite.push({
          email: element[0]
        })
      });
      data = {
        email: dataInvite,
        course_name: this.inviteForm.value.courseName ? this.inviteForm.value.courseName : this.coursesName,
        course_id: this.inviteId
      }
    }
    this.service.post('invite-student', data, 1).subscribe(res => {
      if (res.body.result.message == 'Sent Successfully') {
        this.msgShow = 'Successfully Sent.'
        setTimeout(() => {
          this.myInputVariables.nativeElement.click();
          location.reload();
        }, 1000);
      }
      if (res.body.result.message == 'No Email Found') {
        this.msgShow = 'No Email Found.'
      }
    })
  }

  // view student
  viewStudent(id) {
    this.router.navigate(['/teacherDashboard/view-student'], { queryParams: { id: id } });
  }
  editStudent(id) {
    sessionStorage.setItem('course_id', id)
    setTimeout(() => {
      this.router.navigate(['/teacherDashboard/editCourse']);
    }, 100);
  }

  searchform = new FormGroup({
    searchData: new FormControl('',),
    rating: new FormControl('',)
  })
  searchDatas() {
    this.err = ''
    this.mainpageLoder = true;
    if (this.searchform.value.searchData == '') {
      this.getTeacherCourse(1, 0)
    } else {
      const data =
      {
        "name": this.searchform.value.searchData,
        "teaching_language": '',
        "course_language": '',
        "teacher_id": sessionStorage.getItem('uid'),
        "level_id": '',
        "rating": this.searchform.value.rating,
        "page": this.pages,
      }
      // this.buttonColor = i;
      this.service.post('course-filter', data, 1).subscribe(res => {
        this.getCourse = res.body.data;
        this.mainpageLoder = false;
        this.totalPages = [];

        for (let i = 0; i < res.body.total_course; i++) {
          this.totalPages.push(i + 1);

        }
        if (res.body.total_course === 1 || res.body.total_course === 0 || res.total_course == null) {
          this.buttonShow = false;
        } else {
          this.buttonShow = true
        }
        if (res.body.data[0].message == 'No Data Found') {
          this.err = 'No Data Found'
        }
      })
    }
  }
}
