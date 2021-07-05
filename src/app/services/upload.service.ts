import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    private UPLOAD_PATH: string = "/";

    constructor(private httpClient: HttpClient) { }

    public upload(formData: FormData) {

        const req = new HttpRequest('POST', this.UPLOAD_PATH, formData, {
            reportProgress: true
        });

        const progress = new BehaviorSubject<number>(0);

        this.httpClient.request(req).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // Report progress
                    progress.next(Math.round(100 * event.loaded / event.total));
                } else if (event instanceof HttpResponse) {
                    // Report progress and complete the Observable
                    progress.next(100);
                    progress.complete();
                }
            }
        );

        return progress.asObservable();

    }

}
