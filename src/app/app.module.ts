import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaPendientesComponent } from './components/lista-pendientes/lista-pendientes.component';
import { ModalConfirmarComponent } from './components/shared/modal-confirmar/modal-confirmar.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './components/shared/toast/toast.component';


@NgModule({
  declarations: [
    AppComponent,
    ListaPendientesComponent,
    ModalConfirmarComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
