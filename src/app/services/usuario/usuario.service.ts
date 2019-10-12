import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { POST_ALTA_USUARIO, POST_LOGIN, POST_LOGIN_GOOGLE, PUT_ACTUALIZA_USUARIO, GET_USUARIO, GET_BUSQUEDA_USUARIO, DELETE_BORRAR_USUARIO } from '../../config/config';


// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivo: SubirArchivoService
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


actualizarUsuario(usuario:Usuario){

  return this.http.put(`${PUT_ACTUALIZA_USUARIO}/${usuario._id}?token=${this.token}`, usuario)
          .pipe(map((resp: any) =>{
            // this.usuario = resp.usuario;

            if(usuario._id = this.usuario._id){
              let usuarioDB: Usuario = resp.usuario;
              this.guardarStorage(usuarioDB._id, this.token, usuarioDB)
              swal('Usuario actualizado', usuario.nombre, 'success');
            }

            return true;
          }));

}

cambiarImagen(archivo:File, id:string){

  this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any)=>{
          this.usuario.img = resp.usuario.img;
          swal('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp =>{
        console.log(resp)
      })


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


cargarUsuarios(desde:number = 0){
  
  let url:string = `${GET_USUARIO}?desde=${desde}`;
  return this.http.get(url);

}

buscarUsuarios(termino:string){
  let url:string = `${GET_BUSQUEDA_USUARIO}/usuarios/${termino}`;
  return this.http.get(url)
          .pipe(map((resp:any) => resp.usuarios ));
}


borrarUsuario(id:string){

  let url:string = `${DELETE_BORRAR_USUARIO}/${id}?token=${this.token}`;

  return this.http.delete(url)
             .pipe(map(resp =>{
               swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
               return true;
             }));

}



}
