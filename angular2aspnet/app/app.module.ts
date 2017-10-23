import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { HomeComponent } from './Components/home.component';
import { BookComponent } from './Components/book.component';

import { BookService } from './Service/book.service'

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule],
    declarations: [AppComponent, HomeComponent, BookComponent],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, BookService],
    bootstrap: [AppComponent]
})

export class AppModule { }