import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PendientesService } from '../../services/pendientes.service';
import { UtilitiesService } from '../../services/utilities.service';

declare var $;

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.css']
})
export class ListaPendientesComponent implements OnInit {
   isDisable = true;
   tipo: string;

   listaPendientes: Array<any>;
   pendientes = 0;
   pendiente;
   nombrePendiente;
   @ViewChild('tarea') tarea: ElementRef;

  constructor(private pendientesService: PendientesService,
    private utilities: UtilitiesService) { }

  ngOnInit() {
    this.getListaPendientes();
  }

  eliminarPendiente(pendiente) {
    this.tipo = 'eliminar';
    this.pendiente = pendiente;
    this.nombrePendiente = this.pendiente.nombre;

    $('#modalConfirmar').modal('show');
  }
  editarPendiente(pendiente) {
    this.pendiente = pendiente;
    this.nombrePendiente = this.pendiente.nombre;
    const input: HTMLInputElement = this.tarea.nativeElement as HTMLInputElement;
    input.focus();

  }
  async agregarPendiente( nombre: string ) {
    if ( nombre.trim() === '' ) {
      console.log('esta vacio');
    } else {


      if ( this.pendiente ) {
        this.tipo = 'editar';
      $('#modalConfirmar').modal('show');
      } else {
      this.tipo = 'crear';
      const listaNueva: any = await this.pendientesService.agregarPendiente({ nombre});
      if ( listaNueva ) {
        this.listaPendientes.push( listaNueva.lista );
        this.pendientes++;
        this.limpiarCampo();
      }
      }
    }
  }
  async getListaPendientes() {
    const data: any = await this.pendientesService.getListaPendientes();

    if ( data ) {
      this.listaPendientes = data.lista;
      this.pendientes = data.pendientes;
      console.log(this.listaPendientes);
    }
    // console.log(this.listaPendientes);
  }
  limpiarCampo() {
    const input: HTMLInputElement = this.tarea.nativeElement as HTMLInputElement;
    input.value = '';
  }
  limpiarInput() {
    this.pendiente = null;
    this.limpiarCampo();
  }

  async ok(event) {
    console.log(event);
    if ( event.ok && this.pendiente) {
      switch (event.tipo) {
        case 'editar':
        const input: HTMLInputElement = this.tarea.nativeElement as HTMLInputElement;
        const pendienteEditar = {
          nombre: input.value,
          id: this.pendiente._id,
          isTerminado: false
        };
        const dataEdit: any = await this.pendientesService.editarPendiente(pendienteEditar);
        this.remplazarOEliminar(dataEdit.lista, 1);
        this.limpiarInput();
          break;
        case 'eliminar':
        const dataDelete: any = await this.pendientesService.borrarPendiente(this.pendiente._id);
        this.pendientes--;
        this.remplazarOEliminar(dataDelete.lista, 2);
        this.limpiarInput();
          break;
        default:
          break;
      }

    }
  }

  remplazarOEliminar( pendiente , accion) {
    const index = this.listaPendientes.findIndex( p => p._id === pendiente._id);
    if ( accion === 1 ) {
      this.listaPendientes.splice(index, 1, pendiente);
    } else {
      this.listaPendientes.splice(index, 1);
    }

  }
}
