import { Component } from '@angular/core';
import { ServicesService } from '../fetch-service/services.service';
import { NavController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(private _service: ServicesService, private modalController: ModalController) { }
  characters: any;
  isLoad = false;
  message: string;
  myUnsub: Subscription;
  ngOnInit() {
    this.myUnsub = this.getData();
  }

  getData(offset=0) {
    return this._service.getDataByCat("comics",offset).subscribe((resp: any) => {
      this.isLoad = true;
      this.characters = resp.data;
      console.log(this.characters);
    }, (err) => {
      this.isLoad = true;
      this.characters = undefined;
      this.message = "Something going wrong. Please contact to app admin."
      console.log(err);
    })
  }
  async openFullModal(character: any) {
    const modal = await this.modalController.create({
      component: MyModalComponent,
    });
    modal.componentProps = { character, modal };
    await modal.present();
    modal.onDidDismiss().then(console.log);
  }

  doRefresh(event) {
    this.myUnsub = this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getNextPrev(isNext=true){
    this.isLoad = false;
    if(isNext){
      this.myUnsub = this.getData(this.characters.offset+this.characters.limit);
    }else{
      if(this.characters.offset){
        this.myUnsub = this.getData(this.characters.offset-this.characters.limit);
      }
    }
  }

  ngOnDestroy() {
    this.myUnsub.unsubscribe();
    console.log("unsubscribe");
  }
}
