import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ServicesService } from '../fetch-service/services.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private alertController:AlertController,private _service:ServicesService) { }
  types = ["All","Villon And Hero","Villon","Others"];
  ranges = [10,20,50,100];
  movies = ["Ant Man","Iron Man"];
  orderBys = ["A-Z","a-z"];
  categories = ["characters","comics","creators","events","series","stories"];
  characterType = "All";
  range = 10;
  movie = "Ant Man";
  orderBy = "A-Z";
  category = "characters";
  ngOnInit() {
  }
  async openModal(message:string,types:any) {
    let inputs = [];
    for(let input of types){
      inputs.push({
        name:message,
        type:'radio',
        label:input,
        value:input,
        checked:(input==this.characterType || input ==this.range || input == this.movie || input == this.orderBy || input == this.category)
      });
    }
    const alert = await this.alertController.create({
      header: message,
      inputs:inputs,
      buttons: ["cancel","ok"]
    });
    alert.onDidDismiss().then((data)=>{
      if(data.data.values){
        if(message=="Character Type"){
          this.characterType = data.data.values;
        }else if(message=="Movies"){
          this.movie = data.data.values;
        }else if(message == "Range"){
          this.range = data.data.values;
        }else if(message == "Categories"){
          this.category = data.data.values;
        }else{
          this.orderBy = data.data.values;
        }
      }
    })
    await alert.present();
  }
  setFilter(){
    this._service.setFilter(this.characterType,this.range,this.movie,this.orderBy,this.category);
  }
}
