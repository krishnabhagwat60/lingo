import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MultimediaRoutingModule} from '../multimedia/multimedia-routing.module'
import { HttpClientModule } from '@angular/common/http';
import {MediaContentViewComponent} from '../multimedia/media-content-view/media-content-view.component'
import { NavSideBarComponent } from './nav-side-bar/nav-side-bar.component';
import { ContentStyleComponent } from './content-style/content-style.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular'
import { ContentPipe } from '../multimedia/content-style/contentPipe';
import { ProgressComponent } from './progress/progress.component';

@NgModule({
    imports: [
        CommonModule,
        CKEditorModule,
        FormsModule,
        ReactiveFormsModule,
        MultimediaRoutingModule,
        HttpClientModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
    MediaContentViewComponent,
    NavSideBarComponent,
    ContentStyleComponent,
    HeaderBarComponent,
    ContentPipe,
    ProgressComponent
    ]
})
export class MultimediaModule { }
