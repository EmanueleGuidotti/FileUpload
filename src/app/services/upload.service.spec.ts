import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('UploadService', () => {
    let httpTestingController: HttpTestingController;
    let service: UploadService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UploadService],
            imports: [HttpClientTestingModule]
        });

        httpTestingController = TestBed.get(HttpTestingController);
        service = TestBed.get(UploadService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        const service: UploadService = TestBed.get(UploadService);
        expect(service).toBeTruthy();
    });

    it("should save form data", async () => {
        service.upload().subscribe(result => {
            expect(result).toMatchSnapshot();
        });
        const req = httpTestingController.expectOne("https://file.io/");
        req.flush(data);
    });

});
