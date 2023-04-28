import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, ChatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("onFormSubmit", () => {
    it("should prevent default and stop prop, but not emit becuase form is invalid", () => {
      let event: any = {
        preventDefault: () => { },
        stopPropagation: () => { }
      };

      spyOn(event, "preventDefault");
      spyOn(event, "stopPropagation");
      spyOn(component, "sendMessage");

      component.formGroup.get("messageval")?.setValue(null);
      component.formGroup.get("messageval")?.markAsDirty();
      component.formGroup.get("messageval")?.markAsTouched();
      component.onFormSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.sendMessage).not.toHaveBeenCalled();
    });
    it("should prevent default and stop prop, and emit becuase form is valid", () => {
      let event: any = {
        preventDefault: () => { },
        stopPropagation: () => { }
      };

      spyOn(event, "preventDefault");
      spyOn(event, "stopPropagation");
      spyOn(component.sendMessage, "emit");

      component.formGroup.get("messageval")?.setValue("Your Message Here");
      component.formGroup.get("messageval")?.markAsDirty();
      component.formGroup.get("messageval")?.markAsTouched();
      component.onFormSubmit(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(component.sendMessage.emit).toHaveBeenCalledWith("Your Message Here");
    });
  });

});
