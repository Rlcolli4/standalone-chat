import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChatContainerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
