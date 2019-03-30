import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.scss'],
})
export class MyModalComponent implements OnInit {

  constructor(private navParams:NavParams) { }
  character:any;
  ngOnInit() {
    this.character = this.navParams.data.character;  
  }
  dismiss(){
    this.navParams.data.modal.dismiss();
  }
}
