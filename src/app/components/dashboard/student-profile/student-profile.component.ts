import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ConfirmedValidator } from './../../register/confirmed.validator';
declare var $: any;
import { HttpClient } from '@angular/common/http';
// import { Dimensions, ImageCroppedEvent, ImageTransform } from './image-cropper/interfaces/index';
// import {base64ToFile} from './image-cropper/utils/blob.utils';
// import { ImageCroppedEvent } from 'ngx-image-cropper';
// import { IDropdownSettings, IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  submitted: boolean = false;
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({})
  country: any;
  language: any;
  editData: any;
  activated: boolean;
  updateNewData: any;
  errMsg: string;
  passwordShow: boolean;
  sidebarData: any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedLanguage = [];
  selectedArr = []
  allStateList: string;
  allCityList: any;
  allCountryList: any;
  isImageShow: boolean;
  authToken: any;
  subTitle: any;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  dashboardShow: boolean = false;
  profileShow: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  user: string;
  countrys: any;
  countryss: any = [];
  msg: string;
  mainpageLoder = false;
  submit: boolean = false;
  successmsg: string;
  mainLoder: boolean = false;
  coursesName: void;
  updateNewDataImage: string;
  imageSrc: string;
  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.profileForm = fb.group({
      firstName: new FormControl('', [Validators.required, , Validators.pattern('^[a-zA-Z ]*$')]),
      lastName: new FormControl('', [Validators.required, , Validators.pattern('^[a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]),
      contactNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,10}')]),
      state: new FormControl('', Validators.required),
      countrys: new FormControl('', Validators.required),
      selectedItems: new FormControl('', Validators.required),
      image: new FormControl('',),
      fileSource: new FormControl('',),
    })
    this.passwordForm = fb.group({
      oldPassword: new FormControl('', Validators.required),
      pwd: new FormControl('', Validators.required),
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('pwd', 'confirm_password')
    })
  }

  ngOnInit(): void {
    this.getNewToken();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'key',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.languageData();
    this.updateData();
    this.username();
  }

  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateNewDataImage = reader.result as string;
        this.profileForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  onItemSelect(item: any) {
    this.selectedArr.push(item);
  }
  onSelectAll(items: any) {
    this.selectedArr.push(items);
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  get f() { return this.profileForm.controls; }

  studentProfile() {
    this.submitted = true;
    if (this.profileForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    for (const data of this.selectedArr) {
      this.selectedLanguage.push(data.key);
    }

    const data = {
      user_id: sessionStorage.getItem('uid'),
      "first_name": this.profileForm.value.firstName,
      "last_name": this.profileForm.value.lastName,
      "bio": this.profileForm.value.bio,
      "contact_number": this.profileForm.value.contactNumber,
      "known_language": this.selectedLanguage,
      "main_language": this.profileForm.value.mainLanguage,
      "skill": "0",
      "address": "Indore",
      "responsibilities": this.profileForm.value.responsibility,
      "country": this.profileForm.value.countrys,
      "state": this.profileForm.value.state,
      "email": this.profileForm.value.email,
      avatar: this.updateNewDataImage
    }
    
    this.service.post('profile-update', data, 1).subscribe(res => {
      this.editData = res;
      if (res.body.result === 'success') {
        this.mainpageLoder = false;
        this.msg = 'Profile Updated Successfully'
        this.updateData();
        window.location.reload();
        this.submitted = false;
      }
    }
    )
  }
  studentImage(){
    debugger
    const data = {
      user_id: sessionStorage.getItem('uid'),
      avatar: this.updateNewDataImage
    }
    this.service.post('profile-update', data, 1).subscribe(res => {
      debugger
      if (res.body.result === 'success') {
        this.mainpageLoder = false;
        this.msg = 'Profile Updated Successfully'
        // this.updateData();
        window.location.reload();
        this.submitted = false;
      }
    }
    )
  }
  reset() {
    debugger
    this.updateNewDataImage="";
    this.profileForm.reset();
  }
  reseted(){
    this.updateNewDataImage="";
  }
  // patch data
  updateData() {
    const data = {
      "user_id": sessionStorage.getItem('uid')
    }
    this.service.post('get_profile_by_id', data, 1).subscribe(res => {
      if (res.body.profile.status === '1') {
        this.activated = true;
      }
      this.updateNewData = res.body.profile;
      this.updateNewDataImage = res.body.profile.avatar;
      localStorage.setItem('image', this.updateNewDataImage)
      localStorage.getItem('image')
      this.profileForm.patchValue({
        "firstName": this.updateNewData.firstname,
        "lastName": this.updateNewData.lastname,
        "bio": this.updateNewData.bio,
        "contactNumber": this.updateNewData.phone_number,
        "selectedItems": this.updateNewData.known_language,
        "mainLanguage": this.updateNewData.main_language,
        "skill": "0",
        "address": "Indore",
        "responsibility": this.updateNewData.responsibilities,
        "email": this.updateNewData.email,
        "state": this.updateNewData.State,
        "countrys": this.updateNewData.country
      })
      if (this.updateNewData.State != undefined || this.updateNewData.State != null) {
        this.getState();
      }
    }
    )
  }

  // language api
  languageData() {
    this.service.get('profile-dropdown', 1).subscribe(res => {
      this.language = res.body.language_listing
      this.country = res.body.country_listing
    })
  }

  // show change password
  passwordChange() {
    this.passwordShow = true;
  }

  get fn() { return this.passwordForm.controls; }
  // change password api
  changePassword() {
    this.submit = true;
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
        this.mainLoder = false;
        if (res.body.message === 'Old Password Not Match') {
          this.errMsg = 'Old Password Not Match'
        }
        if (res.body.message === 'success') {
          this.successmsg = 'Password Changed Successfully'
          this.submit = false;
          this.passwordForm.reset();
        }
      })
    }
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
    this.service.getData('states/' + this.profileForm.value.countrys, this.authToken).subscribe(result => {
      this.isImageShow = false;
      this.allStateList = result;
      // console.log(result)
    })
  }
  getNewToken() {
    this.service.getAuthToken('getaccesstoken/').subscribe(result => {
      this.authToken = result.auth_token;
      this.getCountry();

    })
  }
  cancelPassword() {
    this.passwordShow = false;
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
