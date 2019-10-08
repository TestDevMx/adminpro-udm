import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { POST_ALTA_USUARIO, POST_LOGIN, POST_LOGIN_GOOGLE } from '../../config/config';


// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) { 
    this.cargarStorage();
    console.log('Servicio de usuario listo')

  }

crearUsuario(usuario: Usuario){

  return this.http.post(POST_ALTA_USUARIO, usuario)
          .pipe(map((resp:any) => {
            swal('Usuario creado', usuario.email, 'success')
            return resp.usuario;
          }));
}


login(usuario: Usuario, recordar: boolean = false){

  if(recordar){
    localStorage.setItem('email', usuario.email);
  }else{
    localStorage.removeItem('email');
  }

  return this.http.post(POST_LOGIN, usuario)
        .pipe(map( (resp: any) => {

          // localStorage.setItem('id', resp.id);
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
          this.guardarStorage(resp.id, resp.token, resp.usuario)
          return true;
          
        }));

}

loginGoogle(token: string){

  return this.http.post(POST_LOGIN_GOOGLE, {token})
        .pipe(map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          
          return true;
        }));


}

logout(){
  this.usuario = null;
  this.token = '';

  localStorage.removeItem('token');
  localStorage.removeItem('usuario');

  this.router.navigate(['/login']);
}


guardarStorage(id:string, token: string, usuario: Usuario){
  localStorage.setItem('id', id);
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));

  this.usuario = usuario;
  this.token = token;

}

estaLogueado(){
  return (this.token.length > 5) ? true: false;
}

cargarStorage(){

  if(localStorage.getItem('token')){
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }else{
    this.token = '';
    this.usuario = null;
  }

}

}
