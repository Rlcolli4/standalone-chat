import { Injectable } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  sendChat(newMessage: Message): Observable<Message> {
    console.log("Send Chat");
    return of(newMessage);
  }
}
