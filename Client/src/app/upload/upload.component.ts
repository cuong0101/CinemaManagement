import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upload-file',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  progress!: number;
  message?: string;
  filename?: string;
  serverPath?: string;
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:44389/api/upload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.filename = event.body.fileName;
          this.serverPath = `https://localhost:44389/${event.body.dbPath}`;
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });
  }

 
}
