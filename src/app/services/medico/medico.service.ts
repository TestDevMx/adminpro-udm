import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_MEDICO, GET_BUSQUEDA_COLLECCION, DELETE_BORRAR_MEDICO, POST_ALTA_MEDICO, PUT_ACTUALIZA_MEDICO } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  constructor(
    public http:HttpClient,
    public _usuarioService:UsuarioService
  ) { }


  cargarMedicos(){
    let url:string = `${GET_MEDICO}`;

    return this.http.get(url)
      .pipe(map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      }));
  }


  buscarMedicos(termino:string){

    let url:string = `${GET_BUSQUEDA_COLLECCION}/medicos/${termino}`;
    return this.http.get(url)
            .pipe(map( (resp: any) => {
              this.totalMedicos = resp.medicos.length;
              return resp.medicos;
            }));

  }

  borrarMedico(id: string){

    let url:string = `${DELETE_BORRAR_MEDICO}/${id}?token=${this._usuarioService.token}`;

    return this.http.delete(url)
          .pipe(map(resp => {
            swal('Médico borrado', 'Médico borrado correctamente', 'success');
            return resp;
          }));

  }


  guardarMedico(medico:Medico){
    
    if(medico._id){
      let url:string = `${PUT_ACTUALIZA_MEDICO}/${medico._id}?token=${this._usuarioService.token}`;

      return this.http.put(url, medico)
              .pipe(map((resp: any) => {
                swal('Médico actualizado', medico.nombre, 'success');
                return resp.medico;
              }));

    }else{

      let url:string = `${POST_ALTA_MEDICO}?token=${this._usuarioService.token}`;
  
      return this.http.post(url, medico)
          .pipe(map((resp:any) => {
            swal('Médico creado', medico.nombre, 'success');
            return resp.medico;
  
          }));
    }


  }


  cargarMedico(id:string){
    let url:string = `${GET_MEDICO}/${id}`;
    return this.http.get(url)
           .pipe(map(((resp:any) => resp.medico)));

  }



}
