import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import $ from 'jquery';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { FrontService } from 'src/app/services/front.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent implements OnInit {
  selectedWordArray: Map<String, String>;
  sidebarData: any;
  selected1 = Array<any>();
  user: string;
  wallet: string;
  fillTheBlanksData: any;
  affiliationData: any;
  pickTheRight: any;
  textDrag: any;
  imageDrag: any;
  questionRadioButton: any;
  multimediaAccordion: any;
  questionDropDown: any;
  id: string;
  affi: boolean = false;
  fill: boolean = false;
  pick: boolean = false;
  dragText: boolean = false;
  dragImage: boolean = false;
  questionRadio: boolean = false;
  questionButton: boolean = false;
  questionDrop: boolean = false;
  courseNameData: string;
  authenticate: string;
  courses: boolean = false;
  affiId: any;
  affisId = [];
  questionId = [];
  radioId = [];
  affiP_id = [];
  radioP_id = [];
  pickId = [];
  questionP_id = [];
  imageDragArr: any = [];
  imageId = [];
  imageP_id = [];
  value: any;
  affiValue: any;
  finalArr: any = [];
  pickArr: any = [];
  questionArr: any = [];
  radioArr: any = [];
  affiData: any;
  titleData: any;
  answer: any;
  imageArr: any = [];
  a: any;
  answerArr: any = [];
  imagePid = [];
  LIST_IDS = [];
  HighlightRow: Number;
  selectedText: Selection;
  selectedWord: string;
  text: any;
  selectedArr = [];
  pickp_id: any;
  arrayLength: number = 0;
  replaceData: any;
  fillValue = [];
  fillId: any;
  fillArr = [];
  fillData: void;
  fillTitle: any = [];
  pickData: void;
  pickTitle: any = [];
  radioData: void;
  imageDataTitle: void;
  textDataTitle: void;
  dropDataTitle: void;
  courseId: string;
  teacherName: string;
  ratings: string;
  showmsg: string;
  ismenuShow: boolean = false;
  ismenu: boolean = false;
  ismenusub: boolean = false;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  sidebarData2: any;
  subTitle: any;
  mainpageLoder = true;
  errMsg: string;
  uniqueArray: any[];
  radioUniqueArray: any[];
  coursesName: void;
  courseid: void;
  name: void;
  studentRating: void;
  image: any;
  images: string;
  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  constructor(
    private router: Router,
    private service: ServiceService,
    private injector: Injector,
    private authService: SocialAuthService,
    private _location: Location,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private _sanitizer: DomSanitizer
  ) {
    this.route.queryParamMap.subscribe((queryParams) => {
      this.id = queryParams.get('id');
    });
    this.images = localStorage.getItem('image');
  }

  ngOnInit(): void {
    $('p>span').click(function (event) {});
    this.studentDetail();
    this.sidebar();
    this.username();
    this.walletData();
    this.affiliationList();
    this.get();
    this.courseName();
    this.getImageDrag();
    this.getTextDrag();
    this.getQuestion();
    this.authenticateName();
    this.getRadio();
    this.pickGetData();
    this.studentSideBar();
  }

  showshubmenu() {
    this.ismenuShow = !this.ismenuShow;
  }

  showsubmenu() {
    this.ismenu = !this.ismenu;
  }

  showsub() {
    this.ismenusub = !this.ismenusub;
  }

  dashboardShow1() {
    this.dashboardShow = !this.dashboardShow;
  }

  profileShow1() {
    this.profileShow = !this.profileShow;
  }

  getSubTitle(parent) {
    const data = {
      title_id: parent,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('submenu-listing', data, 1).subscribe((res) => {
      // console.log(res);
      this.subTitle = res.body.result;
    });
  }
  getChildData(child) {
    sessionStorage.setItem('subId', child);
    this.affiliationList();
    // this.getMultimedia();
  }
  displayPermission(data) {
    // console.log(logic needed);
  }
  getHtmlText(url) {
    return this._sanitizer.bypassSecurityTrustHtml(url);
  }
  // get question with dropdown
  getQuestion() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('question-dropdown-get', data, 1).subscribe((res) => {
      (this.questionDropDown = res.body.result),
        (this.dropDataTitle = sessionStorage.setItem(
          'question_title',
          res.body.result[0].title
        ));
      if (res.body.result) {
        this.questionDrop = true;
      }
    });
  }
  // get question dropdown value
  getQuestionValue(data, id) {
    // alert(data)
    var isAlreadyExist = false;
    var index = -1;
    for (let i = 0; i < this.questionArr.length; i++) {
      var ids = this.questionArr[i].p_id;
      if (ids == id) {
        isAlreadyExist = true;
        index = i;
        break;
      }
    }
    if (isAlreadyExist && index != -1) {
      this.questionArr[index].value = data;
    } else {
      this.questionArr.push({
        p_id: id,
        value: data,
      });
    }
  }
  getHtml(url) {
    var iframeStart = '<iframe' + url.split('<iframe')[1];
    var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
    finalIframe = finalIframe.replace('height: 100%', 'height : 400px');
    finalIframe = finalIframe.replace('position: absolute', '');
    return this._sanitizer.bypassSecurityTrustHtml(
      finalIframe.replace(/\\"/g, '"')
    );
    // return this._sanitizer.bypassSecurityTrustHtml(url.replace(/\\"/g, '"'));
  }
  // affiliation show result api
  showQuestionData() {
    sessionStorage.setItem('questiondata', JSON.stringify(this.questionArr));
    const data1 = {
      title_data: this.questionArr,
      type: 'dropdowns',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }
  // get text drag drop
  getTextDrag() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('text-dragdrop-get', data, 1).subscribe((res) => {
      this.textDrag = res.body.result;
      this.textDataTitle = sessionStorage.setItem(
        'text_title',
        res.body.result[0].title
      );
      if (res.body.result) {
        this.dragText = true;
      }
    });
  }
  // get image drag and drop
  getImageDrag() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('image-dragdrop-get', data, 1).subscribe((res) => {
      this.imageDrag = res.body.result;
      this.imageDataTitle = sessionStorage.setItem(
        'image_title',
        res.body.result[0].title
      );
      if (res.body.result) {
        this.dragImage = true;
      }
    });
  }
  authenticateName() {
    this.authenticate = sessionStorage.getItem('student');
    if (this.authenticate) {
      this.courses = true;
    }
  }
  courseName() {
    this.courseNameData = sessionStorage.getItem('course_name');
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
    this.signOut();
  }
  signOut(): void {
    this.authService.signOut();
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }
  walletData() {
    this.wallet = sessionStorage.getItem('wallet');
  }
  sidebar() {
    debugger;
    console.log(' student  view', this.frontServices.vm);

    if (
      this.frontServices == null ||
      this.frontServices.vm == null ||
      this.frontServices.vm.sidebarData == null ||
      this.frontServices.vm.sidebarData.length == 0
    ) {
      const data = {
        user_id: sessionStorage.getItem('uid'),
      };
      this.service.post('teacher_sidebar', data, 1).subscribe((res) => {
        this.sidebarData = res.body.result;
        this.frontServices.vm.sidebarData = this.sidebarData;

        //  console.log(this.sidebarData);
      });
    } else {
      this.sidebarData = this.frontServices.vm.sidebarData;
    }
  }
  // get affiliation
  get() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('exercises-get', data, 1).subscribe((res) => {
      this.affiliationData = res.body.result;
      this.affiData = sessionStorage.setItem('title', res.body.result[0].title);
      if (this.affiliationData) {
        this.affi = true;
      }
    });
  }
  // get radio button api
  getRadio() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };

    this.service.post('radio-button-get', data, 1).subscribe((res) => {
      this.questionRadioButton = res.body.result;
      this.radioData = sessionStorage.setItem(
        'radio_title',
        res.body.result[0].title
      );

      if (res.body.result) {
        this.questionRadio = true;
      }
    });
  }
  // get question dropdown value
  getRadioValue(data, id) {
    var isAlreadyExist = false;
    var index = -1;
    for (let i = 0; i < this.radioArr.length; i++) {
      var ids = this.radioArr[i].p_id;
      if (ids == id) {
        isAlreadyExist = true;
        index = i;
        break;
      }
    }
    if (isAlreadyExist && index != -1) {
      this.radioArr[index].value = data;
    } else {
      this.radioArr.push({
        p_id: id,
        value: data,
      });
    }
  }
  // affiliation show result api
  showRadioData() {
    // this.radioUniqueArray.forEach((data,i)=>{
    //   this.radioArr.push({ 'value': this.radioId[i], "p_id": data })
    // })
    sessionStorage.setItem('radiodata', JSON.stringify(this.radioArr));
    const data1 = {
      title_data: this.radioArr,
      type: 'radio',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }

  // get exercise data api
  affiliationList() {
    this.mainpageLoder = true;
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('allexercises-get', data, 1).subscribe((res) => {
      this.mainpageLoder = false;
      this.fillTheBlanksData = res.body.result;
      if (!this.fillTheBlanksData.length) {
        this.errMsg = 'Data Not Found';
      }
      // this.mainpageLoder = false;
      this.fillTheBlanksData.forEach((element, index) => {
        if (element.type === 'fill_in_the_blanks') {
          if (element.question.includes('*')) {
            element.question = this.findStarWord(
              element.question,
              index,
              element.p_id
            );
          }
        }
      });
    });
  }

  pickGetData() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('allexercises-get', data, 1).subscribe((res) => {
      this.pickTheRight = res.body.result.pick_up_right_word;
      if (res.body.result.pick_up_right_word) {
        this.pick = true;
      }
      this.pickData = sessionStorage.setItem(
        'pick_title',
        res.body.result.pick_up_right_word[0].title
      );
    });
  }

  findStarWord(word1, index, p_id) {
    const regexp = /\*(.*?)\*/gm;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length;
    for (let i = 0; i < array.length; i++) {
      var tag =
        '<input type="text" class="answer" id="answer' +
        p_id +
        index +
        '[' +
        i +
        ']' +
        '"' +
        '/>';
      this.replaceData = word1.replace(/\*(.*?)\*/, tag);
      word1 = this.replaceData;
    }

    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }

  sub(id) {
    var fillValue = [];
    this.fillTheBlanksData.forEach((element, index) => {
      if (element.type === 'fill_in_the_blanks') {
        for (var i = 0; i < this.arrayLength; i++) {
          if (element.p_id == id) {
            var currentValue = (<HTMLInputElement>(
              document.getElementById(
                'answer' + element.p_id + index + '[' + i + ']'
              )
            )).value;
            fillValue.push(currentValue);
          }
        }
      }
    });
    this.fillArr.push({ value: fillValue, p_id: id });
    sessionStorage.setItem('fill_data', JSON.stringify(this.fillArr));
    const data1 = {
      title_data: this.fillArr,
      type: 'fill_in_the_blank',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }
  findPickWord(word) {
    // return word1.replace(/\*.*\*/, '____________')
    return word.replaceAll(/\*([\w\s]+)\*/g, '____________');
  }
  // show result route
  showResult(titleid, title) {
    this.imageDataTitle = sessionStorage.setItem('title', title);
    this.router.navigate(['/teacherDashboard/affiliation-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  imageShowResult(titleid, title) {
    this.imageDataTitle = sessionStorage.setItem('image_title', title);
    this.router.navigate(['/teacherDashboard/image-drag-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  dragShowResult(titleid) {
    this.router.navigate(['/teacherDashboard/drag-word'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  questionRadioDropdown(titleid, title) {
    this.dropDataTitle = sessionStorage.setItem('question_title', title);
    this.router.navigate(['/teacherDashboard/question-dropDown-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  pickRightWord(titleid, title) {
    this.pickData = sessionStorage.setItem('pick_title', title);
    this.router.navigate(['/teacherDashboard/pick-right-word-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  fillResult(titleid) {
    // sessionStorage.setItem('fill_title')
    this.router.navigate(['/teacherDashboard/fill-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }
  showRadioResult(titleid, title) {
    this.radioData = sessionStorage.setItem('radio_title', title);
    this.router.navigate(['/teacherDashboard/questionradio-result'], {
      queryParams: { id: this.id, titleid: titleid },
    });
  }

  // get affiliation dropdown value
  getDropDownValue(data, id) {
    var isAlreadyExist = false;
    var index = -1;
    for (let i = 0; i < this.finalArr.length; i++) {
      var ids = this.finalArr[i].p_id;
      if (ids == id) {
        isAlreadyExist = true;
        index = i;
        break;
      }
    }
    if (isAlreadyExist && index != -1) {
      this.finalArr[index].value = data;
    } else {
      this.finalArr.push({
        p_id: id,
        value: data,
      });
    }
  }

  // affiliation show result api
  showAffiliationData() {
    sessionStorage.setItem('my_data', JSON.stringify(this.finalArr));
    const data1 = {
      title_data: this.finalArr,
      type: 'afiliation',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }
  getImagePId(id) {
    this.imagePid.push(id);
  }

  // image drag drop show result api
  showImageDragData() {
    var keys = this.answerArr;
    var values = this.imagePid;
    // var finalArr = []
    for (var i = 0; i < keys.length; i++) {
      this.imageArr.push({ value: keys[i], p_id: values[i] });
    }
    //  sessionStorage.setItem("image_data", JSON.stringify(this.imageArr));
    const data1 = {
      title_data: this.imageArr,
      type: 'image',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }
  // pick the right word show result api

  highlight(selectedText, selectedIndex, data) {
    selectedText = selectedText.trim();
    var question = data.question;
    if (this.selectedWordArray === undefined) {
      this.selectedWordArray = new Map();
    }
    var isWordAlreadySelected = false;
    if (this.selectedWordArray.size > 0) {
      let originalSelectedText;
      if (selectedText.includes('<mark>')) {
        originalSelectedText = selectedText
          .split('<mark>')[1]
          .split('</mark>')[0];
      } else {
        originalSelectedText = selectedText;
      }
      let alreadySelected = selectedIndex + originalSelectedText;
      this.selectedWordArray.forEach((value: object, key: string) => {
        if (key === alreadySelected) {
          isWordAlreadySelected = true;
        }
      });
      if (isWordAlreadySelected) {
        this.selectedWordArray.delete(alreadySelected);
        // this.selectedArr.splice(this.selectedArr.indexOf(originalSelectedText), 1);
        this.selectedArr.forEach(function (item, index, object) {
          if (item.id == data.p_id) {
            if (item.value == selectedIndex) {
              object.splice(index, 1);
            }
          }
        });
        let finalText = '';
        let splitString = question.split(' ');
        for (var i = 0; i < splitString.length; i++) {
          if (i == selectedIndex) {
            finalText += originalSelectedText + ' ';
          } else if (i != selectedIndex) {
            finalText += splitString[i] + ' ';
          }
        }
        question = finalText;
        data.question = question;
      } else {
        if (!this.selectedWordArray.has(selectedIndex + selectedText)) {
          this.selectedArr.push({ id: data.p_id, value: selectedIndex });
          this.selectedWordArray.set(
            selectedIndex + selectedText,
            selectedText
          );
        }

        let finalText = '';
        let splitString = question.split(' ');
        for (var i = 0; i < splitString.length; i++) {
          if (i == selectedIndex) {
            finalText += '<mark>' + selectedText + '</mark>' + ' ';
          } else if (i != selectedIndex) {
            finalText += splitString[i] + ' ';
          }
        }
        question = finalText;
        data.question = question;
      }
    } else {
      if (!this.selectedWordArray.has(selectedIndex + selectedText)) {
        this.selectedArr.push({ id: data.p_id, value: selectedIndex });
        this.selectedWordArray.set(selectedIndex + selectedText, selectedText);
      }
      let finalText = '';
      let splitString = question.split(' ');
      for (var i = 0; i < splitString.length; i++) {
        if (i == selectedIndex) {
          finalText += '<mark>' + selectedText + '</mark>' + ' ';
        } else if (i != selectedIndex) {
          finalText += splitString[i] + ' ';
        }
      }
      question = finalText;
      data.question = question;
    }
  }
  // affiliation show result api
  showPickData(id) {
    var keys = this.selectedArr;
    var answers = [];
    keys.forEach((element) => {
      if (element.id == id) {
        answers.push(element.value);
      }
    });

    // var finalArr = []
    // for(var i = 0; i< keys.length; i++){
    this.pickArr.push({ value: answers, p_id: id });
    // }
    sessionStorage.setItem('pick_data', JSON.stringify(this.pickArr));
    const data1 = {
      title_data: this.pickArr,
      type: 'pick_up_word',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }

  studentDetail() {
    (this.courseId = sessionStorage.getItem('course_id')),
      (this.teacherName = sessionStorage.getItem('teacher_name')),
      (this.ratings = sessionStorage.getItem('student_rating'));
  }
  // get question dropdown value
  getImageValue(data, id) {
    var isAlreadyExist = false;
    var index = -1;
    for (let i = 0; i < this.imageDragArr.length; i++) {
      var ids = this.imageDragArr[i].p_id;
      if (ids == id) {
        isAlreadyExist = true;
        index = i;
        break;
      }
    }
    if (isAlreadyExist && index != -1) {
      this.imageDragArr[index].value = data;
    } else {
      this.imageDragArr.push({
        p_id: id,
        value: data,
      });
    }
  }

  // image drag show result api
  showImageData() {
    sessionStorage.setItem('imageDragData', JSON.stringify(this.imageDragArr));
    const data1 = {
      title_data: this.imageDragArr,
      type: 'image',
    };
    this.service.post('show_result', data1, 1).subscribe((res) => {});
  }
  onChange(event, data) {
    // this.affisId.push(data)
    var index = 'ng_' + data.p_id;
    const value = event;
    for (let i = 0; i < this.selected1.length; i++) {
      let selectedValueObject = this.selected1[i];
      let selectedKey = selectedValueObject.key;
      if (selectedKey === index) {
        this.selected1.splice(i, 1);
        break;
      }
    }
    if (value != '') {
      this.selected1.push({ key: index, value: value });
    }
    this.selected1 = [...this.selected1];
  }
  //sidebar accordion
  toggleAccordian(event, index, id) {
    const element = event.target;
    element.classList.toggle('active');
    sessionStorage.setItem('course_id', id);
    setTimeout(() => {
      this.router.navigate(['/teacherDashboard/editCourse']);
    }, 100);
    if (this.sidebarData[index].isActive) {
      this.sidebarData[index].isActive = false;
    } else {
      this.sidebarData[index].isActive = true;
    }
  }
  toggleSubTitle(event, index, data) {
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
  studentSideBar() {
    debugger;
    console.log('sidebar -student view', this.frontServices.vm);
    if (
      this.frontServices == null ||
      this.frontServices.vm == null ||
      this.frontServices.vm.sidebarData == null ||
      this.frontServices.vm.sidebarData.length == 0
    ) {
      const data = {
        user_id: sessionStorage.getItem('uid'),
      };
      this.service.post('student_sidebar', data, 1).subscribe((res) => {
        this.sidebarData2 = res.body.result;
        this.frontServices.vm.sidebarData = this.sidebarData2;
      });
    } else {
      this.sidebarData2 = this.frontServices.vm.sidebarData;
    }
  }
  toggleAccordian2(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name);
    const element = event.target;
    element.classList.toggle('active');
    if (this.sidebarData2[index].isActive) {
      this.sidebarData2[index].isActive = false;
    } else {
      this.sidebarData2.forEach((element) => {
        element.isActive = false;
      });
      this.sidebarData2[index].isActive = true;
    }
  }
  toggleSubTitle2(event, index, data) {
    this.radioArr = [];
    this.imageDragArr = [];
    this.finalArr = [];
    this.questionArr = [];
    for (let i = 0; i < this.sidebarData2.length; i++) {
      const title = this.sidebarData2[i].title;
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
    sessionStorage.setItem('subId', child);
    this.courseid = sessionStorage.setItem('course_id', id);
    this.name = sessionStorage.setItem('teacher_name', name);
    this.studentRating = sessionStorage.setItem('student_rating', rating);
    this.courseNameData = sessionStorage.getItem('course_name');
    (this.courseId = sessionStorage.getItem('course_id')),
      (this.teacherName = sessionStorage.getItem('teacher_name')),
      (this.ratings = sessionStorage.getItem('student_rating'));
    this.router.navigate(['/teacherDashboard/student-view'], {
      queryParams: { id: sessionStorage.getItem('subId') },
    });
    this.affiliationList();
  }
  // go to back
  gotoBack() {
    this._location.back();
  }

  // open pdf in new tab
  pdfData(e) {
    window.open(e, '_blank');
  }

  // api's for perentage
  getPickData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getFillData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getAffilitionData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getDragDropData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getQuesDropdownData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getRadioData(id) {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      subtitle_id: sessionStorage.getItem('subId'),
      p_id: id,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('user_results', data, 1).subscribe((res) => {});
  }
  getImage(data) {
    this.image = data;
  }
}
