import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UtilitiesService } from './utilities.service';

const base = environment.urls.baseUrl;
const pendientes = environment.urls.pendientes;
@Injectable({
  providedIn: 'root'
})
export class PendientesService {

  constructor(private http: HttpClient,
    private utilities: UtilitiesService) { }

  getListaPendientes() {
    return new Promise( (res, rej) => {
      this.http.get( base + pendientes)
        .pipe(

        )
        .subscribe(
          data => {
            res(data);
          },
          error => {
            console.log({error});
            rej(error);
          });
    });
  }
  agregarPendiente(pendiente) {
    return new Promise( (res, rej) => {
      this.http.post( base + pendientes, pendiente )
        .pipe(

        )
        .subscribe(
          (data: any) => {
            console.log({data});
            this.utilities.openToast(`${data.mensaje}`);
            res(data);
          },
          error => {
            console.log({error});
            this.utilities.openToast(error.mensaje);
            rej(error);
          });
    });
  }
  editarPendiente( pendiente ) {
    return new Promise( (res, rej) => {
      this.http.put( base + pendientes + pendiente.id, pendiente )
        .pipe(

        )
        .subscribe(
          (data: any) => {
            this.utilities.closeModal();
            this.utilities.openToast(`${data.mensaje}`);
            res(data);
          },
          error => {
            console.log({error});
            this.utilities.closeModal();
            this.utilities.openToast(error.mensaje);
            rej(error);
          });
    });
  }
  borrarPendiente( id ) {
    return new Promise( (res, rej) => {
      this.http.delete( base + pendientes + id )
        .pipe(

        )
        .subscribe(
          (data: any) => {
            this.utilities.closeModal();
            this.utilities.openToast(`${data.mensaje}`);
            res(data);
          },
          error => {
            console.log({error});
            this.utilities.closeModal();
            this.utilities.openToast(error.mensaje);
            rej(error);
          });
    });
  }
}
