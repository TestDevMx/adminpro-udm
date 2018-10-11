import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {

    this.contarTres()
          .then(msg => console.log('Termino promesa', msg))
          .catch(error => console.error('error en promesa', error));

  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve( true );
          // reject('Prueba de error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }



}
