import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BirdListComponent } from './bird-list.component';
import { BirdDetailComponent } from './bird-detail.component';
import { BirdEditComponent } from './bird-edit.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    BirdListComponent,
    BirdDetailComponent,
    BirdEditComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
