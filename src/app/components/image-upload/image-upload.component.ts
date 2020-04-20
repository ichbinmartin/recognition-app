import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Prediction } from '../../interfaces/prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  model: any;
  loading: boolean = true;
  imageSrc: string;
  predictions: Prediction[];
  

  @ViewChild('img') imageEl: ElementRef;

  constructor() { }

  async ngOnInit() {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
  }

  async fileChange(event){
    const file= event.target.files[0];
    console.log(event);
    if(file){
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (res:any) => {
        this.imageSrc = res.target.result;

        setTimeout(async() =>{
          const imgEl = this.imageEl.nativeElement;
          this.predictions = await this.model.classify(imgEl);
        });
      }
    }

    
  }



}
