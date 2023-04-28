import { Component, inject } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { Message } from '../models/message.model';
import { ChatService } from '../services/chat.service';
import { Observable, catchError, delay, map, of } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-chat-container',
  imports: [ChatComponent],
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent {
  chatService: ChatService = inject(ChatService);

  clientId: number = 12;
  clientName: string = "Robbie";
  messages: Message[] = [];

  onSendMessage(message: string) {
    //TO DO: use service and signal r to set this up...
    this.messages.push({
      clientId: this.clientId,
      clientName: this.clientName,
      messageId: (this.messages && this.messages.length > 0) ? this.messages[this.messages.length - 1].messageId + 1 : 1,
      message: message,
      sent: false
    });
    return this.chatService.sendChat(this.messages[this.messages.length - 1]).subscribe((value) => {
      for (let i = this.messages.length - 1; i >= 0; i--) {
        if (this.messages[i].messageId === value.messageId) {
          this.messages[i].sent = true;
          break;
        }
      }
    });
  }
}
