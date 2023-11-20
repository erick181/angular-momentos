import { Component } from '@angular/core';

import { Moment } from 'src/app/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent {
btnText = 'Compartilhar!';


constructor(
private momentService : MomentService,
private messagesService : MessagesService,
private router : Router
){}

async createHandler(momentData : Moment){
  const formData = new FormData();
  formData.append("title", momentData.title);
  formData.append("description", momentData.description);

  if(momentData.image){
    formData.append('image', momentData.image);
  }
  
  await this.momentService.createMoment(formData).subscribe();

  this.messagesService.add("cadastro realizado com sucesso!");

this.router.navigate(['/']);

}






}
