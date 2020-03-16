import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import {HttpEventType, HttpErrorResponse, HttpEvent} from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {UploadService} from "../../services/upload.service";


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];
    constructor(private uploadService: UploadService) { }

    ngOnInit() {
    }

    uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file.data);
        file.inProgress = true;
        this.uploadService.upload(formData).subscribe(progress => {
            console.log(progress)
        })

    }

    private uploadFiles() {
        this.fileUpload.nativeElement.value = '';
        this.files.forEach(file => {
            this.uploadFile(file);
        });
    }

    onClick() {
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {
            for (let index = 0; index < fileUpload.files.length; index++)
            {
                const file = fileUpload.files[index];
                this.files.push({ data: file, inProgress: false, progress: 0});
            }
            this.uploadFiles();
        };
        fileUpload.click();
    }

}
