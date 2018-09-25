import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progresoAzul: number = 50;
  progresoVerde: number = 20;

  constructor() { }

  ngOnInit() {
  }


  // actualizar( event: number) {
  //   console.log('Evento:', event);
  // }

}
