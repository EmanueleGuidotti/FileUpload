import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UploaderComponent} from "../../components/uploader/uploader.component";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
      UploaderComponent
  ],
  imports: [
    CommonModule,
      SharedModule
  ],
    exports: [
        UploaderComponent
    ]
})
export class UploaderModule { }
