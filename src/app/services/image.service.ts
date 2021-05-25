import {ElementRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  getImage(image: ElementRef) {
    if (image.nativeElement.files.length > 0) {
      const fileName = image.nativeElement.files[0].name
      const fileEnding = fileName.split('.').pop();
      return image.nativeElement.files[0];
    } else {
      return new Blob();
    }
  }

}
