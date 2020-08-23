import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event) {
    console.log(event);

    const selectedFiles = <FileList>event.srcElement.files;
    
    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
    }

    document.querySelector('#customFileLabel').innerHTML = fileNames.join(', ');
  }

}
