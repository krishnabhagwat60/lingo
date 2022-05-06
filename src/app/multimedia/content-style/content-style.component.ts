import {
  Component,
  ElementRef,
  Inject,
  Injector,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/components/service.service';
import * as $ from 'jquery';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
declare var $: any;
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'ckeditor5/build/ckeditor';
import { Location } from '@angular/common';
import { SocialAuthService } from 'angularx-social-login';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { FrontService } from 'src/app/services/front.service';

@Component({
  selector: 'app-content-style',
  templateUrl: './content-style.component.html',
  styleUrls: ['./content-style.component.css'],
})
export class ContentStyleComponent implements OnInit {
  public Editor = Editor;
  editorConfig = {
    toolbar: {
      items: [
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        // 'insertTable',
        // 'mediaEmbed',
        'HtmlEmbed',
        'undo',
        'redo',
      ],
      // table: {
      //   contentToolbar: [
      //     'tableColumn',
      //     'tableRow',
      //     'mergeTableCells'
      //   ]
      // },
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
    forcePasteAsPlainText: true,
  };
  editorConfig1 = {
    toolbar: {
      items: [
        'link',
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
    removePlugins: ['FontColor', 'FontBackgroundColor'],
    language: 'en',
    forcePasteAsPlainText: true,
  };
  editorConfig3 = {
    toolbar: {
      items: [
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        '|',
        'blockQuote',
        'fontBackgroundColor',
        'fontColor',
        'undo',
        'redo',
      ],
    },
    language: 'en',
    forcePasteAsPlainText: true,
  };
  editorConfig2 = {
    toolbar: {
      items: ['mediaEmbed'],
    },
    mediaEmbed: {
      previewsInData: true,
      removeProviders: [
        'instagram',
        'twitter',
        'googleMaps',
        'flickr',
        'facebook',
      ],
    },
    language: 'en',
    forcePasteAsPlainText: true,
  };
  selected1 = Array<any>();
  @ViewChild('deleteInsert') deleteInsert;
  @ViewChild('deletePicture') deletePicture;
  @ViewChild('deleteAccordion') deleteAccordion;
  @ViewChild('closeBtn') closeBtn;
  @ViewChild('closeBtnText') closeBtnText;
  @ViewChild('closePickBtn') closePickBtn;
  @ViewChild('closeFillBtn') closeFillBtn;
  @ViewChild('closeDropdownBtn') closeDropdownBtn;
  @ViewChild('closeDragBtn') closeDragBtn;
  @ViewChild('closeRadioBtn') closeRadioBtn;
  @ViewChild('closeRadioBtn1') closeRadioBtn1;
  @ViewChild('closeInsert') closeInsert;
  @ViewChild('closePicture') closePicture;
  @ViewChild('closeAudio') closeAudio;
  @ViewChild('closeYoutube') closeYoutube;
  @ViewChild('closeOtherLink') closeOtherLink;
  @ViewChild('closeAccordion') closeAccordion;
  @ViewChild('closePdf') closePdf;
  @ViewChild('deleteAffi') deleteAffi;
  @ViewChild('deletePickWord') deletePickWord;
  @ViewChild('deleteFillWord') deleteFillWord;
  @ViewChild('deleteQuestionDown') deleteQuestionDown;
  @ViewChild('alldeleteQuestionRadio') alldeleteQuestionRadio;
  @ViewChild('allDeleteTextDrag') allDeleteTextDrag;
  @ViewChild('deleteImageDrag') deleteImageDrag;
  @ViewChild('deleteAudio') deleteAudio;
  @ViewChild('deleteYoutube') deleteYoutube;
  @ViewChild('deleteOtherLink') deleteOtherLink;
  @ViewChild('deletePdf') deletePdf;
  @ViewChild('inputFile') myInputVariable: ElementRef;
  @ViewChild('audioFile') myInputVariables: ElementRef;
  @ViewChild('pictureFile') myInputVariabled: ElementRef;

  mainpageLoder: boolean = false;
  safeUrl: SafeResourceUrl;
  sidebarData: any;
  empForm: FormGroup;
  serviceFormaffiliation = new FormArray([]);
  textDragFormData = new FormArray([]);
  serviceForm = new FormArray([]);
  questionRadioFormData = new FormArray([]);
  affiliationModalShow: boolean = false;
  textDragDrop: boolean = false;
  subCatSelected = false;
  // imageDragFormData = new FormArray([])
  imageSrc: string = '';
  imageShow: boolean = false;
  filename: any;
  base64textString: String = '';
  picture: boolean = false;
  otherlink: boolean = false;
  youtubeSection: boolean = false;
  safeSrc: SafeResourceUrl;
  youtubeSrc: SafeResourceUrl;
  sendyoutubeSrc: any;
  sendSrc: any;
  audioName: any;
  audSrc: any;
  pdfName: any;
  fileSrc: any;
  accordionData: boolean = false;
  pdf: boolean;
  audioSection: boolean = false;
  showMsg: string;
  affiliationData: any;
  pickTheRight: any;
  fillTheBlanksData: any;
  clicked = false;
  click = false;
  AccordClick = false;
  OtherClick = false;
  PdfClick = false;
  PictureClick = false;
  YoutubeClick = false;
  AffiliationClick = false;
  ImageClick = false;
  RadioClick = false;
  dropdownClick = false;
  fillBlanksClick = false;
  pickWordClick = false;
  textDrag: any;
  questionRadioButton: any;
  imageDrag: any;
  multimediaAccordion: any;
  questionDropDown: any;
  subTitle: any;
  courseData: any;
  courseSubdata: any;
  subId: any;
  topButton: boolean = false;
  affId: any;
  affiliation: boolean = false;
  fillTheBlank: boolean = false;
  questionRadio: boolean = false;
  imagesDrag: boolean = false;
  textingDragDrop: boolean = false;
  pickUpRight: boolean = false;
  multimediaShow: boolean = false;
  questionDrop: boolean = false;
  insert: boolean;
  words: any;
  multimedia: any;
  multimediaText: any;
  multimediaOtherLink: any;
  multimediaPicture: any;
  multimediaAudio: any;
  multimediaPdf: any;
  subsTitle: any;
  accordion: any;
  accordionDataShow: boolean = false;
  pictureData: boolean = false;
  mutimediaData: boolean = false;
  otherLinkData: boolean = false;
  pdfData: boolean = false;
  youtubeData: boolean = false;
  exerciseModal: boolean = false;
  user: string;
  otherSrc: any;
  createButton: boolean = false;
  createTextButton: boolean = false;
  createPickRightButton: boolean = false;
  createFillButton: boolean = false;
  createEditDragButton: boolean = false;
  affiliationId: any;
  getPid: any;
  getPickPid: any;
  getImagePid: any;
  getTextDragPid: any;
  fillId: any;
  createQuestionButton: boolean = false;
  getQuestionDragPid: any;
  createQuestionRadioButton: boolean = false;
  radioQuestion: any;
  radioAnswer: any;
  p_idQuestion: any;
  getQuestionRadioPid: any;
  safeTSrc: SafeResourceUrl;
  newPage: boolean = false;
  courseNameData: string;
  question_titleData: any;
  allArrPid = [];
  allFillPid = [];
  allPickPid = [];
  allTextPid = [];
  allDropdownPid = [];
  allImageDragPid = [];
  allIquestionDropdownPid = [];
  newwArr: any;
  arr: any;
  affiData: any;
  affiId: any;
  affiTitleData: any;
  questTitleId: any;
  titleDataName: any;
  updateId: any;
  textDragId: any;
  editId: any;
  titleDataDrag: any;
  textEdit: any;
  affiDta: any;
  deleteImageId: any;
  imageTitleId: any;
  imageDragData: any;
  imageDragDataTitle: any;
  updateNewId: any;
  questInsertId: any;
  questPictureId: any;
  deleteFillId: any;
  questPdf: any;
  questOtherLinkId: any;
  questYoutube: any;
  questAudioId: any;
  questAccordion: any;
  insertEditId: any;
  createInsertButton: boolean = false;
  affiAntonyData: any;
  radioId: any;
  radioEdit: any;
  titleRadio: any;
  updateRadioId: any;
  deleteRadioId: any;
  getWrongQuestionRadioPid: any;
  data: any;
  cate: boolean = false;
  fillTheData: NodeListOf<Element>;
  replaceData: any;
  arrayLength: number;
  imageForm: FormGroup;
  audioSrc: any;
  urls: any[];
  audioShow: boolean = false;
  fillData: any;
  questionDropData: any;
  linkName: any;
  selected: boolean = false;
  submitted: boolean = false;
  submits: boolean = false;
  profileShow: boolean = false;
  dashboardShow: boolean = false;
  ismenusub: boolean = false;
  ismenu: boolean = false;
  ismenuShow: boolean = false;
  QuesSubmitted: boolean = false;
  imageFiles = [];
  audioFiles = [];
  subIds: string;
  errmsg: string;
  progress: number;
  submitss: boolean = false;
  accorSubmit: boolean = false;
  fillSubmit: boolean = false;
  titles: boolean = true;
  pickSubmit: boolean = false;
  coursesName: void;
  subtitleName: void;
  titlesName: void;
  courseNameDatas: string;
  accordionId: any;
  createAccordionButton: boolean = false;
  editAccordionQuestion: any;
  titleAccorName: any;
  subtitles: void;
  titleName: void;
  titless: string;
  subtitless: string;
  subtitle: void;
  title: void;
  loding: boolean = false;
  deleteAffiIds: any;
  adioData: any;
  imageData: any;
  imageButton: boolean = false;
  youtubesData: any;
  youtubeButton: boolean = false;
  youtubeId: any;
  audioId: any;
  audioButton: boolean = false;
  pictureId: any;
  pdfEditData: any;
  pdfButton: boolean = false;
  pdfId: any;
  otherlinkId: any;
  otherEditData: any;
  otherLinkButton: boolean = false;
  imageErrorMsg: string;
  imagebox: boolean = true;
  audiobox: boolean = false;
  audioErrorMsg: string;
  pictureErrorMsg: string;
  pdfErr: string;
  insertErr: string;
  otherErr: string;
  dataUrl: any;
  radioData: any;
  backBtn = false;
  backBtns: boolean;
  audioData: any;
  updateNewDataImage: any;

  private _frontService: FrontService;
  public get frontServices(): FrontService {
    if (this._frontService) {
      return this._frontService;
    }
    return (this._frontService = this.injector.get(FrontService));
  }
  image: any;
  images: string;
  constructor(
    private service: ServiceService,
    public formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    private injector: Injector,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private _location: Location,
    private authService: SocialAuthService
  ) {
    this.empForm = this.fb.group({
      employees: this.fb.array([]),
      question_title: new FormControl('', Validators.required),
    });
    this.imageForm = this.fb.group({
      addImageData: this.fb.array([]),
      question_title: new FormControl('', Validators.required),
    });

    this.courseNameData = sessionStorage.getItem('course_name');
    if (sessionStorage.getItem('back') == '0') {
      this.backBtns = false;
    } else if (sessionStorage.getItem('back') == '1') {
      this.backBtns = true;
    }
    this.images = localStorage.getItem('image');
  }

  ngOnInit(): void {
    sessionStorage.removeItem('studentView');
    // if (sessionStorage.getItem('subId')) {
    //   this.subCatSelected = true;
    // }
    this.route.queryParamMap.subscribe((queryParams) => {
      this.subIds = queryParams.get('id');
    });
    this.InitialForms();
    this.courseName();
    this.sidebar();
    this.courseDetail();
    this.username();
    this.AccordionInitialForms();
    this.setTitleName();
    this.affiliationList();
    this.updateNewDataImage = localStorage.getItem('image');
    if(this.updateNewDataImage == null)
    {
      this.updateNewDataImage = false;
    }

    // this.getImageBox();
    // this.getAudioBox();
    if (sessionStorage.getItem('course_id')) {
      this.backBtn = true;
    }
  }

  getHtml(url) {
    var iframeStart = '<iframe' + url.split('<iframe')[1];
    var finalIframe = iframeStart.split('</iframe>')[0] + '</iframe>';
    // finalIframe = finalIframe.replace('height: 100%', 'height : 20');
    finalIframe = finalIframe.replace('position: absolute', '');
    return this._sanitizer.bypassSecurityTrustHtml(
      finalIframe.replace(/\\"/g, '"')
    );
  }

  getHtmlText(url) {
    return this._sanitizer.bypassSecurityTrustHtml(url);
  }
  // username
  username() {
    this.user = sessionStorage.getItem('username');
  }

  // sidebar api
  sidebar() {
    const data = {
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('teacher_sidebar', data, 1).subscribe((res) => {
      this.sidebarData = res.body.result;
      //  console.log(this.sidebarData);
    });
  }

  // view page
  view(id) {
    this.router.navigate(['/teacherDashboard/student-view'], {
      queryParams: { viewpage: id },
    });
  }

  logout() {
    sessionStorage.clear();

    this.frontServices.vm.sidebarData = null;
    this.router.navigate(['/login']);
    this.signOut();
  }
  signOut(): void {
    this.authService.signOut();
  }

  // delete image drag
  deleteImageDragTitles(empIndex) {
    var arr = this.imageForm.get('addImageData') as FormArray;
    var item = arr.at(empIndex);
    if (item.value.p_id == '') {
      this.deleteaddImageDrag(empIndex);
    } else {
      this.deleteImageDragDrop(empIndex);
    }
  }
  deleteImageDragSubTitles(formIndex, index) {
    var arr = this.imageForm.get('addImageData') as FormArray;
    var item = arr.at(formIndex);
    var subarray = item.value.worngAnswer;
    var id = subarray[index].wrong_ids;
    if (id == '') {
      this.removeDragImageQuestion(formIndex, index);
    } else {
      this.deleteImageWRong(formIndex, index);
    }
  }
  deleteRadioDatas(empIndex) {
    // console.log(this.questionRadioFormData)
    var arr = this.questionRadioFormData as FormArray;
    var item = arr.at(empIndex);
    if (
      item.value.p_id == '' ||
      item.value.p_id == null ||
      item.value.p_id == undefined
    ) {
      this.deleteQuestion(empIndex);
    } else {
      this.deleteQuestionRadio(empIndex);
    }
  }

  deleteAccordionDatas(empIndex) {
    // console.log(this.questionRadioFormData)
    var arr = this.serviceForm as FormArray;
    var item = arr.at(empIndex);
    if (
      item.value.p_id == '' ||
      item.value.p_id == null ||
      item.value.p_id == undefined
    ) {
      this.deleteServiceField(empIndex);
    } else {
      this.deleteAccordionFieldData(empIndex);
    }
  }

  deleteAffiliations(empIndex) {
    var arr = this.serviceFormaffiliation as FormArray;
    var item = arr.at(empIndex);
    if (
      item.value.p_id == '' ||
      item.value.p_id == null ||
      item.value.p_id == undefined
    ) {
      this.deleteAffiliationFieldData(empIndex);
    } else {
      this.deleteServiceFieldData(empIndex);
    }
  }

  deleteServiceFieldData(formIndex) {
    this.mainpageLoder = true;
    const pId = this.affiDta[0].data[formIndex].p_id;
    this.getPid = pId;
    const data = {
      p_id: this.getPid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeBtn.nativeElement.click();
        }, 1000);
        this.affiliationList();
      }
    });
  }

  // delete question radio button
  deleteQuestionRadio(formIndex) {
    this.mainpageLoder = true;
    const pId = this.radioEdit.data[formIndex].p_id;
    this.getQuestionRadioPid = pId;
    const data = {
      p_id: this.getQuestionRadioPid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeRadioBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  // get exercise
  get() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('exercises-get', data, 1).subscribe((res) => {
      this.affiData = res.body.result;
      if (this.affiData) {
        this.affiliation = true;
      }
    });
  }

  deleteRadioTitles(empIndex) {
    var arr = this.questionRadioForm.get('questionRadioFormData') as FormArray;
    var item = arr.at(empIndex);
    if (
      item.value.p_id == '' ||
      item.value.p_id == null ||
      item.value.p_id == undefined
    ) {
      this.deleteQuestion(empIndex);
    } else {
      this.deleteQuestionRadio(empIndex);
    }
  }

  deleteQuestionTitles(empIndex) {
    var arr = this.empForm.get('employees') as FormArray;
    var item = arr.at(empIndex);
    if (item.value.p_id == '') {
      this.removeEmployee(empIndex);
    } else {
      this.deleteQuestionDropDown(empIndex);
    }
  }
  deleteQuestionSubTitles(formIndex, index) {
    var arr = this.empForm.get('employees') as FormArray;
    var item = arr.at(formIndex);
    var subarray = item.value.worng_answer;
    var id = subarray[index].wrong_id;
    if (id == '') {
      this.removeEmployeeSkill(formIndex, index);
    } else {
      this.deleteWrongQuestionRadio(formIndex, index);
    }
  }
  // delete question with dropdown
  deleteQuestionDropDown(formIndex) {
    const pId = this.questionDropData.data[formIndex].p_id;
    this.getQuestionDragPid = pId;
    this.textDrag;
    const data = {
      p_id: this.getQuestionDragPid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        // this.mainpageLoder = false;
        setTimeout(() => {
          this.closeDropdownBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }
  // get multimedia data api

  affiliationList() {
    debugger;
    this.titless = sessionStorage.getItem('title');
    this.subtitless = sessionStorage.getItem('subtitle');
    this.courseNameData = sessionStorage.getItem('course_name');
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('allexercises-get', data, 1).subscribe((res) => {
      debugger;
      this.fillTheBlanksData = res.body.result;
      if (res.body.result) {
        this.fillTheBlank = true;
      }
      if (this.fillBlanksClick != undefined && this.fillBlanksClick != null) {
        this.fillTheBlanksData.forEach((element, index) => {
          if (element.type === 'fill_in_the_blanks') {
            if (element.question.includes('*')) {
              element.question = this.findStarWord(element.question, index);
            }
          }
        });
      }
    });
  }

  affiliationLists() {
    const data = {
      subtitle_id: this.subIds,
    };
    this.service.post('allexercises-get', data, 1).subscribe((res) => {
      this.fillTheBlanksData = res.body.result;
      if (!this.fillTheBlanksData.length) {
        this.errmsg = 'Data Not Found';
      }
      if (res.body.result) {
        this.fillTheBlank = true;
      }
      if (this.fillBlanksClick != undefined && this.fillBlanksClick != null) {
        this.fillTheBlanksData.forEach((element, index) => {
          if (element.type === 'fill_in_the_blanks') {
            if (element.question.includes('*')) {
              element.question = this.findStarWord(element.question, index);
            }
          }
        });
      }
    });
  }

  findStarWord(word1, index) {
    const regexp = /\*(.*?)\*/gm;
    const array = [...word1.matchAll(regexp)];
    this.arrayLength = array.length;
    for (let i = 0; i < array.length; i++) {
      var tag = '<input type="text" class="answer" id="answer' + i + '"' + '/>';
      this.replaceData = word1.replace(/\*(.*?)\*/gm, tag);
      word1 = this.replaceData;
    }

    return this._sanitizer.bypassSecurityTrustHtml(this.replaceData);
  }
  sub() {
    for (var i = 0; i < this.arrayLength; i++) {
      var currentValue = (<HTMLInputElement>(
        document.getElementById('answer' + i)
      )).value;
    }
  }
  // get multimedia data api
  pickWordList() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('allexercises-get', data, 1).subscribe((res) => {
      this.pickTheRight = res.body.result.pick_up_right_word;
      if (res.body.result.pick_up_right_word) {
        this.pickUpRight = true;
      }
      this.pickTheRight.forEach((title, index) => {
        if (title.question.includes('*')) {
          title.question = this.findPickWord(title.question);
        }
      });
    });
  }

  findPickWord(word) {
    // return word1.replace(/\*.*\*/, '____________')
    return word.replaceAll(/\*([\w\s]+)\*/g, '____________');
  }
  //  edit insert text
  editInsert(id) {
    this.clicked = false;
    this.insertEditId = id;
    const data = {
      p_id: this.insertEditId,
      // "subtitle_id": sessionStorage.getItem('subId')
    };
    this.service.post('multimedia-get', data, 1).subscribe((res) => {
      this.createInsertButton = true;
      this.multimediaText = res.body.result;
      this.insertTestForm.patchValue({
        questionInsert: this.multimediaText.title,
        insertText: this.multimediaText.text,
      });
    });
  }
  // update insert text
  updateInsert() {
    const data = {
      p_id: this.insertEditId,
      text: this.insertTestForm.value.insertText,
      title: this.insertTestForm.value.questionInsert,
    };
    this.service.post('update-text', data, 1).subscribe((res) => {
      setTimeout(() => {
        this.closeInsert.nativeElement.click();
        this.insertTestForm.reset();
      }, 1000);
      this.affiliationList();
    });
  }

  // get multimediaApi
  getMultimedia() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('multimedia-get', data, 1).subscribe((res) => {
      this.multimediaText = res.body.result.multimedia.text;
      if (res.body.result.multimedia.text) {
        this.insert = true;
      }
      this.multimediaPicture = res.body.result.multimedia.picture;
      if (res.body.result.multimedia.picture) {
        this.pictureData = true;
      }

      this.multimedia = res.body.result.multimedia;
      if (res.body.result.multimedia) {
        this.multimediaShow = true;
      }
      this.multimediaAccordion = res.body.result.multimedia.youtube_link;
      if (res.body.result.multimedia.youtube_link) {
        this.youtubeData = true;
      }

      this.multimediaAudio = res.body.result.multimedia.audio;
      if (res.body.result.multimedia.audio) {
        this.mutimediaData = true;
      }

      this.multimediaOtherLink = res.body.result.multimedia.other_link;
      if (res.body.result.multimedia.other_link) {
        this.otherLinkData = true;
      }
      this.multimediaPdf = res.body.result.multimedia.pdf;
      if (res.body.result.multimedia.pdf) {
        this.pdfData = true;
      }
    });
  }
  // subtitle api
  getSubTitle(parent) {
    // this.getTitles(parent);
    sessionStorage.setItem('selectedsubTitle', parent);
    this.topButton = true;
    const data = {
      title_id: parent,
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('submenu-listing', data, 1).subscribe((res) => {
      this.subTitle = res.body.result;

      if (sessionStorage.getItem('subId')) {
        this.titleForm.controls.subTitle.setValue(
          sessionStorage.getItem('subId')
        );
      }
      // sessionStorage.setItem('title',data)
      // this.titless = sessionStorage.getItem('title')
    });
  }
  courseDetail() {
    const data = {
      course_id: sessionStorage.getItem('course_id'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('course-details', data, 1).subscribe((res) => {
      this.courseSubdata = res.body.result.subdata;
      // console.log(this.courseData);
    });
  }
  getChildData(child) {
    this.titles = false;
    sessionStorage.setItem('subId', child);
    this.subCatSelected = true;
    this.affiliationList();
  }
  ngOnDestroy(): void {
    if (sessionStorage.getItem('studentView') == null) {
      sessionStorage.removeItem('selectedsubTitle');
      sessionStorage.removeItem('subId');
    }
    //sessionStorage.clear();
  }
  studentView() {
    sessionStorage.setItem('studentView', 'true');
    this.router.navigate(['/teacherDashboard/student-view'], {
      queryParams: { id: sessionStorage.getItem('subId') },
    });
  }

  // youtube link upload
  youtubeForm = new FormGroup({
    youtubeText: new FormControl(''),
    questionYoutube: new FormControl(''),
  });
  youtubeSubmit() {
    this.otherLinkForm.value.mediaEmbedding = '';
    this.youtubeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.youtubeForm.value.youtubeText
    );
    this.sendyoutubeSrc = this.youtubeForm.value.youtubeText;
    this.youtubeSection = true;
    this.uploadData();
    this.youtubeForm.reset();
  }
  otherLinkForm = new FormGroup({
    otherLinkText: new FormControl(''),
    questionOtherLink: new FormControl(''),
    mediaEmbedding: new FormControl(''),
  });
  // upload other link
  otherLinkSubmit() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.otherLinkForm.value.otherLinkText
    );
    this.sendSrc = this.otherLinkForm.value.otherLinkText;
    this.otherlink = true;
    this.otherlinkId = 0;
    this.showMsg = 'Uploaded Successfully';
    this.uploadData();
  }

  // for audio upload function
  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  audFileSelected(event: any) {
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    var pattern = /audio-*/;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.audioErrorMsg = '';
    this.audioName = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt: any) => {
        this.audSrc = evt.target.result;
        this.showMsg = 'Uploaded Successfully';
      };
    }
  }
  otherLinkSelected(event: any) {
    this.linkName = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt: any) => {
        this.otherSrc = evt.target.result;
        this.showMsg = 'Uploaded Successfully';
      };
    }
  }
  pdfFileSelected(event: any) {
    var file = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];
    var pattern = /pdf-*/;
    // var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.pdfErr = '';
    this.pdfName = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (evt: any) => {
        this.fileSrc = evt.target.result;
      };
    }
  }
  // audio upload
  submit() {
    this.otherLinkForm.value.mediaEmbedding = '';
    $('#audio-upload').modal('hide');
    this.audioSection = true;
    this.showMsg = 'Uploaded Successfully';
    this.uploadData();
  }

  // pdf upload
  submitPdf() {
    this.otherLinkForm.value.mediaEmbedding = '';
    this.showMsg = 'Uploaded Successfully';
    this.pdf = true;
    this.uploadData();
  }
  // multimedia content
  // picture upload
  pictureForm = new FormGroup({
    questionPicture: new FormControl(),
    pictureName: new FormControl(),
  });
  audioForm = new FormGroup({
    questionAudio: new FormControl(),
    audioName: new FormControl(),
  });
  pdfForm = new FormGroup({
    questionPdf: new FormControl(),
    pdfName: new FormControl(),
  });
  handleFileSelect(evt) {
    var file = evt.dataTransfer
      ? evt.dataTransfer.files[0]
      : evt.target.files[0];
    var pattern = /image-*/;
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.PictureClick = false;
    this.pictureErrorMsg = '';
    var files = evt.target.files;
    var file = files[0];
    this.filename = file.name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }
  // picture upload
  submitPicture() {
    this.otherLinkForm.value.mediaEmbedding = '';
    $('#picture').modal('hide');
    this.picture = true;
    this.uploadData();
    this.pictureForm.reset();
  }

  // accordion
  get frms() {
    return this.accordionForm.controls;
  }
  accordionForm = new FormGroup({
    accordion_title: new FormControl('', [Validators.maxLength(254)]),
  });
  accordionSubmit() {
    const employees = this.serviceForm.getRawValue();
  }
  insertTestForm = new FormGroup({
    insertText: new FormControl('', Validators.required),
    questionInsert: new FormControl(''),
  });
  AccordionInitialForms() {
    this.addNewService();
    this.serviceForm.controls.length - 1;
  }
  addNewService() {
    const searchForm = new FormGroup({
      title: new FormControl(''),
      text: new FormControl('', Validators.required),
      p_id: new FormControl(),
    });
    this.serviceForm.push(searchForm);
  }
  deleteServiceField(formIndex) {
    this.serviceForm.removeAt(formIndex);
  }

  // create accordion  api
  createAccordion() {
    this.accorSubmit = true;
    if (this.serviceForm.invalid) {
      this.AccordClick = false;
      return;
    } else {
      this.loding = true;
      const employees = this.serviceForm.getRawValue();
      const data = {
        subtitle_id: sessionStorage.getItem('subId'),
        accordion: employees,
        question_title: this.accordionForm.value.accordion_title,
      };
      this.service.post('create-accordion', data, 1).subscribe((res) => {
        this.loding = false;
        if (res.body.message === 'accordion success') {
          setTimeout(() => {
            this.closeAccordion.nativeElement.click();
            this.affiliationList();
          }, 1000);
        }
      });
    }
  }
  // get accordion
  getAccordion() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('accordion-get', data, 1).subscribe((res) => {
      this.accordion = res.body.result;
      if (res.body.result.multimedia[0].accordion) {
        this.accordionDataShow = true;
      }
    });
  }
  // api for multimedia upload
  uploadData() {
    if (this.otherLinkForm.value.mediaEmbedding) {
      var url = btoa(this.otherLinkForm.value.mediaEmbedding);
    }
    this.mainpageLoder = true;
    const employees = this.serviceForm.getRawValue();
    const data = {
      text: this.insertTestForm.value.insertText,
      image_name: this.filename,
      text_title: this.insertTestForm.value.questionInsert,
      subtitle_id: sessionStorage.getItem('subId'),
      picture: this.base64textString,
      picture_title: this.pictureForm.value.questionPicture,
      audio: this.audSrc,
      audio_name: this.audioName,
      audio_title: this.audioForm.value.questionAudio,
      youtube_link: this.sendyoutubeSrc,
      youtube_title: this.youtubeForm.value.questionYoutube,
      other_link: this.sendSrc,
      other_link_title: this.otherLinkForm.value.questionOtherLink,
      other_link_url: url,
      pdf: this.fileSrc,
      pdf_name: this.pdfName,
      pdf_title: this.pdfForm.value.questionPdf,
    };
    this.service.post('create-course-multimedia', data, 1).subscribe((res) => {
      if (res.body.message === 'text success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeInsert.nativeElement.click();
          this.insertTestForm.reset();
        }, 1000);
        this.affiliationList();
      } else if (res.body.message == null) {
        this.insertErr = 'please insert text';
      }
      if (res.body.message === 'accordion success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeAccordion.nativeElement.click();
          this.serviceForm.reset();
        }, 1000);
        this.affiliationList();
      }
      if (res.body.message === 'other_link success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeOtherLink.nativeElement.click();
          this.otherSrc = '';
          this.otherLinkForm.reset();
        }, 1000);
        this.affiliationList();
      } else if (res.body.message == null) {
        this.otherErr = 'Please upload link';
      }
      if (res.body.message === 'youtube_link success') {
        this.youtubeForm.reset();
        this.fileSrc = '';
        this.mainpageLoder = false;
        this.sendyoutubeSrc = '';
        setTimeout(() => {
          this.closeYoutube.nativeElement.click();
          this.youtubeForm.reset();
        }, 1000);
        this.affiliationList();
      }
      if (res.body.message === 'audio success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeAudio.nativeElement.click();
          (this.audSrc = ''), this.audioForm.reset();
        }, 1000);
        this.affiliationList();
      } else if (res.body.message == null) {
        this.audioErrorMsg = 'Please upload audio';
        this.mainpageLoder = false;
        this.click = false;
      }
      if (res.body.message === 'picture success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closePicture.nativeElement.click();
          (this.base64textString = ''), (this.filename = '');
          this.pictureForm.reset();
        }, 1000);
        this.affiliationList();
      } else if (res.body.message == null) {
        this.pictureErrorMsg = 'Please upload picture';
        this.mainpageLoder = false;
      }

      if (res.body.message === 'pdf success') {
        this.fileSrc = '';
        this.sendyoutubeSrc = '';
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closePdf.nativeElement.click();
          this.fileSrc = '';
          this.pdfForm.reset();
        }, 1000);
        this.affiliationList();
      } else if (res.body.message == null) {
        this.pdfErr = 'Please upload pdf';
        this.mainpageLoder = false;
        this.PdfClick = false;
      }
    });
  }
  courseName() {
    this.courseNameData = sessionStorage.getItem('course_name');
  }
  deleteAffiId(id) {
    this.deleteAffiIds = id;
  }
  // bulk delete of affiliation
  deleteAffiliation() {
    const data = {
      title_id: this.deleteAffiIds,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteAffi.nativeElement.click();
        this.affiliationList();
        this.affiliation = false;
      }
    });
  }
  // bulk delete of pick the right word
  deletePickId(id) {
    this.allPickPid = id;
  }
  deletePickTheRight() {
    const data = {
      title_id: this.allPickPid,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deletePickWord.nativeElement.click();
        this.affiliationList();
        this.pickUpRight = false;
      }
    });
  }
  // bulk delete of fill in the blanks
  deleteFillData(id) {
    this.deleteFillId = id;
  }
  deleteFillTheBlank() {
    const data = {
      title_id: this.deleteFillId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteFillWord.nativeElement.click();
        this.affiliationList();
        this.fillTheBlank = false;
      }
    });
  }
  // bulk delete of text drag and drop
  deleteTextDragData(id) {
    this.textDragId = id;
  }
  // bulk delete of question with radio
  deleteRadioData(id) {
    this.deleteRadioId = id;
  }
  deleteQuestionBlank() {
    const data = {
      title_id: this.deleteRadioId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.alldeleteQuestionRadio.nativeElement.click();
        this.affiliationList();
        this.questionRadio = false;
      }
    });
  }
  // bulk delete of image drag and drop
  deleteImageDragId(id) {
    this.deleteImageId = id;
  }
  deleteImageDragBlank() {
    const data = {
      title_id: this.deleteImageId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteImageDrag.nativeElement.click();
        this.affiliationList();
        this.imagesDrag = false;
      }
    });
  }
  // bulk delete of iquestion dropdown
  deleteQues(id) {
    this.questTitleId = id;
  }
  deleteQuestionDropDownBlank() {
    const data = {
      title_id: this.questTitleId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteQuestionDown.nativeElement.click();
        this.affiliationList();
        this.questionDrop = false;
      }
    });
  }
  // bulk delete of insert text
  deleteInsertData(id) {
    this.questInsertId = id;
  }
  deleteInsertText() {
    const data = {
      title_id: this.questInsertId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteInsert.nativeElement.click();
        this.affiliationList();
        this.insert = false;
      }
    });
  }
  // bulk delete of picture
  deletePictureData(id) {
    this.questPictureId = id;
  }
  bulkDeletePictureData() {
    const data = {
      title_id: this.questPictureId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deletePicture.nativeElement.click();
        this.affiliationList();
        this.picture = false;
      }
    });
  }
  // bulk delete of accordion
  deleteAccordionData(id) {
    this.questAccordion = id;
  }
  bulkDeleteAccordionData() {
    const data = {
      title_id: this.questAccordion,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteAccordion.nativeElement.click();
        this.affiliationList();
      }
    });
  }
  // bulk delete of audio
  deleteAudioData(id) {
    this.questAudioId = id;
  }
  bulkDeleteAudioData() {
    const data = {
      title_id: this.questAudioId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteAudio.nativeElement.click();
        this.affiliationList();
        this.multimediaAudio = false;
      }
    });
  }
  // bulk delete of youtube
  deleteYoutubeData(id) {
    this.questYoutube = id;
  }
  bulkDeleteYoutubeData() {
    const data = {
      title_id: this.questYoutube,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteYoutube.nativeElement.click();
        this.affiliationList();
        this.youtubeData = false;
      }
    });
  }
  // bulk delete of youtube
  deleteOtherLinkData(id) {
    this.questOtherLinkId = id;
  }
  bulkDeleteOtherLinkData() {
    const data = {
      title_id: this.questOtherLinkId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deleteOtherLink.nativeElement.click();
        this.affiliationList();
        this.otherlink = false;
      }
    });
  }
  // bulk delete of youtube
  deletePdfData(id) {
    this.questPdf = id;
  }

  // all delete for pdf
  bulkDeletePdfData() {
    const data = {
      title_id: this.questPdf,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.deletePdf.nativeElement.click();
        this.affiliationList();
        this.pdfData = false;
      }
    });
  }

  // reset multimedia pages
  resetAudio() {
    this.audioErrorMsg = '';
    this.click = false;
    this.audioButton = false;
    this.myInputVariables.nativeElement.value = '';
    this.audioName = '';
    (this.audSrc = ''), this.audioForm.reset();
    this.resetOtherLink();
  }
  resetPicture() {
    this.pictureErrorMsg = '';
    this.PictureClick = false;
    this.myInputVariables.nativeElement.value = '';
    this.myInputVariabled.nativeElement.value = '';
    this.adioData.audio_name = '';
    this.adioData.title = '';
    this.audioName = '';
    (this.audSrc = ''), (this.filename = '');
    this.pictureForm.reset();
    this.resetOtherLink();
  }
  resetYoutube() {
    this.myInputVariables.nativeElement.value = '';
    this.audioName = '';
    (this.audSrc = ''), this.audioForm.reset();
    this.YoutubeClick = false;
    this.youtubeButton = false;
    this.youtubeForm.reset();
    this.resetOtherLink();
  }
  resetOtherLink() {
    this.otherErr = '';
    this.OtherClick = false;
    this.otherLinkForm.reset();
    this.sendSrc = '';
    this.audioName = '';
    this.audSrc = '';
  }
  resetPdf() {
    this.pdfErr = '';
    this.PdfClick = false;
    this.myInputVariable.nativeElement.value = '';
    this.pdfName = '';
    this.audioName = '';
    (this.audSrc = ''), this.youtubeForm.reset();
    this.pdfForm.reset();
    this.resetOtherLink();
  }
  resetAccordion() {
    this.AccordClick = false;
    this.serviceForm.reset();
    this.createAccordionButton = false;
    this.audioName = '';
    (this.audSrc = ''), this.resetOtherLink();
    const data = this.serviceForm.getRawValue();
    data.forEach((index) => {
      this.deleteServiceField(index);
    });
    this.addNewService();
    this.accordionForm.reset();
  }
  resetInsert() {
    this.insertErr = '';
    this.clicked = false;
    this.createInsertButton = false;
    this.insertTestForm.reset();
    this.audioName = '';
    this.audSrc = '';
  }

  onChange(event, data) {
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

  //sidebar accordion
  //sidebar accordion
  toggleAccordian(event, index, name, id) {
    this.coursesName = sessionStorage.setItem('course_name', name);
    sessionStorage.setItem('course_id', id);
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
    this.title = sessionStorage.setItem('title', title);
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
  getChildSData(child, subtitle) {
    this.subtitle = sessionStorage.setItem('subtitle', subtitle);
    sessionStorage.setItem('subId', child);
    this.titles = false;
    sessionStorage.setItem('subId', child);
    this.affiliationList();
  }

  // back to dashboard
  backToDashboard() {
    if (this.subIds) {
      this.router.navigate(['/teacherDashboard/teachersDashboard'], {
        queryParams: { id: sessionStorage.getItem('subId') },
      });
    } else {
      this.router.navigate(['/teacherDashboard/teachersDashboard']);
    }
  }

  titleForm = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
  });
  setTitleName() {
    // this.titleForm.controls.title.setValue(localStorage.getItem('courseName'));
    // this.titleForm.controls.subTitle.setValue(localStorage.getItem('subtitle'));
    if (sessionStorage.getItem('selectedsubTitle')) {
      this.titleForm.controls.title.setValue(
        sessionStorage.getItem('selectedsubTitle')
      );
      this.getSubTitle(sessionStorage.getItem('selectedsubTitle'));
    }
  }
  // open pdf in new tab
  pdfDatas(e) {
    window.open(e, '_blank');
  }
  // edit accordion
  editAccordion() {
    this.accorSubmit = true;
    if (this.accordionForm.invalid) {
      return;
    } else {
      this.loding = true;
      const employees = this.serviceForm.getRawValue();
      const data = {
        title_id: this.accordionId,
        question_title: this.accordionForm.value.accordion_title,
        accordion: employees,
      };
      this.service.post('edit-accordion', data, 1).subscribe((res) => {
        this.loding = false;
        if (res.body.message === 'accordion success') {
          setTimeout(() => {
            this.closeAccordion.nativeElement.click();
            this.affiliationList();
          }, 1000);
        }
      });
    }
  }

  // get accordion
  getAccordions(id) {
    this.serviceForm.clear();
    this.AccordClick = false;
    this.accordionId = id;
    const data = {
      title_id: id,
    };
    this.service.post('accordion-get', data, 1).subscribe((res) => {
      this.createAccordionButton = true;
      this.editAccordionQuestion = res.body.result;
      this.titleAccorName = res.body.result[0].title;
      for (let j = 0; j < this.editAccordionQuestion[0].data.length; j++) {
        const titleDatas = this.editAccordionQuestion[0].data[j];
        this.addNewService();
        this.serviceForm.at(j).patchValue({
          p_id: titleDatas.id,
          title: titleDatas.title,
          text: titleDatas.text,
        });
      }
      this.accordionForm.patchValue({
        accordion_title: this.titleAccorName,
      });
    });
  }
  // delete question accordion
  deleteAccordions() {
    const data = {
      title_id: this.accordionId,
    };
    this.service.post('delete-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeAccordion.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  deleteAccordionFieldData(formIndex) {
    this.mainpageLoder = true;
    const pId = this.editAccordionQuestion[0].data[formIndex].id;
    this.getPid = pId;
    const data = {
      p_id: this.getPid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeAccordion.nativeElement.click();
        }, 1000);
        this.affiliationList();
      }
    });
  }
  removeDragImageQuestion(empIndex: number, imgIndex: number) {
    this.employeeImage(empIndex).removeAt(imgIndex);
  }
  deleteImageWRong(formIndex, index) {
    this.mainpageLoder = true;
    const pId = this.imageDragData.data[formIndex].worngAnswerImage;
    const subid = pId[index].wrong_ids;
    const data = {
      p_id: subid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeDragBtn.nativeElement.click();
        }, 1000);
        this.affiliationList();
      }
    });
  }
  // multimedia patch data

  //  image
  pictureGetApi(id) {
    this.PictureClick = false;
    this.pictureId = id;
    const data = {
      p_id: id,
      type: 'image',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.imageData = res.body.result.result;
      this.imageButton = true;
      this.pictureForm.patchValue({
        questionPicture: this.imageData.title,
        pictureName: this.imageData.image_name,
      });
    });
  }
  //  image
  pdfGetApi(id) {
    this.PdfClick = false;
    this.pdfId = id;
    const data = {
      p_id: id,
      type: 'pdf',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.pdfEditData = res.body.result.result;
      this.pdfButton = true;
      this.pdfForm.patchValue({
        questionPdf: this.pdfEditData.title,
        pdfName: this.pdfEditData.pdf_name,
      });
    });
  }
  othrlinkGetApi(id) {
    this.OtherClick = false;
    this.otherlinkId = id;
    const data = {
      p_id: id,
      type: 'otherlink',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.otherEditData = res.body.result.result;
      this.otherLinkButton = true;
      this.otherLinkForm.patchValue({
        questionOtherLink: this.otherEditData.title,
        mediaEmbedding: this.otherEditData.other_link_url,
        otherLinkText: this.otherEditData.other_link,
      });
    });
  }

  // audio
  audioGetApi(id) {
    this.click = false;
    this.audioId = id;
    const data = {
      p_id: id,
      type: 'audio',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.audioButton = true;
      this.adioData = res.body.result.result;
      this.audioForm.patchValue({
        questionAudio: this.adioData.title,
        audioName: this.adioData.audio_name,
      });
    });
  }

  // youtube
  youtubeGetApi(id) {
    this.myInputVariables.nativeElement.value = '';
    this.YoutubeClick = false;
    this.youtubeId = id;
    const data = {
      p_id: id,
      type: 'youtube',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.youtubesData = res.body.result.result;
      this.youtubeButton = true;
      this.youtubeForm.patchValue({
        questionYoutube: this.youtubesData.title,
        youtubeText: this.youtubesData.youtube_link,
      });
    });
  }

  // update youtube
  updateYoutube() {
    const data = {
      p_id: this.youtubeId,
      type: 'youtube',
      title: this.youtubeForm.value.questionYoutube,
      data_value: this.youtubeForm.value.youtubeText,
      // name: this.youtubesData.youtube_link
    };
    this.service.post('edit-course-multimedia', data, 1).subscribe((res) => {
      this.closeYoutube.nativeElement.click();
      this.affiliationList();
    });
  }
  // update audio
  updateAudio() {
    this.mainpageLoder = true;
    const data = {
      p_id: this.audioId,
      type: 'audio',
      title: this.audioForm.value.questionAudio,
      data_value: this.audSrc,
      name: this.adioData.audio_name,
    };
    this.service.post('edit-course-multimedia', data, 1).subscribe((res) => {
      this.mainpageLoder = false;
      this.adioData.audio_name = '';
      this.adioData.title = '';
      this.myInputVariables.nativeElement.value = '';
      this.closeAudio.nativeElement.click();
      this.affiliationList();
    });
  }

  // update picture
  updatePicture() {
    const data = {
      p_id: this.pictureId,
      type: 'image',
      title: this.pictureForm.value.questionPicture,
      data_value: this.base64textString,
      name: this.imageData.image_name,
    };
    this.service.post('edit-course-multimedia', data, 1).subscribe((res) => {
      debugger;
      this.closePicture.nativeElement.click();
      this.affiliationList();
    });
  }
  // update pdf
  updatePdf() {
    const data = {
      p_id: this.pdfId,
      type: 'pdf',
      title: this.pdfForm.value.questionPdf,
      data_value: this.fileSrc,
      name: this.pdfEditData.pdf_name,
    };
    this.service.post('edit-course-multimedia', data, 1).subscribe((res) => {
      this.closePdf.nativeElement.click();
      this.affiliationList();
    });
  }
  // update pdf
  updateOtherlink() {
    debugger;
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.otherLinkForm.value.otherLinkText
    );
    var newurl = btoa(this.otherLinkForm.value.mediaEmbedding);

    var url = btoa(this.otherEditData.other_link_url);
    if (!url.startsWith('http')) {
      if (url.includes('http')) {
        url = this.URLReplacer(url);
      } else if (url.includes('https')) {
        url = this.URLReplacer(url);
      }
    }
    if (newurl) {
      this.dataUrl = newurl;
    } else {
      this.dataUrl = url;
    }
    const data = {
      p_id: this.otherlinkId,
      type: 'otherlink',
      title: this.otherLinkForm.value.questionOtherLink,
      other_link_url: url,
      // data_value: this.dataUrl,
      data_value: this.safeSrc,

      name: 'iframe youtube video',
    };
    if (this.safeSrc['changingThisBreaksApplicationSecurity'] != null) {
      if (this.safeSrc['changingThisBreaksApplicationSecurity'].length > 100) {
        data.data_value =
          data.data_value['changingThisBreaksApplicationSecurity'];
      }
    } else {
      delete data.data_value;
    }

    this.service.post('edit-course-multimedia', data, 1).subscribe((res) => {
      this.closeOtherLink.nativeElement.click();
      this.otherlinkId = 0;
      this.otherLinkButton = false;
      this.affiliationList();
    });
  }

  URLReplacer(str) {
    let match = str.match(
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    );
    let final = str;
    match.map((url) => {
      final = url;
    });
    return final;
  }

  // go to back
  gotoBack() {
    console.log(' this.subIds', this.subIds);
    console.log('this.route.queryParams', this.route.queryParams);
    //this._location.back();
    this.router.navigate(['/teacherDashboard/editCourse'], {
      queryParams: { id: sessionStorage.getItem('course_id') },
    });
  }

  getSubTitles(data) {
    sessionStorage.setItem('subtitle', data);
    this.subtitless = sessionStorage.getItem('subtitle');
  }

  getImageBox() {
    this.imagebox = true;
    this.audiobox = false;
    // if (this.imagebox == true) {
    //   (this.addImageData.at(i) as FormGroup).get('audio').patchValue('');
    // }
    if (this.imagebox == true) {
      (this.addImageData.at(0) as FormGroup).get('audio').patchValue('');
    }
  }
  getAudioBox() {
    this.imagebox = false;
    this.audiobox = true;
    if (this.audiobox == true) {
      (this.addImageData.at(0) as FormGroup).get('image').patchValue('');
    }
  }
  radio(data, i, check) {
    var item = this.questionRadioFormData.at(i);
    item.get('answer').setValue(data);
    item.get('checked').setValue(check);
  }

  // fill in the blanks
  // delete fill in the blanks
  deleteFillFieldData() {
    this.mainpageLoder = true;
    const data = {
      p_id: this.fillId,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeFillBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  // open fill in the blanks modal
  openFillModal() {
    this.fillBlanksClick = false;
    this.fillTheBlanksForm.reset();
    this.createFillButton = false;
  }

  // update fill in the blanks
  updateFill() {
    this.mainpageLoder = true;
    const data = {
      title: this.fillTheBlanksForm.value.title,
      question: this.fillTheBlanksForm.value.question,
      score: this.fillTheBlanksForm.value.score,
      p_id: this.fillId,
    };
    this.service.post('update-fillinthe-blank', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeFillBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  fillTheBlanksForm = new FormGroup({
    title: new FormControl('', Validators.required),
    score: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    question: new FormControl('', Validators.required),
    p_id: new FormControl(''),
    // questionFill: new FormControl('',),
  });

  get fills() {
    return this.fillTheBlanksForm.controls;
  }

  fillTheBlanks() {
    this.fillSubmit = true;
    if (this.fillTheBlanksForm.invalid) {
      return;
    }
    this.fillBlanksClick = true;
    this.mainpageLoder = true;
    const data = {
      title: this.fillTheBlanksForm.value.title,
      question: this.fillTheBlanksForm.value.question,
      score: this.fillTheBlanksForm.value.score,
      // question_title: this.fillTheBlanksForm.value.questionFill,
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('question-fill-in-blank', data, 1).subscribe((res) => {
      this.fillBlanksClick = false;
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeFillBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  // patch data in fill in the blanks
  editFillBlanks(id, i) {
    this.fillBlanksClick = false;
    this.fillId = id;
    // this.resetPickModalData();
    const data = {
      // "subtitle_id": localStorage.getItem('subId')
      p_id: this.fillId,
      type: 'fill_in_blank',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.createFillButton = true;

      // this.fillTheBlanksData[i].question = res.body.result.fill_in_the_blanks[0].question;
      this.fillTheBlanksForm.patchValue({
        title: this.fillTheBlanksData[i].title,
        question: res.body.result.fill_in_the_blanks[0].question,
        score: this.fillTheBlanksData[i].score,
        p_id: this.fillTheBlanksData[i].p_id,
        // questionFill: this.fillTheBlanksData[0].question_title
      });
    });
  }
  //end fill in the blanks

  // pick the right word
  pickRightForm = new FormGroup({
    p_id: new FormControl(''),
    title: new FormControl('', Validators.required),
    scoreRange: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
    ]),
    question: new FormControl('', Validators.required),
  });
  get picks() {
    return this.pickRightForm.controls;
  }
  createRightPick() {
    this.pickSubmit = true;
    if (this.pickRightForm.invalid) {
      return;
    }
    this.pickWordClick = true;
    this.mainpageLoder = true;
    const data = {
      title: this.pickRightForm.value.title,
      question: this.pickRightForm.value.question,
      score: this.pickRightForm.value.scoreRange,
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('question-pick-word', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closePickBtn.nativeElement.click();
        }, 1000);
        this.affiliationList();
      }
    });
  }

  // patch pick the right word data
  pickWordData(id) {
    this.pickWordClick = false;
    this.getPickPid = id;
    // this.resetPickModalData();
    const data = {
      // "subtitle_id": localStorage.getItem('subId')
      p_id: this.getPickPid,
      type: 'pick_up_word',
    };
    this.service.post('paragraph-get', data, 1).subscribe((res) => {
      this.createPickRightButton = true;
      this.pickTheRight = res.body.result.pick_up_right_word;
      this.pickRightForm.patchValue({
        title: this.pickTheRight[0].title,
        question: this.pickTheRight[0].question,
        scoreRange: this.pickTheRight[0].score,
        p_id: this.pickTheRight[0].p_id,
      });
    });
  }

  openPickModal() {
    this.pickWordClick = false;
    this.pickRightForm.reset();
    this.createPickRightButton = false;
  }

  updateRightPick() {
    this.mainpageLoder = true;
    const data = {
      title: this.pickRightForm.value.title,
      question: this.pickRightForm.value.question,
      score: this.pickRightForm.value.scoreRange,
      p_id: this.pickRightForm.value.p_id,
    };
    this.service.post('update-pick-word', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closePickBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }

  deletePickFieldData() {
    this.mainpageLoder = true;
    const data = {
      p_id: this.getPickPid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closePickBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }
  //end pick the right word

  // affiliation start
  openAddModel() {
    this.AffiliationClick = false;
    this.submitted = false;
    this.resetModalData();
    this.InitialForms();
    this.addNewServiceData();
    this.affiForm.reset();
    this.createButton = false;
  }

  resetModalData() {
    const data = this.serviceFormaffiliation.getRawValue();
    this.createButton = false;
    // data.map((each, index) => {
    //   this.deleteAffiliationFieldData(index);
    // })
    data.forEach((index) => {
      this.deleteAffiliationFieldData(index);
    });
    //  this.serviceFormaffiliation.reset();
  }
  deleteAffiliationFieldData(formIndex) {
    this.serviceFormaffiliation.removeAt(formIndex);
  }
  get f() {
    return this.affiForm.controls;
  }
  //  create affiliation api
  createAffiliation() {
    this.submitted = true;
    if (this.serviceFormaffiliation.invalid) {
      this.AffiliationClick = false;
      return;
    }
    if (this.affiForm.invalid) {
      this.AffiliationClick = false;
      return;
    }
    this.AffiliationClick = true;
    this.mainpageLoder = true;
    const employee = this.serviceFormaffiliation.getRawValue();
    const data = {
      title_data: employee,
      question_title: this.affiForm.value.question,
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('exercises-course', data, 1).subscribe((res) => {
      this.mainpageLoder = true;
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeBtn.nativeElement.click();
        }, 1000);
      }
      this.affiliationList();
    });
  }
  // edit affiliation
  editAffiliationData(id) {
    this.AffiliationClick = false;
    this.resetModalData();
    this.affiId = id;
    const data = {
      title_id: this.affiId,
    };
    this.service.post('exercises-get', data, 1).subscribe((res) => {
      this.createButton = true;
      this.affiDta = res.body.result;
      this.affiTitleData = res.body.result[0].title;
      this.affiForm.patchValue({
        question: this.affiTitleData,
      });
      for (let i = 0; i < this.affiDta.length; i++) {
        for (let j = 0; j < this.affiDta[i].data.length; j++) {
          const course = this.affiDta[i].data[j];
          this.addNewServiceData();
          this.serviceFormaffiliation.at(j).patchValue({
            p_id: course.p_id,
            antonym: course.antonym,
            right_answer: course.right_answer,
            score: course.score,
            question: course.question,
          });
        }
        for (let k = 0; k < this.affiDta[i].dropdown.length; k++) {
          const dropdownData = this.affiDta[i].dropdown[k];
          this.serviceFormaffiliation.at(k).patchValue({
            right_answer: dropdownData.right_answer,
          });
        }
      }
    });
  }
  // affiliation question title
  affiForm = new FormGroup({
    question: new FormControl('', Validators.required),
  });
  // affiliation modal
  addNewServiceData() {
    const searchForm = new FormGroup({
      p_id: new FormControl(),
      antonym: new FormControl('', Validators.required),
      // matching: new FormControl(),
      right_answer: new FormControl('', Validators.required),
      score: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
    });
    this.serviceFormaffiliation.push(searchForm);
  }
  InitialForms() {
    this.addNewServiceData();
    this.serviceFormaffiliation.controls.length - 2;
  }
  // updateAffiliation
  updateAffiliation() {
    this.submitted = true;
    if (this.serviceFormaffiliation.invalid) {
      this.AffiliationClick = false;
      return;
    }
    if (this.affiForm.invalid) {
      this.AffiliationClick = false;
      return;
    }
    this.AffiliationClick = true;
    this.mainpageLoder = true;
    const employee = this.serviceFormaffiliation.getRawValue();
    const data = {
      title_data: employee,
      subtitle_id: sessionStorage.getItem('subId'),
      question_title: this.affiForm.value.question,
      title_id: this.affiId,
    };
    this.service.post('update-afiliation', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }

      this.affiliationModalShow = true;
    });
  }
  // end affiliation
  // start question with dropdown
  // question with dropdown
  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      p_id: '',
      question: ['', Validators.required],
      answer: ['', Validators.required],
      score: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      worng_answer: this.fb.array([]),
    });
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number) {
    this.employees().removeAt(empIndex);
  }
  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('worng_answer') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      wrong_id: '',
      worng_answer: ['', Validators.required],
    });
  }

  addInitialForms() {
    this.addEmployee();
    this.addEmployeeSkill(this.employees().controls.length - 1);
    // this.createQuestionButton = false;
  }
  addEmployeeSkill(empIndex: number) {
    if (this.empForm.value.employees[empIndex].worng_answer.length < 5) {
      this.employeeSkills(empIndex).push(this.newSkill());
    }
  }
  removeEmployeeSkill(empIndex: number, skillIndex: number) {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  // delete wrong question radio
  deleteWrongQuestionRadio(formIndex, index) {
    this.mainpageLoder = true;
    const pId = this.questionDropData.data[formIndex].worng_answer;
    const subid = pId[index].p_ids;
    const data = {
      p_id: subid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      this.closeDropdownBtn.nativeElement.click();
      this.affiliationList();
    });
  }
  get fs() {
    return this.empForm.controls;
  }
  addQuestionDropDrag() {
    this.submits = true;
    if (this.empForm.invalid) {
      this.dropdownClick = false;
      return;
    }
    this.dropdownClick = true;
    this.mainpageLoder = true;
    const titleForm = this.employees().getRawValue();
    const data = {
      title_data: titleForm,
      question_title: this.empForm.value.question_title,
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('question-dropdown', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeDropdownBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }
  // patch value in question with dropdown
  editQuestionDrop(id) {
    this.mainpageLoder = false;
    this.dropdownClick = false;
    this.employees().clear();
    this.resetQuestionModalData();
    this.updateId = id;
    const data = {
      title_id: this.updateId,
    };
    this.service.post('question-dropdown-get', data, 1).subscribe((res) => {
      this.createQuestionButton = true;
      this.questionDropData = res.body.result;
      this.titleDataName = res.body.result.title;
      // for (let i = 0; i < this.questionDropData.length; i++) {
      for (let j = 0; j < this.questionDropData.data.length; j++) {
        const titleDatas = this.questionDropData.data[j];
        this.addEmployee();

        this.employees().at(j).patchValue({
          p_id: titleDatas.p_id,
          question: titleDatas.question,
          answer: titleDatas.answer,
          score: titleDatas.score,
        });
        for (let k = 0; k < titleDatas.worng_answer.length; k++) {
          this.addEmployeeSkill(j);
          const sub_titleData = titleDatas.worng_answer[k];
          this.employeeSkills(j).at(k).patchValue({
            wrong_id: sub_titleData.p_ids,
            worng_answer: sub_titleData.wrong,
          });
        }
      }

      // }
      this.empForm.patchValue({
        question_title: this.titleDataName,
      });
    });
  }
  openQuestionAddModel() {
    this.mainpageLoder = false;
    this.dropdownClick = false;
    this.submits = false;
    this.resetQuestionModalData();
    this.empForm.reset();
    this.createQuestionButton = false;
    this.addEmployee();
    this.addEmployeeSkill(this.employees().controls.length - 1);
  }

  resetQuestionModalData() {
    const data = this.employees().getRawValue();
    data.forEach((index) => {
      this.removeEmployee(index);
    });
  }
  // get question with dropdown
  getQuestion() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('question-dropdown-get', data, 1).subscribe((res) => {
      this.questionDropDown = res.body.result;
      if (res.body.result) {
        this.questionDrop = true;
      }
    });
  }

  //update question with dropdown
  updateQuestion() {
    this.submits = true;
    if (this.empForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    const titleForm = this.employees().getRawValue();
    // console.log(Dragemployee);
    const data = {
      title_data: titleForm,
      title_id: this.updateId,
      title: this.empForm.value.question_title,
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('update-question-dropdown', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeDropdownBtn.nativeElement.click();
        }, 1000);
        this.affiliationList();
      }
    });
  }
  // end question with dropdown

  // start question with radio button
  // question with radio button
  questionInitialForms() {
    this.addQuestionRadioButton();
  }
  addQuestionRadioButton() {
    const fillInQuestionForm = new FormGroup({
      p_id: new FormControl(''),
      score: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]\d*$/),
      ]),
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
      option: new FormControl('', [
        Validators.required,
        Validators.maxLength(254),
      ]),
      option1: new FormControl('', [
        Validators.required,
        Validators.maxLength(254),
      ]),
      option2: new FormControl('', [
        Validators.required,
        Validators.maxLength(254),
      ]),
      checked: new FormControl(''),
    });
    this.questionRadioFormData.push(fillInQuestionForm);
  }

  deleteQuestion(formIndex) {
    this.questionRadioFormData.removeAt(formIndex);
  }
  questionRadioForm = new FormGroup({
    question_title: new FormControl('', Validators.required),
  });
  get form() {
    return this.questionRadioForm.controls;
  }

  addQuestionRadio() {
    this.QuesSubmitted = true;
    if (this.questionRadioFormData.invalid) {
      this.RadioClick = false;
      return;
    }
    if (this.questionRadioForm.invalid) {
      this.RadioClick = false;
      return;
    }
    this.RadioClick = true;
    this.mainpageLoder = true;
    const fillQuestionRadio = this.questionRadioFormData.getRawValue();
    const data = {
      question: this.questionRadioForm.value.question,
      question_title: this.questionRadioForm.value.question_title,
      // answer: this.radioForm.value.answer,
      title_data: fillQuestionRadio,
      subtitle_id: sessionStorage.getItem('subId'),
      user_id: sessionStorage.getItem('uid'),
    };
    this.service.post('question-radio-button', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeRadioBtn1.nativeElement.click();
          this.affiliationList();
        }, 1000);
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
      if (res.body.result) {
        this.questionRadio = true;
      }
    });
  }

  // patch data in question with radio button
  editQuestionRadio(id) {
    this.RadioClick = false;
    this.questionRadioFormData = this.formBuilder.array([]);
    this.radioId = id;
    const data = {
      title_id: this.radioId,
    };
    this.service.post('radio-button-get', data, 1).subscribe((res) => {
      this.radioEdit = res.body.result;
      this.createQuestionRadioButton = true;
      for (let i = 0; i < this.radioEdit.data.length; i++) {
        const titleData = this.radioEdit.data[i];
        this.radioData = this.radioEdit.data[i].answer;
        const optionData = titleData.option[0];
        this.addQuestionRadioButton();
        this.questionRadioFormData.at(i).patchValue({
          p_id: titleData.p_id,
          answer: titleData.answer,
          question: titleData.question,
          score: titleData.score,
          option: optionData.option1,
          option1: optionData.option2,
          option2: optionData.option3,
        });
      }
      this.titleRadio = res.body.result.title;
      this.questionRadioForm.patchValue({
        question_title: this.titleRadio,
      });
    });
  }

  // update question radio button
  updateQuestionRadio() {
    this.QuesSubmitted = true;
    if (this.questionRadioFormData.invalid) {
      return;
    }
    if (this.questionRadioForm.invalid) {
      return;
    }
    this.mainpageLoder = true;
    const fillQuestionRadio = this.questionRadioFormData;
    fillQuestionRadio.controls.forEach((element) => {
      var answer = element.get('answer');
      var checked = element.get('checked');
      if (checked.value != '') {
        answer.setValue(checked.value);
      }
    });
    const data = {
      question_title: this.questionRadioForm.value.question_title,
      title_data: fillQuestionRadio.getRawValue(),
      title_id: this.radioId,
    };
    this.service
      .post('update-question-radio-button', data, 1)
      .subscribe((res) => {
        if (res.body.message === 'success') {
          this.mainpageLoder = false;
          setTimeout(() => {
            this.closeRadioBtn.nativeElement.click();
            this.affiliationList();
          }, 1000);
        }
      });
  }
  openQuestionRadioModel() {
    this.RadioClick = false;
    this.QuesSubmitted = false;
    this.createQuestionRadioButton = false;
    const data = this.questionRadioFormData.getRawValue();
    data.forEach((index) => {
      this.deleteQuestion(index);
    });
    this.addQuestionRadioButton();
    this.questionRadioForm.reset();
  }
  // end question-radio-buton

  // start image drag and drop
  getImageDrag() {
    const data = {
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('image-dragdrop-get', data, 1).subscribe((res) => {
      this.imageDrag = res.body.result;
      if (res.body.result) {
        this.imagesDrag = true;
      }
    });
  }

  // patch data in drag drop images
  editDragImage(id) {
    this.mainpageLoder = false;
    this.ImageClick = false;
    this.addImageData.clear();
    this.imageTitleId = id;
    // this.resetDragModalData();
    const data = {
      title_id: this.imageTitleId,
    };
    this.service.post('image-dragdrop-get', data, 1).subscribe((res) => {
      this.createEditDragButton = true;
      this.imageDragData = res.body.result;
      this.imageDragDataTitle = res.body.result.title;
      for (let j = 0; j < this.imageDragData.data.length; j++) {
        this.addImages();
        const titleData = this.imageDragData.data[j];
        this.audioData = this.imageDragData.data[j];
        if (this.audioData.audio) {
          this.imagebox = false;
          this.audiobox = true;
        } else if (this.audioData.image) {
          this.imagebox = true;
          this.audiobox = false;
        }
        console.log(this.audioData);
        this.addImageData.at(j).patchValue({
          p_id: titleData.p_id,
          fid: titleData.fid,
          answer: titleData.answer,
          image: titleData.image,
          audio: titleData.audio,
          score: titleData.score,
          audio_fid: titleData.audio_fid,
        });
        for (let k = 0; k < titleData.worngAnswerImage.length; k++) {
          this.addNewSkills(j);
          const sub_titleData = titleData.worngAnswerImage[k];
          this.employeeImage(j).at(k).patchValue({
            wrong_ids: sub_titleData.wrong_ids,
            worngAnswerImage: sub_titleData.worngAnswerImage,
          });
        }
      }
      this.imageForm.patchValue({
        question_title: this.imageDragDataTitle,
      });
    });
  }

  openImageDragModel() {
    this.ImageClick = false;
    this.submitss = false;
    this.createEditDragButton = false;
    const data = this.addImageData.getRawValue();
    data.forEach((index) => {
      this.deleteaddImageDrag(index);
    });
    this.addImages();
    this.addNewSkills(this.addImageData.controls.length - 1);
    this.imageForm.reset();
  }

  // update image drag and drop
  updateImage() {
    this.submitss = true;
    if (this.imageForm.invalid) {
      return;
    }
    if (this.addImageData.invalid) {
      return;
    }
    var imageData;
    this.mainpageLoder = true;
    const imageDragemployee = this.addImageData.getRawValue();

    const data = {
      title_data: imageDragemployee,
      title_id: this.imageTitleId,
      question_title: this.imageForm.value.question_title,
      type: '1',
      subtitle_id: sessionStorage.getItem('subId'),
    };
    this.service.post('update-image-drag-drop', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        this.mainpageLoder = false;
        setTimeout(() => {
          this.closeDragBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }
  // delete image drag and drop
  deleteImageDragDrop(formIndex) {
    this.mainpageLoder = true;
    const pId = this.imageDragData.data[formIndex].p_id;
    this.getImagePid = pId;

    this.imageDrag;
    const data = {
      p_id: this.getImagePid,
    };
    this.service.post('delete-course-exercise', data, 1).subscribe((res) => {
      if (res.body.message === 'success') {
        setTimeout(() => {
          this.mainpageLoder = false;
          this.closeDragBtn.nativeElement.click();
          this.affiliationList();
        }, 1000);
      }
    });
  }
  // image upload in drag and drop
  get addImageData(): FormArray {
    return this.imageForm.get('addImageData') as FormArray;
  }

  newImageData(): FormGroup {
    return this.fb.group({
      image: '',
      audio: '',
      score: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      answer: ['', Validators.required],
      p_id: '',
      fid: '',
      audio_fid: '',
      worngAnswer: this.fb.array([]),
    });
  }

  addImages() {
    this.addImageData.push(this.newImageData());
  }

  removeImages(imagesIndex: number) {
    this.addImageData.removeAt(imagesIndex);
  }

  employeeImage(empIndex: number): FormArray {
    return this.addImageData.at(empIndex).get('worngAnswer') as FormArray;
  }
  newImageSkill(): FormGroup {
    return this.fb.group({
      wrong_ids: '',
      worngAnswerImage: ['', Validators.required],
    });
  }

  addNewSkills(empIndex: number) {
    this.employeeImage(empIndex).push(this.newImageSkill());
  }

  imageInitialForms() {
    this.addImages();
    this.addNewSkills(this.addImageData.controls.length - 1);
  }
  deleteaddImageDrag(formIndex) {
    this.addImageData.removeAt(formIndex);
  }

  addImageDragDrop() {
    this.imageErrorMsg = '';
    this.submitss = true;
    const imageDragemployee = this.addImageData.getRawValue();
    var isError = false;
    if (this.imageForm.invalid) {
      this.ImageClick = false;
      isError = true;
    }
    if (this.addImageData.invalid) {
      this.ImageClick = false;
      isError = true;
    }
    var attachment = null;
    imageDragemployee.forEach((element) => {
      attachment = element['image'];
      if (attachment == null) {
        attachment = element['audio'];
      }
      if (attachment == null) {
        this.imageErrorMsg = 'Audio/Image required';
        isError = true;
        return;
      }
    });

    if (!isError) {
      this.ImageClick = true;
      this.mainpageLoder = true;

      const data = {
        title_data: imageDragemployee,
        question_title: this.imageForm.value.question_title,
        type: '1',
        subtitle_id: sessionStorage.getItem('subId'),
        user_id: sessionStorage.getItem('uid'),
      };
      this.service.post('image-drag-drop', data, 1).subscribe((res) => {
        if (res.body.message === 'success') {
          this.mainpageLoder = false;
          setTimeout(() => {
            this.closeDragBtn.nativeElement.click();
            this.affiliationList();
          }, 1000);
        }
      });
    }
  }
  // audio upload
  handleAudioChange(e, i) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /audio-*/;
    // var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imageErrorMsg = '';
    var isAlreadyExist = false;
    var imageObject;
    this.audioFiles.forEach((element) => {
      var id = element.id;
      if (id == i) {
        isAlreadyExist = true;
        imageObject = element;
      }
    });
    if (isAlreadyExist) {
      if (imageObject != undefined) {
        imageObject.files.push(file);
        this.imageFiles.forEach((element1) => {
          if (element1.id == i) {
            const index: number = this.imageFiles.indexOf(element1);
            if (index !== -1) {
              this.imageFiles.splice(index, 1);
            }
          }
        });
        if (this.imagebox == true) {
          (this.addImageData.at(i) as FormGroup).get('audio').patchValue('');
        }
      }
    } else {
      this.audioFiles.push({
        id: i,
        files: [file],
      });
      this.imageFiles.forEach((element1) => {
        if (element1.id == i) {
          const index: number = this.imageFiles.indexOf(element1);
          if (index !== -1) {
            this.imageFiles.splice(index, 1);
          }
        }
      });
      // (this.addImageData.at(i) as FormGroup).get('image').patchValue('');
      if (this.audiobox == true) {
        (this.addImageData.at(i) as FormGroup).get('image').patchValue('');
      }
      this.audioFiles.forEach((element) => {
        var id = element.id;
        if (id == i) {
          imageObject = element;
        }
      });
    }
    this._handledReaderLoaded(imageObject, i);
  }
  _handledReaderLoaded(e, index) {
    var files = e.files;
    var audioSrc = '';
    files.forEach((element) => {
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (e) => {
        audioSrc = reader.result.toString();
        (this.addImageData.at(index) as FormGroup)
          .get('audio')
          .patchValue(audioSrc);
      };
    });
    // var reader = e.target;
    // this.audioSrc = reader.result;
    // if (this.audioSrc = reader.result) {
    //   this.audioShow = true;
    // }
    // this.addImageData.at(index).patchValue({
    //   audio: this.audioSrc
    // })
  }
  handleInputChange(e, i) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    // var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.imageErrorMsg = '';
    var isAlreadyExist = false;
    var imageObject;
    this.imageFiles.forEach((element) => {
      var id = element.id;
      if (id == i) {
        isAlreadyExist = true;
        imageObject = element;
      }
    });
    if (isAlreadyExist) {
      if (imageObject != undefined) {
        imageObject.files.push(file);
        this.audioFiles.forEach((element1) => {
          if (element1.id == i) {
            const index: number = this.audioFiles.indexOf(element1);
            if (index !== -1) {
              this.audioFiles.splice(index, 1);
            }
          }
        });
        if (this.imagebox == true) {
          (this.addImageData.at(i) as FormGroup).get('audio').patchValue('');
        }
      }
    } else {
      this.imageFiles.push({
        id: i,
        files: [file],
      });
      this.audioFiles.forEach((element1) => {
        if (element1.id == i) {
          const index: number = this.audioFiles.indexOf(element1);
          if (index !== -1) {
            this.audioFiles.splice(index, 1);
          }
        }
      });
      if (this.imagebox == true) {
        (this.addImageData.at(i) as FormGroup).get('audio').patchValue('');
      }
      // (this.addImageData.at(i) as FormGroup).get('audio').patchValue('');
      this.imageFiles.forEach((element) => {
        var id = element.id;
        if (id == i) {
          imageObject = element;
        }
      });
    }
    this._handleReaderLoadedd(imageObject, i);
  }

  _handleReaderLoadedd(e, index) {
    var files = e.files;
    var imageSrc = '';
    files.forEach((element) => {
      var reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = (e) => {
        imageSrc = reader.result.toString();
        (this.addImageData.at(index) as FormGroup)
          .get('image')
          .patchValue(imageSrc);
      };
    });
  }
  getImage(data) {
    this.image = data;
  }
}
