import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { interval } from 'rxjs';
@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {
  profileData: any;
  profileDataa: any;
  sidebarData: any;
  @ViewChild('editProfileDiv') editProfileDiv: ElementRef<HTMLElement>;

  subMenu: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  coursesName: void;
  subtitle: void;
  title: void;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  image: string;
  constructor(private service: ServiceService, private router: Router) {
    this.image = localStorage.getItem('image')
   }

  ngOnInit(): void {
    this.getProfile();
    this.sidebar();
    this.username();
setInterval (() => {
  if(this.editProfileDiv !=undefined)
  {

    let el: HTMLElement = this.editProfileDiv.nativeElement;
    el.click();
  }
}, 1000);

  }

  username() {
    this.user = sessionStorage.getItem('username');
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent)
    
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }

  getProfile() {
    const data = {
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('get_profile_by_id', data, 1).subscribe(res => {
      this.profileData = res.body.profile;
      this.profileDataa = res.body.profile.skills;
      localStorage.setItem('image',res.body.profile.avatar)
    this.image = localStorage.getItem('image')

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
  //  send data in edit form
  sendData() {
    var userId = sessionStorage.getItem('uid');
    if (userId) {
      this.router.navigate(['/teacherDashboard/editProfile'], { queryParams: { userId: userId } });
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

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }

  //sidebar accordion
  toggleAccordian(name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name)
    sessionStorage.setItem('course-id', id)
    this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
  }

  toggleSubTitle(event, data, title) {
    this.title = sessionStorage.setItem('title', title)
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
}
