import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxJsonViewerModule
  ],
  exports: [
    NgxJsonViewerModule
  ]
})
export class DashboardSharedModule { }
