import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService
  ) {

  }

  canActivate(): Promise<boolean> | boolean {

    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));

    let expirado = this.expirado(payload.exp)

    if(expirado){
      this._usuarioService.logout();
      return false;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp:number): Promise<boolean>{

    return new Promise((resolve, rejecr) =>{

      let tokenExp = new Date(fechaExp * 1000);
      let ahora = new Date();

      ahora.setTime(ahora.getTime() + (1 * 60 * 60 *1000 ));

      // console.log(tokenExp)
      // console.log(ahora)

      if(tokenExp.getTime() > ahora.getTime()){
        resolve(true);
      }else{
        this._usuarioService.renuevaToken()
            .subscribe(() => {
              resolve(true);
            }, () => {
              this._usuarioService.logout();
              reject(false);
            });
      }
    });

  }

  expirado(fechaExp: number) {
    let ahora = new Date().getTime() / 1000;

    if (fechaExp < ahora) {
      return true;

    } else {
      return false;
    }

  }

}
