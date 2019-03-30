import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(private domSanitizer:DomSanitizer,private camera: Camera) { }
  
  images = [];
  ngOnInit() {
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    }
     
    this.camera.getPicture(options).then((imageData) => {
      // Do something with the new photo
      console.log(imageData);
      imageData = 'data:image/jpeg;base64,'+ imageData;
      this.images.push(this.domSanitizer.bypassSecurityTrustUrl(imageData));
      // this.images.push(imageData);
    }, (err) => {
      // Handle error
      console.log("Camera issue: " + err);
    });
  }

}
