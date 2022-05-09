import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
declare var jQuery:any;

@Component({
  selector: 'app-teacher-course-detail',
  templateUrl: './teacher-course-detail.component.html',
  styleUrls: ['./teacher-course-detail.component.css']
})
export class TeacherCourseDetailComponent implements OnInit {
  id: any;
  courseData: any;
  courseSubdata: any;
  sidebarData: any;
  enrollID: any;
  enroll: any;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  subTitle: any;
  user: string;
  coursesName: void;
  title: void;
  courseFaqdata: any;
  fqButton: boolean;
  frame: string;
  expandedIndex:number;
  expandedIndexTitle:number;


  constructor(private service: ServiceService, private route: ActivatedRoute,private router: Router, private _sanitizer: DomSanitizer) {
    this.route.queryParamMap.subscribe(queryParams => {
      this.id = queryParams.get("id");
    })
   }

  ngOnInit(): void {
    this.courseDetail();
    this.sidebar();
    this.username();
    // this.addInitialForms();
  }
  username(){
    this.user = sessionStorage.getItem('username');
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
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
  showshubmenu(){
    this.ismenuShow=!this.ismenuShow
  }

  toggleShow(index) {
    this.expandedIndex = index === this.expandedIndex ? -1 : index;
  }
  toggleShowTitle(index){
    this.expandedIndexTitle = index === this.expandedIndexTitle ? -1 : index;
  }

  showsubmenu(){
    this.ismenu=!this.ismenu
  }

  showsub(){
    this.ismenusub=!this.ismenusub
  }

  dashboardShow1(){
    this.dashboardShow=!this.dashboardShow
  }

  profileShow1(){
    this.profileShow=!this.profileShow
  }
  // sidebar api
  sidebar() {
    const data ={
      user_id : sessionStorage.getItem('uid')
    }
    this.service.post('teacher_sidebar',data, 1).subscribe(res => {
      this.sidebarData = res.body.result;
    })
  }

  // view page
  view(id){
    this.router.navigate(['/teacherDashboard/student-view'], { queryParams: { viewpage: id } });
  }
  // getHtml(url) {
  //  var iframeStart = '<iframe' + url.split('<iframe')[1];
  //   var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
  //    finalIframe = finalIframe.replace('position: absolute', '');
  //   return this._sanitizer.bypassSecurityTrustHtml(
  //       finalIframe.replace(/\\"/g, '"')
  //   );
  // }
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
     return this._sanitizer.bypassSecurityTrustHtml(
      finalIframe.replace(/\\"/g, '"')
      );
    }else{
      return this._sanitizer.bypassSecurityTrustHtml(
       url.replace(/\\"/g, '"')
       );
    }
   }

  //  course detail api
  courseDetail(){
    const data = {
      course_id : this.id,
      user_id: sessionStorage.getItem('uid')
    }
    this.service.post('course-details', data , 1).subscribe(res =>{
      this.courseData = res.body.result;
      this.courseSubdata = res.body.result.subdata;
      this.courseFaqdata = res.body.result.faq;
      if(this.courseFaqdata == '' || this.courseFaqdata == null || this.courseFaqdata == undefined){
        this.fqButton = false
      }else{
        this.fqButton = true
      }

    })
  }
 //enroll api
 enrollId(data) {
  this.enrollID = data
  this.enroll = data.id
}
submitEnroll() {
  const data = {
    "course_id": this.enroll,
    user_id: sessionStorage.getItem('uid')
  }
  this.service.post('course-enroll', data, 1).subscribe(res => {
    jQuery('#summary').modal('show');
    if (res.body.message === "success") {

      jQuery('#enroll').modal('hide');

      setTimeout(() => {
        jQuery('#summary').modal('show');
      }, 100);
    }
  })
}

// submit on summay page
confirmPayment() {
  jQuery('#summary').modal('hide');
  setTimeout(() => {
  this.router.navigate(['/dashboard/teacherWallet']);
}, 1000);
}
  //sidebar accordion
  toggleAccordian(event, index,name,id) {
    this.coursesName = sessionStorage.setItem('course_name',name)
    sessionStorage.setItem('course-id',id)
   this.router.navigate(['/teacherDashboard/editCourse'], { queryParams: { id: id } });
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data,title) {
    this.title = sessionStorage.setItem('title',title)
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
    this.router.navigate(['/multimedia/contentStyle'], { queryParams: { id: sessionStorage.getItem('subId') } });
  }
}
