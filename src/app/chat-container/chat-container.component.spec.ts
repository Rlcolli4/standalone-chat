import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContainerComponent } from './chat-container.component';
import { ChatComponent } from '../chat/chat.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { of } from 'rxjs';

describe('ChatContainerComponent', () => {
  let component: ChatContainerComponent;
  let fixture: ComponentFixture<ChatContainerComponent>;
  let service: ChatService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, ChatContainerComponent, ChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatContainerComponent);
    component = fixture.componentInstance;
    service = component.chatService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('onSendMessage', () => {
    it("should push to the array and then return the value from the service, no previous messages", () => {
      spyOn(service, "sendChat").and.returnValue(of({
        clientId: component.clientId,
        clientName: component.clientName,
        messageId: 1,
        message: "Any Message Sir",
        sent: false
      }));
      component.onSendMessage("Any Message Sir");
      expect(service.sendChat).toHaveBeenCalled();
      expect(component.messages.length).toEqual(1);
      expect(component.messages[0]).toEqual({
        clientId: component.clientId,
        clientName: component.clientName,
        messageId: 1,
        message: "Any Message Sir",
        sent: true
      });
    });

    it("should push to the array and then return the value from the service, no previous messages", () => {
      spyOn(service, "sendChat").and.returnValue(of({
        clientId: component.clientId,
        clientName: component.clientName,
        messageId: 32,
        message: "Any Message Sir",
        sent: false
      }));
      component.messages = [
        {
          clientId: 19,
          clientName: "Jeremy",
          messageId: 31,
          message: "Hey",
          sent: true
        }
      ];
      component.onSendMessage("Any Message Sir");
      expect(service.sendChat).toHaveBeenCalled();
      expect(component.messages.length).toEqual(2);
      expect(component.messages[1]).toEqual({
        clientId: component.clientId,
        clientName: component.clientName,
        messageId: 32,
        message: "Any Message Sir",
        sent: true
      });
    });
  });
});
