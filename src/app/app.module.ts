import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TopBarComponent} from './top-bar/top-bar.component';
import {BrandsComponent} from './brands/brands.component';
import {ModelsComponent} from './models/models.component';
import {TrimsComponent} from './trims/trims.component';
import {TrimComponent} from './trim/trim.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    BrandsComponent,
    ModelsComponent,
    TrimsComponent,
    TrimComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSortModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
