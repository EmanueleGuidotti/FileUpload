import {Injectable, Inject, InjectionToken} from "@angular/core";
import {
    HttpInterceptor,
    HttpEvent,
    HttpHeaders,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import {
    timeout,
    retryWhen,
    takeWhile,
    delay,
    mergeMap,
    scan, catchError
} from "rxjs/operators";
import * as fu from "../app/app.const";

@Injectable()
export class UploadInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        /* instanbul ignore else */
        let headers: HttpHeaders = req.headers || new HttpHeaders();
        headers = headers.append("Content-Type", "multipart/form-data;");
        const newReq = req.clone({
            headers,
            url: fu.baseUrl.concat(req.url)
        });
        return next.handle(newReq).pipe(
            retryWhen(error => {
                return error.pipe(
                    mergeMap((error: any) => {
                        if (error.status >= 500) {
                            return of(error.status);
                        }
                        return throwError({errorMessage: error.error.message, errorType: error.error.error, errorResponse: error.error.success, typeOfRequest: 'uploading request'});
                    }),
                    scan(attempt => {
                        return ++attempt;
                    }, 0),
                    takeWhile(attempt => attempt < 3),
                    delay(1000)
                );
            })
        );
    }
}
