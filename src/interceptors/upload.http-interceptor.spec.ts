import {
    HttpTestingController,
    HttpClientTestingModule,
    RequestMatch
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HTTP_INTERCEPTORS, HttpRequest } from "@angular/common/http";
import { HttpCommonInterceptor } from "./upload.http-interceptor";
import { httpTimeout, DEFAULT_HTTP_TIMEOUT, baseUrl } from "../productsList.const";
import {UploadService} from "../app/services/upload.service";

describe("HttpInterceptor", () => {
    let service: UploadService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                UploadService,
                { provide: DEFAULT_HTTP_TIMEOUT, useValue: httpTimeout },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpCommonInterceptor,
                    multi: true
                }
            ]
        });

        service = TestBed.get(UploadService);
        httpTestingController = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should add 'Content-Type' header", () => {
        service.upload().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.flush("{}");
        expect(httpReq.request.headers.has("Content-Type")).toEqual(true);
    });

    it("should retry when error is thrown", () => {
        service.upload().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.error(new ErrorEvent("timeout"), { status: 500 });
    });

    it("should not retry when 404 error is thrown", () => {
        service.upload().subscribe();
        const httpReq = httpTestingController.expectOne(
            baseUrl.concat("/getAll")
        );
        httpReq.error(new ErrorEvent("not found"), { status: 404 });
    });
});
