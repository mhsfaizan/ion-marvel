import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { ServicesService } from '../fetch-service/services.service';
import { Subscription } from 'rxjs';
import { NavController, ModalController } from '@ionic/angular';
import { MyModalComponent } from '../my-modal/my-modal.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {
  constructor(private _service: ServicesService, private _nav: NavController, private modalController: ModalController) { }
  characters: any;
  isLoad = false;
  message: string;
  myUnsub: Subscription;
  ngOnInit() {
    this.myUnsub = this.getData();
  }
  toFilter() {
    this._nav.navigateRoot(["/filter"]);
  }
  getData(offset = 0) {
    return this._service.getData(offset).subscribe((resp: any) => {
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

  getNextPrev(isNext = true) {
    this.isLoad = false;
    if (isNext) {
      this.myUnsub = this.getData(this.characters.offset + this.characters.limit);
    } else {
      if (this.characters.offset) {
        console.log("its working");
        this.myUnsub = this.getData(this.characters.offset - this.characters.limit);
      }
    }
  }

  ngOnDestroy() {
    this.myUnsub.unsubscribe();
    console.log("unsubscribe");
  }
}
