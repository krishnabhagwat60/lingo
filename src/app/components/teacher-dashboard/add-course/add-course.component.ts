import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ServiceService } from '../../service.service';
import * as Editor from 'ckeditor5/build/ckeditor';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  public Editor = Editor;
  editorConfig1 = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        'mediaEmbed',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        'undo',
        'redo',
      ],
    },
    mediaEmbed: {
      previewsInData: true,
      removeProviders: ['instagram', 'twitter', 'googleMaps', 'flickr', 'facebook']
    },
    language: 'en'
  };
  serviceForm = new FormArray([]);
  form = new FormArray([]);
  course: any;
  newCourseData: any;
  loder = false
  addCourseForm: FormGroup;
  timeData: any;
  studentFee: boolean = false;
  teacherFee: boolean = false;
  sidebarData: any;
  level: any;
  language: any;
  courseFee: boolean = false;
  teacherFees: boolean = false;
  feeBox: boolean = false;
  mainpageLoder: boolean = false;
  submitted: boolean = false;
  id: string;
  updateNewData: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedLanguage = [];
  selectedLanguages = [];
  selectedArr = []
  selectedArrr = []
  getEditorData: string;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  selectingLanguage = [];
  selectsLanguage = [];
  coursesName: void;
  titlename: void;
  subtitle: void;
  getImagePid: any;
  edit: boolean = false;
  add: boolean = false;
  updateNewDatas: any;
  getImagePids: any;
  editButoon: boolean = false;
  addButton: boolean = false;
  datas: string;
  titleData: any;
  sub_titleData: any;
  deleteBttons: boolean;
  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private router: Router, private service: ServiceService, private route: ActivatedRoute) {

    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
      this.deleteTitle();
    })
    this.addCourseForm = this.fb.group({
      employees: this.fb.array([]),
      faq: this.fb.array([]),
      courseName: ['', Validators.required],
      selectedItems: ['', Validators.required],
      level: ['', Validators.required],
      teachingLanguage: ['', Validators.required],
      courseType: ['', Validators.required],
      radio: ['',],
      // radio: ['',Validators.pattern('[0-9]*')],
      timeDurationHr: ['', Validators.required],
      timeDurationMin: ['', Validators.required],

      teacher_fee: ['',],
      otherLinkTextDescription: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.courseData();
    this.time();
    this.addInitialForms();
    this.sidebar();
    this.levelData();
    this.languageData();
    this.username();
  }
  username() {
    this.user = sessionStorage.getItem('username');
  }
  editorData({ editor }: ChangeEvent) {
    this.getEditorData = editor.getData();
  }
  onItemSelect(item: any) {
    this.selectedArr.push(item);
  }
  onTeacherSelect(item: any) {
    this.selectedArrr.push(item);
  }
  showValue(event) {
    this.courseFee = false;
    this.teacherFees = false;
    const selectedValue = event.target.value;
    if (selectedValue === 'public') {
      this.courseFee = true;
    }
    if (selectedValue === 'closed')
      this.teacherFees = true;
  }
  showInput(event) {
    this.feeBox = false;
    const selectValue = event.target.value;
    if (selectValue === 'monthly') {
      if (selectValue === 'monthly') {
        this.addCourseForm.controls['radio'].setValidators([Validators.required, Validators.pattern('[0-9]*')]);
      } else {
        this.addCourseForm.controls['radio'].clearValidators();
      }
      this.feeBox = true;
    } if (selectValue === 'free') {
      this.feeBox = false;
      this.addCourseForm.controls['radio'].clearValidators();
    }
  }
  getSubTitle(parent) {
    const data = {
      "title_id": parent
    }
    this.service.post('submenu-listing', data, 1).subscribe(res => {
      // console.log(res);
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
      //  console.log(this.sidebarData);
    })
  }
  // view page
  view(id) {
    this.router.navigate(['/exercise//teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  employees(): FormArray {
    return this.addCourseForm.get("employees") as FormArray
  }
  faq(): FormArray {
    return this.addCourseForm.get("faq") as FormArray
  }
  newFaq(): FormGroup {
    return this.fb.group({
      title: ['',],
      text: ['',],
      id: ''
    })
  }
  addFaq() {
    this.faq().push(this.newFaq());
  }
  removeFaq(faqIndex: number) {
    this.faq().removeAt(faqIndex);
  }
  newEmployee(): FormGroup {
    return this.fb.group({
      titleid: [''],
      title: ['', [Validators.required]],
      sub_title: this.fb.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  addInitialForms() {
      this.editButoon = false;
      this.addButton = true
      this.addEmployee();
      this.addEmployeeSkill(this.employees().controls.length - 1);
      this.faq().controls.length - 1;
      this.addFaq();
  }
  addInitialForm() {
    if (this.id) {
      this.addEmployee();
      this.addEmployeeSkill(this.employees().controls.length - 1);
      this.faq().controls.length - 1;

    } else {
      this.addEmployee();
      this.addEmployeeSkill(this.employees().controls.length - 1);
      this.faq().controls.length - 1;
    }
  }
  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }
  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get("sub_title") as FormArray
  }

  newSkill(): FormGroup {
    return this.fb.group({
      sub_title: ['', [Validators.required]],
      submenuId: [''],
    })

  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  submit() {
      this.addSubmit();
  }
  deleteTitle() {
    if (sessionStorage.getItem('course_id')) {
      this.edit = true;
    } else {
      this.add = true;
    }
  }
  // submit new course form
  get f() { return this.addCourseForm.controls; }
  addSubmit() {
    this.submitted = true;
    if (this.addCourseForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    if (this.addCourseForm.value.courseType === 'public') {
      this.studentFee = true;
    }
    if (this.addCourseForm.value.courseType === 'closed') {
      this.teacherFee = true;
    }
    const service_details = this.addCourseForm.value;
    const employees = this.form.getRawValue();
    service_details.coursePlan = employees;
    const titleForm = this.employees().getRawValue();
    const faqForm = this.faq().getRawValue();
    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }
    for (const data of this.selectedArrr) {
      this.selectedLanguages.push(data.key);
    }
    const data = {
      user_id: sessionStorage.getItem('uid'),
      "coursename": this.addCourseForm.value.courseName,
      "level": this.addCourseForm.value.level,
      "language": this.selectedLanguage,
      "teaching_language": this.selectedLanguages,
      "course_fee": this.addCourseForm.value.radio,
      "course_type": this.addCourseForm.value.courseType,
      "course_fee_teacher": this.addCourseForm.value.teacher_fee,
      "course_duration": this.addCourseForm.value.timeDurationHr + ':' +this.addCourseForm.value.timeDurationMin,
      "course_desc": this.addCourseForm.value.otherLinkTextDescription,
      "title_data": titleForm,
      "faq": faqForm
    }
    this.service.post('course-create', data, 1).subscribe(res => {
      sessionStorage.setItem('course_id', res.body.id)
      sessionStorage.setItem('course_name', res.body.course_name)
      sessionStorage.setItem('back',res.body.back)
      this.mainpageLoder = false;
      setTimeout(() => {
        this.router.navigate(['/multimedia/contentStyle']);
      }, 1000);

    })
  }
  // get course dropdown data
  courseData() {
    const data = {
      "name": "course_language"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.course = res.body.result;

    })
  }
  // get course dropdown data
  levelData() {
    const data = {
      "name": "level"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.level = res.body.result;
      // console.log(this.level);
    })
  }
  time() {
    const data = {
      "name": "time_duration"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.timeData = res.body.result;
      // console.log(this.course);
    })
  }
  // language api
  languageData() {
    this.service.get('profile-dropdown', 1).subscribe(res => {
      this.language = res.body.language_listing

    })
  }

  getHtml(url) {
    if(url && url.includes('<figure')){
     var split = url.split('<figure')
     var prefix = ''
     var suffix = ''
     if(split.length > 0){
       var removeLink = split[split.length -1].split('</figure>')
      prefix = split[0]
      if(removeLink.length > 0){
        suffix = removeLink[removeLink.length -1]
      }
     }
     var iframeStart = '<iframe' + url.split('<iframe')[1];
    var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
     finalIframe = finalIframe.replace('position: absolute', '');
     finalIframe  = prefix + finalIframe + suffix
     return this.sanitizer.bypassSecurityTrustHtml(
      finalIframe.replace(/\\"/g, '"')
      );
    }else{
      return this.sanitizer.bypassSecurityTrustHtml(
       url.replace(/\\"/g, '"')
       );
    }
   }
  deleteTitles(empIndex){
    var arr =this.addCourseForm.get("employees") as FormArray
    var item = arr.at(empIndex);
    if(item.value.titleid == ''){
    this.removeEmployee(empIndex)
    }else{
    this.deleteTitleData(empIndex)
    }
  }

  deleteSubTitles(formIndex, index){
    var arr =this.addCourseForm.get("employees") as FormArray
    var item = arr.at(formIndex);
    var subarray =item.value.sub_title
     var id = subarray[index].submenuId
    if(id == ''){
      this.removeEmployeeSkill(formIndex, index)
    }else{
      this.deleteSubTitleData(formIndex, index)
    }
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
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course_id', id)
    setTimeout(() => {
      this.router.navigate(['/teacherDashboard/editCourse']);
      }, 100);
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data, title) {
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
  getChildSData(child, subtitle) {
    this.subtitle = sessionStorage.setItem('subtitle', subtitle)
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/multimedia/contentStyle'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  deleteTitleData(formIndex) {
    this.mainpageLoder = true;
    const pId = this.updateNewDatas[formIndex]
    this.getImagePid = pId.titleid
    const data = {
      title_id: this.getImagePid
    }
    this.service.post('delete-course-title-subtitle', data, 1).subscribe(res => {
      this.mainpageLoder = false;
      if (res.body.message == 'success') {
        this.employees().removeAt(formIndex)
      }
    })
  }
  deleteSubTitleData(formIndex, index) {
    this.loder = true
    const pId = this.updateNewDatas[formIndex].submenu
    const subid = pId[index].id
    const data = {
      title_id: subid
    }
    this.service.post('delete-course-title-subtitle', data, 1).subscribe(res => {
      if (res.body.message === 'success') {
      this.loder = false;
        this.employeeSkills(formIndex).removeAt(index)
        setTimeout(() => {
          this.mainpageLoder = false;
        }, 1000);
      }
    })
  }
}
