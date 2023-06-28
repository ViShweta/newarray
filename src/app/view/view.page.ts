import { Component, OnInit } from '@angular/core';
import { LocalService } from '../localstorage.service';
import { ActionSheetController, AlertController, ItemReorderEventDetail } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  savesubject:any;
  data:any;
  constructor(
    private storage:LocalService,
    private actionSheetCtrl: ActionSheetController,
    private route:Router,
    private alertCtrl:AlertController,
  ) { }

  ionViewWillEnter (){
    this.Viewall();
    
  }


  onRenderItems(event :CustomEvent<ItemReorderEventDetail>) {  
    console.log('Moving item from: ',this.savesubject);  
    const draggedItem = this.savesubject.splice(event.detail.from, 1)[0];  
    this.savesubject.splice(event.detail.to, 0, draggedItem);   
    event.detail.complete(true);  
    this.storage.saveData('addUser', JSON.stringify(this.savesubject));
  }  

  ngOnInit() {
  }

  Viewall(){
    this.savesubject = JSON.parse(this.storage.getData('addUser') as string);
    console.log('data:', this.savesubject);
  }

  async presentActionSheet(data:any,index:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteuser(index);
            console.log('user:',index)
          }
        },
        {
          text: 'Edit',
          
          handler:() =>{
            this.route.navigate(['/home'], {state: data});
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }


  async deleteuser(user: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.savesubject.splice(user, 1);
            this.storage.saveData('addUser', JSON.stringify(this.savesubject));
          },
        },
      ],
    });
    await alert.present();
  }
  
}


