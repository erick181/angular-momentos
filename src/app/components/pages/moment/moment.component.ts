import { Component } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';

import { FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';
import { Comment } from 'src/app/Comment';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent {

moment?: Moment;
baseApiUrl = environment.baseApiUrl;

faTimes = faTimes;
faEdit = faEdit;

commentForm!: FormGroup;


constructor(
  private momentService: MomentService,
  private route: ActivatedRoute,
  private messagesService: MessagesService,
  private router: Router,
  private commentService: CommentService
   ){}

ngOnInit() : void{

const id = Number(this.route.snapshot.paramMap.get('id'));

this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));


this.commentForm = new FormGroup({
text: new FormControl('',[Validators.required]),
username: new FormControl('',[Validators.required])

});


}

get text(){
  return this.commentForm.get('text')!;

}

get username(){
return this.commentForm.get('username')!;
}

async removeHandler(id : number){
 await this.momentService.removeMoment(id).subscribe();

 this.messagesService.add("excluido com sucesso");
 this.router.navigate(['/']);

}

async onSubmit(formDrirective: FormGroupDirective){
  if(this.commentForm.invalid){
    return;
  }

const commentData: Comment = this.commentForm.value;
commentData.momentId = Number(this.moment!.id);
await this.commentService.createComment(commentData)
.subscribe((item) => this.moment!.comments!.push(item.data));

this.messagesService.add('comentario inserido com sucesso');
this.commentForm.reset();
formDrirective.resetForm();

}

}
