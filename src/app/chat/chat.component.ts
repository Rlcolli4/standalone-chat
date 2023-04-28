import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message } from '../models/message.model';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input()
  clientId: number = -1;
  @Input()
  messages: Message[] = [];
  @Output()
  sendMessage: EventEmitter<string> = new EventEmitter<string>();

  formGroup: FormGroup = new FormGroup({
    messageval: new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(256)])
  });

  onFormSubmit(values: any) {
    values.preventDefault();
    values.stopPropagation();
    if (this.formGroup.valid) {
      this.sendMessage.emit(this.formGroup.get("messageval")?.value);
    }
  }
}
