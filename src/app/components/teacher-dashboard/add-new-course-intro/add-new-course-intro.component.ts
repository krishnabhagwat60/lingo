import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
declare var $: any;
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor5/build/ckeditor';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-new-course-intro',
  templateUrl: './add-new-course-intro.component.html',
  styleUrls: ['./add-new-course-intro.component.css']
})
export class AddNewCourseIntroComponent implements OnInit {
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
  getPid: any;
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
    if (sessionStorage.getItem('course_id')) {
      this.updateData();
      this.editButoon = true;
      this.addButton = false;
    } else {
      this.editButoon = false;
      this.addButton = true
      this.addEmployee();
      this.addEmployeeSkill(this.employees().controls.length - 1);
      this.faq().controls.length - 1;
      this.addFaq();
    }
  }
  addInitialForm() {
    this.deleteBttons = false
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
      exercise: 'no'
    })

  }

  addEmployeeSkill(empIndex: number) {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  submit() {
    if (sessionStorage.getItem('course_id')) {
      this.editSubmit();
    } else {
      this.addSubmit();
    }
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
      "course_duration": this.addCourseForm.value.timeDuration,
      "course_desc": this.addCourseForm.value.otherLinkTextDescription,
      "title_data": titleForm,
      "faq": faqForm
    }
    this.service.post('course-create', data, 1).subscribe(res => {
      sessionStorage.setItem('course_id', res.body.id)
      sessionStorage.setItem('course_name', res.body.course_name)
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
    })
  }
  time() {
    const data = {
      "name": "time_duration"
    }
    this.service.post('get-category', data, 1).subscribe(res => {
      this.timeData = res.body.result;
    })
  }
  // language api
  languageData() {
    this.service.get('profile-dropdown', 1).subscribe(res => {
      this.language = res.body.language_listing

    })
  }
  onItemDeSelect(evt) {
    const index: number = this.selectedLanguages.indexOf(evt.key);
    if (index !== -1) {
      this.selectedLanguages.splice(index, 1);
    }
    else{
    const index1: number = this.updateNewData.teaching_id.indexOf(evt.key);
      this.updateNewData.teaching_id.splice(index1, 1);
    }
  }
  onItemStudentDeSelect(evt) {
    const index: number = this.selectedLanguage.indexOf(evt.key);
    if (index !== -1) {
      this.selectedLanguage.splice(index, 1);
    }
    else{
    const index1: number = this.updateNewData.language_id.indexOf(evt.key);
      this.updateNewData.language_id.splice(index1, 1);
    }
  }
  editSubmit() {
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
    const faqForm = this.faq().getRawValue();
    service_details.coursePlan = employees;
    const titleForm = this.employees().getRawValue();
    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }
    for (const data of this.addCourseForm.value.teachingLanguage) {
      this.selectingLanguage.push(data.key);
    }
    for (const data of this.addCourseForm.value.selectedItems) {
      this.selectsLanguage.push(data.key);
    }
    for (const data of this.selectedArrr) {
      this.selectedLanguages.push(data.key);
    }
    var teacherLanguage = this.updateNewData.teaching_id.concat(this.selectedLanguages)
    var studentLanguage = this.updateNewData.language_id.concat(this.selectedLanguage)
    const data = {
      courseid: sessionStorage.getItem('course_id'),
      "coursename": this.addCourseForm.value.courseName,
      "field_level": this.addCourseForm.value.level,
      "field_language": studentLanguage,
      "teaching_language": teacherLanguage,
      "course_fee": this.addCourseForm.value.radio,
      "course_type": this.addCourseForm.value.courseType,
      "course_fee_teacher": this.addCourseForm.value.teacher_fee,
      "course_duration": this.addCourseForm.value.timeDurationHr + ':' +this.addCourseForm.value.timeDurationMin,
      "course_desc": this.addCourseForm.value.otherLinkTextDescription,
      "title_data": titleForm,
      faq: faqForm
    }
    this.service.post('course-update', data, 1).subscribe(res => {
      sessionStorage.setItem('course_id', res.body.course_id)
      sessionStorage.setItem('course_name', res.body.course_name)
      sessionStorage.setItem('back', res.body.back)
      this.mainpageLoder = false;
      this.router.navigate(['/multimedia/contentStyle']);
    })
  }

  // patch data
  updateData() {
   
    this.employees().clear();
    this.faq().clear();

    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }
    const data = {
      "course_id": sessionStorage.getItem('course_id'),
      "user_id": sessionStorage.getItem('uid')
    }
    this.service.post('course-details', data, 1).subscribe(res => {
      this.updateNewData = res.body.result;
      this.updateNewDatas = res.body.result.subdata;
      var time = res.body.result.time_duration.split(':');
      var hour = time[0]
      var min = time[1]
      this.addCourseForm.patchValue({
        "level": this.updateNewData.level_id,
        "courseName": this.updateNewData.title,
        "selectedItems": this.updateNewData.field_language,
        "teachingLanguage": this.updateNewData.teaching_language,
        "radio": this.updateNewData.field_course_fees,
        "courseType": this.updateNewData.course_type,
        "teacher_fee": this.updateNewData.field_course_fees,
        "timeDurationHr":hour,
        "timeDurationMin":min,
        "otherLinkTextDescription": this.updateNewData.field_course_description,
        title_data: this.updateNewData.title
      })
      if (res.body.result.course_type === 'closed') {
        this.teacherFee = true;
      }
      for (let i = 0; i < res.body.result.subdata.length; i++) {
        this.addEmployee();
        for (let j = 0; j < res.body.result.subdata[i].submenu.length; j++) {
          this.sub_titleData = res.body.result.subdata[i].submenu[j];
          this.addEmployeeSkill(i);
          this.employeeSkills(i).at(j).patchValue({
            sub_title: this.sub_titleData.name,
            submenuId: this.sub_titleData.id,
            exercise: this.sub_titleData.exercise,
          })
          if (this.sub_titleData.exercise == 'no') {
            this.deleteBttons = true
          } else if (this.sub_titleData.exercise == 'yes') {
            this.deleteBttons = false
          } else {
            this.deleteBttons = false
          }
        }
        this.titleData = res.body.result.subdata[i];
        this.employees().at(i).patchValue({
          titleid: this.titleData.titleid,
          title: this.titleData.title
        })
      }
      for (let i = 0; i < res.body.result.faq.length; i++) {
        this.addFaq();
        const titleData = res.body.result.faq[i];
        this.faq().at(i).patchValue({
          id: titleData.id,
          title: titleData.title,
          text: titleData.text
        })
      }
    }
    )
  }
  getHtml(url) {
    if (url.includes('<figure')) {
      var split = url.split('<figure')
      var prefix = ''
      var suffix = ''
      if (split.length > 0) {
        var removeLink = split[split.length - 1].split('</figure>')
        prefix = split[0]
        if (removeLink.length > 0) {
          suffix = removeLink[removeLink.length - 1]
        }
      }
      var iframeStart = '<iframe' + url.split('<iframe')[1];
      var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
      finalIframe = finalIframe.replace('position: absolute', '');
      finalIframe = prefix + finalIframe + suffix
      return this.sanitizer.bypassSecurityTrustHtml(
        finalIframe.replace(/\\"/g, '"')
      );
    } else {
      return this.sanitizer.bypassSecurityTrustHtml(
        url.replace(/\\"/g, '"')
      );
    }
  }
  deleteFaqs(faqIndex) {
    var arr = this.addCourseForm.get("faq") as FormArray
    var item = arr.at(faqIndex);
    if (item.value.id == '' || item.value.id == null || item.value.id == undefined) {
      this.removeFaq(faqIndex)
    } else {
      this.deleteFaq(faqIndex)
    }
  }


  deleteTitles(empIndex) {
    var arr = this.addCourseForm.get("employees") as FormArray
    var item = arr.at(empIndex);
    if (item.value.titleid == '') {
      this.removeEmployee(empIndex)
    } else {
      this.deleteTitleData(empIndex)
    }
  }

  deleteSubTitles(formIndex, index) {
    var arr = this.addCourseForm.get("employees") as FormArray
    var item = arr.at(formIndex);
    var subarray = item.value.sub_title
    var id = subarray[index].submenuId
    if (id == '') {
      this.removeEmployeeSkill(formIndex, index)
    } else {
      this.deleteSubTitleData(formIndex, index)
    }
  }
  deleteFaq(formIndex) {
    this.mainpageLoder = true;
    const pId = this.updateNewData.faq[formIndex]
    this.getPid = pId.id
    const data = {
      p_id: this.getPid
    }
    this.service.post('delete-course-exercise', data, 1).subscribe(res => {
      if (res.body.message == 'success') {
        this.mainpageLoder = false;
        this.employees().removeAt(formIndex)
        // this.addInitialForms();
        this.updateData();
      }

    })

  }
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.route.queryParams.subscribe(c => {
      const params = Object.assign({}, c);
      delete params.dapp;
      this.router.navigate([], { relativeTo: this.route, queryParams: params });
    }).unsubscribe();
    this.route.queryParamMap.subscribe(queryParams => {
      var ids = sessionStorage.getItem('course_id')
      this.id = queryParams.get(ids);
      this.add = false;
      setTimeout(() => {
        this.updateData();
      }, 100);
    })
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course_id', id)
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
        // this.addInitialForms();
        this.updateData();
      }

    })
  }
  deleteSubTitleData(formIndex, index) {
    this.loder = true
    // this.mainpageLoder = true;
    const pId = this.updateNewDatas[formIndex].submenu
    const subid = pId[index].id
    const data = {
      title_id: subid
    }
    this.service.post('delete-course-title-subtitle', data, 1).subscribe(res => {
      if (res.body.message === 'success') {
        this.loder = false
        this.employeeSkills(formIndex).removeAt(index)
        // this.addInitialForms();
        // this.updateData();
        setTimeout(() => {
          this.mainpageLoder = false;
        }, 1000);
      }
    })
  }
}
