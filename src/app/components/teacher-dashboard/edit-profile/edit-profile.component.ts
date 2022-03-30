import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ConfirmeValidator } from './confirmedEdit.validator';
import { find, get, pull } from 'lodash';
import * as Editor from 'ckeditor5/build/ckeditor';
import { Dimensions, ImageCroppedEvent, ImageTransform } from '../../image-cropper/interfaces';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public Editor = Editor;
  editorConfig1 = {
    toolbar: {
      items: [
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        'undo',
        'redo',
      ],
    },
    language: 'en'
  };
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  profileForm: FormGroup = new FormGroup({});
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  editData: any;
  userId: any;
  passwordShow: boolean = false;
  passwordForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  updateNewData: any;
  status: any;
  activated: boolean = false;
  errMsg: string;
  language: any;
  country: any;
  name = 'Angular';
  sidebarData: any;
  dropdownSettings = {};
  tags: string[] = [];
  selectedLanguage = [];
  selectedArr = []
  selectedNewArr = []
  selectedMainLanguage = []
  isImageShow: boolean = false;
  authToken: any = '';
  allCityList: any;
  allStateList: any;
  allCountryList: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  submit: boolean = false;
  imageUpdate: any;
  taged: any;
  newTag: any;
  msg: string;
  tagedd: any;
  subTitle: any;
  mainpageLoder: boolean = false;
  user: string;
  countryss: any = [];
  selectingLanguage: any = [];
  selectsLanguage: any = [];
  ErrMsg: string;
  mainLoder: boolean = false;
  coursesName: void;
  titlename: void;
  subtitle: void;
  imageSrc: string;
  updateNewDataImage: string;
  loding = false;
  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private eventEmitterService: EventEmitterService,
  ) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.userId = queryParams.get("userId");
    })
    this.passwordForm = fb.group({
      oldPassword: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmeValidator('pwd', 'confirm_password')
    })
  }

  ngOnInit(): void {
    if (this.userId) {
      this.editProfileForm.controls.email.disable();
    }
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.updateData();
    this.languageData();
    this.sidebar();
    this.getNewToken();
    this.username();
    // this.addInitialForms();
  }
  username() {
    this.user = sessionStorage.getItem('username');
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  onKeyUp(event: KeyboardEvent): void {
    this.submit = true;
    const inputValue: string = this.editProfileForm.controls.tag.value;
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag();
      return;
    } else {
      if (event.code === 'Comma' || event.code === 'Space' || event.code === 'Enter') {
        this.addTag(inputValue);
        this.submit = false;
        this.editProfileForm.controls.tag.setValue('');
      }
    }
  }

  addTag(tag: string): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      tag = tag.slice(0, -1);
    }
    if (tag.length > 0 && !find(this.tags, tag)) {
      this.tags.push(tag);

      this.submit = false;
    }
  }

  removeTag(tag?: string): void {
    if (!!tag) {
      pull(this.tags, tag);
    } else {
      this.tags.splice(-1);
    }
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

  // Image Update



  teacherImage() {
    this.mainpageLoder = true;
    this.loding = true;
    const data = {
      user_id: sessionStorage.getItem('uid'),
      avatar: this.updateNewDataImage
    }
    if(data.avatar !=undefined)
    {
    this.service.post('profile-update', data, 1).subscribe(res => {
     
      if (res.body.result === 'success') {
        this.loding = false;
        this.mainpageLoder = false;
        this.msg = 'Profile Updated Successfully'
         this.updateData();
        this.eventEmitterService.onProfileChanged();

        //window.location.reload();
        this.submitted = false;
      }
      this.loding = false;
    }
  
    )}
  }



  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  // validate edit profile form
  editProfileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    knownLanguage: new FormControl('', Validators.required),
    mainLanguage: new FormControl('', Validators.required),
    oldPass: new FormControl('',),
    newPass: new FormControl('',),
    confirmPass: new FormControl('',),
    tag: new FormControl('', [Validators.maxLength(51)]),
    bio: new FormControl('', Validators.required),
    responsibility: new FormControl('', Validators.required),
    countrys: new FormControl('', Validators.required),
    taged: new FormControl('',),
    image: new FormControl('',),
    fileSource: new FormControl('',),
  })
  onItemSelect(item: any) {
    this.selectedArr.push(item);
  }
  onSelectAll(items: any) {
    this.selectedArr.push(items);
    // console.log(this.selectedArr);
  }
  onMainSelect(item: any) {
    this.selectedNewArr.push(item);
  }
  onMainSelectAll(items: any) {
    this.selectedNewArr.push(items);
    // console.log(this.selectedArr);
  }
  profileUpdate() {
    if (this.imageUpdate != null) {
      this.editProfileById();
    } else {
      this.editProfile();
    }
  }

  editProfile() {
    this.submit = true;
    if (this.editProfileForm.invalid && this.updateNewDataImage) {
      return;
    }
    this.mainpageLoder = true
    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }
    for (const data of this.selectedNewArr) {
      this.selectedMainLanguage.push(data.key);
    }
    const data = {
      user_id: sessionStorage.getItem('uid'),
      "first_name": this.editProfileForm.value.firstName,
      "last_name": this.editProfileForm.value.lastName,
      "bio": this.editProfileForm.value.bio,
      "contact_number": this.editProfileForm.value.contactNumber,
      "known_language": this.selectedLanguage,
      "main_language": this.selectedMainLanguage,
      "skills": this.tags,
      "address": "Indore",
      "responsibilities": this.editProfileForm.value.responsibility,
      country: this.editProfileForm.value.countrys,
      state: this.editProfileForm.value.state,
      email: this.editProfileForm.value.email,
      avatar: this.updateNewDataImage
    }
    // console.log(data);
    this.service.post('profile-update', data, 1).subscribe(res => {
      localStorage.setItem('image', this.updateNewDataImage)
      this.editData = res;
      if (res.body.result === 'success') {
        this.mainpageLoder = false;
        this.eventEmitterService.onProfileChanged();
        //this.router.navigate(['/teacherDashboard/teacherProfile'])
        //  window.location.reload()
      }
    }
    )
  }
  get form() { return this.editProfileForm.controls; }

  // api for edit form
  editProfileById() {
    this.submit = true;
    if (this.editProfileForm.invalid) {
      return;
    }
    this.mainpageLoder = true
    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }
    for (const data of this.editProfileForm.value.mainLanguage) {
      this.selectingLanguage.push(data.key);
    }
    for (const data of this.editProfileForm.value.knownLanguage) {
      this.selectsLanguage.push(data.key);
    }
    for (const data of this.selectedNewArr) {
      this.selectedMainLanguage.push(data.key);
    }
    var teacherLanguage = this.updateNewData.main_language_id.concat(this.selectedMainLanguage)
    var studentLanguage = this.updateNewData.known_language_id.concat(this.selectedLanguage)
    var image_description = this.imageUpdate.concat(this.tags)
    this.imageUpdate = this.tags
    const data = {
      user_id: sessionStorage.getItem('uid'),
      "first_name": this.editProfileForm.value.firstName,
      "last_name": this.editProfileForm.value.lastName,
      "bio": this.editProfileForm.value.bio,
      "contact_number": this.editProfileForm.value.contactNumber,
      "known_language": studentLanguage,
      "main_language": teacherLanguage,
      "skills": image_description,
      "address": "Indore",
      "responsibilities": this.editProfileForm.value.responsibility,
      country: this.editProfileForm.value.countrys,
      state: this.editProfileForm.value.state,
      email: this.editProfileForm.value.email,
      avatar: this.updateNewDataImage

    }
    // console.log(data);
    this.service.post('profile-update', data, 1).subscribe(res => {
      localStorage.getItem('image')
      this.editData = res;
      if (res.body.result === 'success') {
        this.mainpageLoder = false;
        this.eventEmitterService.onProfileChanged();

        //this.router.navigate(['/teacherDashboard/teacherProfile'])
        //window.location.reload();
      }
    }
    )
  }

  // get data by id

  updateData() {
    const data = {
      "user_id": this.userId,
      "avatar" : this.updateNewDataImage
    }
    this.service.post('get_profile_by_id', data, 1).subscribe(res => {
      if (res.body.profile.status === '1') {
        this.activated = true;
      }
      this.updateNewData = res.body.profile;
      if(this.updateNewDataImage == undefined)
      {
        this.updateNewDataImage = res.body.profile.avatar;
      }
     // this.updateNewDataImage = res.body.profile.avatar;
      this.imageUpdate = res.body.profile.skills
      localStorage.setItem('image', res.body.profile.avatar )
      this.editProfileForm.patchValue({
        "firstName": this.updateNewData.firstname,
        "lastName": this.updateNewData.lastname,
        "bio": this.updateNewData.bio,
        "contactNumber": this.updateNewData.phone_number,
        "knownLanguage": this.updateNewData.known_language,
        "mainLanguage": this.updateNewData.main_language,
        countrys: this.updateNewData.country,
        state: this.updateNewData.State,
        "address": "Indore",
        "responsibility": this.updateNewData.responsibilities,
        email: this.updateNewData.email
      })
    }
    )
  }

  // form reset
  reset() {
    this.updateNewDataImage = "";
    this.profileForm.reset();
  }
  reseted() {
    this.updateNewDataImage = "";
  }
  // show change password
  passwordChange() {
    this.errMsg = ''
    this.passwordShow = true;
  }

  // 
  get f() { return this.passwordForm.controls; }

  // change password api
  changePassword() {
    this.submitted = true;
    if (this.passwordForm.invalid) {
      return;
    } else {
      this.mainLoder = true
      const data = {
        "old_pass": this.passwordForm.value.oldPassword,
        "new_pass": this.passwordForm.value.pwd,
        user_id: sessionStorage.getItem('uid')
      }
      this.service.post('change-password', data, 1).subscribe(res => {
        this.mainLoder = false
        if (res.body.message === 'Old Password Not Match') {
          this.ErrMsg = ''
          this.errMsg = 'Old Password Not Match'

        }
        if (res.body.message == 'success') {
          this.errMsg = ''
          this.ErrMsg = 'Password Changed Successfully'
        }
        if (res.body.message === 'success') {
          this.submitted = false
          this.passwordForm.reset();
        }
      })
    }
  }


  // language api
  languageData() {
    this.service.get('profile-dropdown', 1).subscribe(res => {
      this.language = res.body.language_listing
      this.country = res.body.country_listing

    })
  }
  getCountry() {
    this.allStateList = '';
    this.allCityList = null;
    this.service.getData('countries/', this.authToken).subscribe(res => {
      this.allCountryList = res
      this.allCountryList.forEach(element => {
        this.countryss.push(element.country_name)
      });
    })
  }

  getState() {
    this.isImageShow = true;
    this.allCityList = null;
    this.service.getData('states/' + this.editProfileForm.value.countrys, this.authToken).subscribe(result => {
      this.isImageShow = false;
      this.allStateList = result;
    })
  }
  getNewToken() {
    this.service.getAuthToken('getaccesstoken/').subscribe(result => {
      this.authToken = result.auth_token;
      this.getCountry();
    })
  }
  showshubmenu() {
    this.ismenuShow = !this.ismenuShow
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
  cropperReady(sourceImageDimensions: Dimensions) {

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateNewDataImage = reader.result as string;
        this.editProfileForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // 
  }

  imageLoaded() {
    this.showCropper = true;

  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  loadImageFailed() {

  }
}

