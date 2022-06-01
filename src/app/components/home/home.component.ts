import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featured: any;
  question: any;
  studentData: any;
  teacherData: any;
  courseData: any;
  banner: any;
  features: any;
  loding = true;
  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getQuestion();
    this.getFeature();
    this.getStudent();
    this.getTeacher();
    this.newCourse();
    this.getBanner();
    this.getFeatures();
  }
  // get features api
  getFeature() {
    const data = {
      "id": "1"
    }
    this.service.post('get-features', data, 0).subscribe(res => {
      this.featured = res.data;
    })
  }

  // get question api
  getQuestion() {
    const data = {
      "id": "1"
    }
    this.service.post('get-questions', data, 0).subscribe(res => {
      this.question = res.data;
    })
  }

  // get api for student
  getStudent() {
    const data = {
      "id": "1"
    }
    this.service.post('get-for-student', data, 0).subscribe(res => {
      this.studentData = res.data[0];
    })
  }

  // get api for teacher
  getTeacher() {
    const data = {
      "id": "1"
    }
    this.service.post('get-for-teacher', data, 0).subscribe(res => {
      this.teacherData = res.data[0];
    })
  }
  
  // newest course data
  newCourse(){
    const data ={
      "id" : "1"
    }
    this.service.post('newest-course', data, 0).subscribe(res => {
      this.courseData = res.data;
    })
  }

  // get banner api
   getBanner(){
     const data = {
       "id" : "1"
     }
     this.service.post('get-banner', data, 0).subscribe(res => {
       this.loding = false;
      this.banner = res.data[0];
     
    })
   }

  //  get features api
  getFeatures(){
    const data = {
      "id" : "1"
    }
    this.service.post('get-features', data, 0).subscribe(res => {
      this.features = res.data;
    })
  }
}
