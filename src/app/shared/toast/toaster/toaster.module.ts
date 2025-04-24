import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './toaster.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ToasterComponent, ],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [ToasterComponent, ]
})
export class ToasterModule { }
