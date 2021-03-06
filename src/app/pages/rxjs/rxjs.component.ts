import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {


    this.subscription = this.regresaObservable()
    // .pipe(
    //   retry(2)
    // )
    .subscribe(
      numero => console.log('sub:', numero), // Next
      error => console.error('Error: ', error),
      () => console.log( 'Observador termino' ) // complete
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La pagina se va a cerrar.');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    // const obs =
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };


        observer.next( salida );

        // if ( contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2) {
        //   // clearInterval( intervalo );
        //   observer.error( 'Mensaje de error.' );
        // }

      }, 1000);

    })
    .pipe(
      map( resp => resp.valor ),
      filter( ( valor, index ) => {
        // console.log(valor, index);

        if ( (valor % 2) === 1) {
          return true;
        } else {
          return false;
        }

      })
    );

    // return obs;
  }
}
