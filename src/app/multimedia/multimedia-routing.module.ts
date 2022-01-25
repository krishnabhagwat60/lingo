import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaContentViewComponent } from '../multimedia/media-content-view/media-content-view.component'
import { ContentStyleComponent } from './content-style/content-style.component';

const routes: Routes = [
  {
    path: 'mediaContent',
    component: MediaContentViewComponent,
    data: {
      title: 'MediaContentViewComponent'
    }
  },
  {
    path: 'contentStyle',
    component: ContentStyleComponent,
    data: {
      title: 'ContentStyleComponent'
    }
  },
]
  ;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultimediaRoutingModule {
}

export const routedComponents = [];
