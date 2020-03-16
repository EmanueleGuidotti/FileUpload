import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {UploaderModule} from "./modules/uploader/uploader.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {UploadInterceptor} from "../interceptors/upload.http-interceptor";
import {DEFAULT_HTTP_TIMEOUT} from "./app.const";
import {UploadService} from "./services/upload.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      SharedModule,
      UploaderModule
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: UploadInterceptor,
          multi: true
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
