import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteComponent } from './site/site.component';

import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@NgModule({
  declarations: [
    SiteComponent
  ],
  imports: [
    CommonModule,
    AnimateOnScrollModule
  ],
  exports: [
    SiteComponent
  ]
})
export class SiteModule { }
