import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  mensaje = '';
  constructor(private utilities: UtilitiesService) { }

  ngOnInit() {
    this.utilities.mensaje.subscribe(
      data => {
        this.mensaje = data;
      });
  }

}
