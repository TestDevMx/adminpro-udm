import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild,  } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  // @Input los datos vienen del padre hacia el hijo
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;
  // @Output los datos van del hijo al padre
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda ', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  ngOnInit() {
    // console.log('Leyenda ', this.leyenda);
    // console.log('Progreso', this.progreso);
  }

  onChanges( newValue: number ) {

    // const elemHTML: any = document.getElementsByName('progreso')[0];

    // const elemHTML = this.txtProgress.nativeElement;

    // console.log(elemHTML.value);

    if ( newValue > 100 ) {
      this.progreso = 100;
    } else if ( newValue < 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );


  }

  cambiarValor(valor: number) {
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    this.progreso += valor;

    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }
}
