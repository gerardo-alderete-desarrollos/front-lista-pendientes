import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var $;
@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  mensaje: Subject<string> = new Subject<string>();
  constructor() { }

  openToast(message) {
    this.mensaje.next(message);
    $('.toast').toast('show');
  }
  closeModal() {
    $('.modal').modal('hide');
  }
}
