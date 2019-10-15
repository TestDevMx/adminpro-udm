import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { GET_HOSPITAL, GET_BUSQUEDA_COLLECCION, DELETE_BORRAR_HOSPITAL, PUT_ACTUALIZA_HOSPITAL } from 'src/app/config/config';

import { map } from 'rxjs/operators';
import { POST_ALTA_HOSPITAL } from '../../config/config';
import swal from 'sweetalert';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;


  constructor(
    private http: HttpClient,
    public _usuarioService: UsuarioService,
  ) {
    this.token = _usuarioService.token;
  }




  cargarHospitales() {
    let url: string = `${GET_HOSPITAL}`;
    return this.http.get(url);
  }

  obtenerHospital(id:string){
    let url: string = `${GET_HOSPITAL}/${id}`;
    return this.http.get(url)
           .pipe(map((resp:any)=> resp.hospital));
  }


  buscarHospitales(termino: string) {

    let url: string = `${GET_BUSQUEDA_COLLECCION}/hospitales/${termino}`;
    return this.http.get(url).pipe(map((resp: any) => resp.hospitales));

  }


  crearHospital(nombre: string) {

    let url: string = `${POST_ALTA_HOSPITAL}?token=${this.token}`;
    // return this.http.post(url, new Hospital(nombre))
    return this.http.post(url, {nombre})
      .pipe(map((resp: any) => {
        swal('Hospital creado', nombre, 'success');
        return resp.hospital;
      }));
  }

  borrarHospital(id: string) {

    let url: string = `${DELETE_BORRAR_HOSPITAL}/${id}?token=${this.token}`;

    return this.http.delete(url)
      .pipe(map(resp => {
        swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
        return true;
      }));

  }


  actualizarHospital(hospital: Hospital) {

    return this.http.put(`${PUT_ACTUALIZA_HOSPITAL}/${hospital._id}?token=${this.token}`, hospital)
      .pipe(map((resp: any) => {
        swal('Hospital actualizado', hospital.nombre, 'success');
        return  resp.hospital;
      }));

  }



}
