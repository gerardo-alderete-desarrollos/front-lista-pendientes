import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-confirmar',
  templateUrl: './modal-confirmar.component.html',
  styleUrls: ['./modal-confirmar.component.css']
})
export class ModalConfirmarComponent implements OnInit {
  @Input() tipo;
  @Input() nombre;
  @Output() okResponse = new EventEmitter;
  constructor() { }

  ngOnInit() {
  }

  okEvent() {
    this.okResponse.emit({ok: true, tipo: this.tipo});
  }

}
