import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AcceptCourseComponent } from '../teacher-dashboard/accept-course/accept-course.component';
import { AddNewCourseIntroComponent } from '../teacher-dashboard/add-new-course-intro/add-new-course-intro.component';
import { ReviewComponent } from '../teacher-dashboard/review/review.component';
import { TaskEditorComponent } from '../teacher-dashboard/task-editor/task-editor.component';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard/teacher-dashboard.component';
import { TeacherProfileComponent } from '../teacher-dashboard/teacher-profile/teacher-profile.component';
import { TeacherSupportComponent } from '../teacher-dashboard/teacher-support/teacher-support.component';
import { TeacherWalletComponent } from '../teacher-dashboard/teacher-wallet/teacher-wallet.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'
import { CreatCourseDashboardComponent } from './creat-course-dashboard/creat-course-dashboard.component'
import { AddCourseComponent } from './add-course/add-course.component'
import { TeacherCourseDetailComponent } from './teacher-course-detail/teacher-course-detail.component';
import { PreviousSupportComponent } from './previous-support/previous-support.component';
import { TeacherViewStudentComponent } from './teacher-view-student/teacher-view-student.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { AffiliationResultComponent } from './affiliation-result/affiliation-result.component';
import { ImageDragResultComponent } from './image-drag-result/image-drag-result.component';
import { ImageDragWordComponent } from './image-drag-word/image-drag-word.component';
import { AffiliationRetryComponent } from './affiliation-retry/affiliation-retry.component'
import { QuestionDropdownResultComponent } from './question-dropdown-result/question-dropdown-result.component'
import { PickRightResultComponent } from './pick-right-result/pick-right-result.component'
import { FillTheResultComponent } from './fill-the-result/fill-the-result.component';
import { QuestionRadioResultComponent } from './question-radio-result/question-radio-result.component';
import { SolutionAffiliationComponent } from './solution-affiliation/solution-affiliation.component';
import { PickWordSolutionComponent } from './pick-word-solution/pick-word-solution.component';
import { FillWordSolutionComponent } from './fill-word-solution/fill-word-solution.component';
import { QuestionDropdownSolutionComponent } from './question-dropdown-solution/question-dropdown-solution.component';
import { QuesRadioSolutionComponent } from './ques-radio-solution/ques-radio-solution.component';
import { TextDragSolutionComponent } from './text-drag-solution/text-drag-solution.component';
import { ImageDragSolutionComponent } from './image-drag-solution/image-drag-solution.component';
const routes: Routes = [

    {
      path: 'accept_details',
      component: AcceptCourseComponent,
      data: {
        title: 'AcceptCourseComponent'
      }
    },
    {
      path: 'affiliationSolution',
      component: SolutionAffiliationComponent,
    },
    {
      path: 'pickTheWordSolution',
      component: PickWordSolutionComponent,
    },
    {
      path: 'fillWordSolution',
      component: FillWordSolutionComponent,
    },
    {
      path: 'questionDropSolution',
      component: QuestionDropdownSolutionComponent,
    },
    {
      path: 'questionRadioSolution',
      component: QuesRadioSolutionComponent,
    },
    {
      path: 'textDragSolution',
      component: TextDragSolutionComponent,
    },
    {
      path: 'imageDragSolution',
      component: ImageDragSolutionComponent,
    },
    {
      path: 'fill-result',
      component: FillTheResultComponent,
      data: {
        title: 'FillTheResultComponent'
      }
    },
    {
      path: 'questionradio-result',
      component: QuestionRadioResultComponent,
      data: {
        title: 'QuestionRadioResultComponent'
      }
    },
    {
      path: 'pick-right-word-result',
      component: PickRightResultComponent,
      data: {
        title: 'PickRightResultComponent'
      }
    },
    {
      path: 'question-dropDown-result',
      component: QuestionDropdownResultComponent,
      data: {
        title: 'QuestionDropdownResultComponent'
      }
    },
    {
      path: 'student-view',
      component: StudentViewComponent,
      data: {
        title: 'StudentViewComponent'
      }
    },
    {
      path: 'image-drag-result',
      component: ImageDragResultComponent,
      data: {
        title: 'ImageDragResultComponent'
      }
    },
    {
      path: 'affiliation-retry',
      component: AffiliationRetryComponent,
      data: {
        title: 'AffiliationRetryComponent'
      }
    },
    {
      path: 'drag-word',
      component: ImageDragWordComponent,
      data: {
        title: 'ImageDragWordComponent'
      }
    },
    {
      path: 'affiliation-result',
      component: AffiliationResultComponent,
      data: {
        title: 'AffiliationResultComponent'
      }
    },
    {
      path: 'previous_support',
      component: PreviousSupportComponent,
      data: {
        title: 'PreviousSupportComponent'
      }
    },
    {
      path: 'view-student',
      component: TeacherViewStudentComponent,
      data: {
        title: 'TeacherViewStudentComponent'
      }
    },
    {
      path: 'editCourse',
      component: AddNewCourseIntroComponent,
      data: {
        title: 'AddNewCourseIntroComponent'
      }
    },
  {
    path: 'review',
    component: ReviewComponent,
    data: {
      title: 'ReviewComponent'
    }
  },
    {
      path: 'taskEditor',
      component: TaskEditorComponent,
      data: {
        title: 'TaskEditorComponent'
      }
    },
    {
        path: 'teacherProfile',
        component: TeacherProfileComponent,
        data: {
          title: 'TeacherProfileComponent'
        }
      },
      {
        path: 'teachersDashboard',
        component: TeacherDashboardComponent,
        data: {
          title: 'TeacherDashboardComponent'
        }
      },
      {
      path: 'teacherSupport',
      component: TeacherSupportComponent,
      data: {
        title: 'TeacherSupportComponent'
      }
    },
    {
      path: 'teacherCourseDetail',
      component: TeacherCourseDetailComponent,
      data: {
        title: 'TeacherCourseDetailComponent'
      }
    },
    {
      path: 'addCourse',
      component: AddCourseComponent,
      data: {
        title: 'AddCourseComponent'
      }
    },
    {
      path: 'teacherWallet',
      component: TeacherWalletComponent,
      data: {
        title: 'StudentProfileComponent'
      }
    },
    {
      path: 'editProfile',
      component: EditProfileComponent,
      data: {
        title: 'EditProfileComponent'
      }
    },
    {
      path: 'creatCourseDashboard',
      component: CreatCourseDashboardComponent,
      data: {
        title: 'CreatCourseDashboardComponent'
      }
    },
  ]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {
}

export const routedComponents = [ ];
