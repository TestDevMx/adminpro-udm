import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalUploadService } from '../../services/service.index';

// import swal from 'sweetalert';
declare var swal:any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales:Hospital[] = [];
  totalRegistros:number = 0;
  cargando:boolean = false;




  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService:ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
        .subscribe(() => this.cargarHospitales());

  }


  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales()
        .subscribe((resp: any) =>{
          this.hospitales = resp.hospitales;
          this.totalRegistros = resp.total;
        });

    this.cargando = false;
  }

  buscarHospital(termino:string){

    this.cargando = true;
    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospitales(termino)
    .subscribe((resp:any) =>{
      this.hospitales = resp;
      this.totalRegistros = resp.length;
    });
    this.cargando = false;
  }
  
  // nuevoHospital(){
  //   swal("Ingrese el nombre del Hospital:", {
  //     content: "input",
  //   })
  //   .then((value) => {

  //     if(value.trim().length === 0){
  //       swal('Campo vacio', 'No se ingreso ningun Hospital', 'warning');
  //       return
  //     }

  //     this.crearHospital(value);

  //   });
  // }

  crearHospital(){

    swal("Ingrese el nombre del Hospital:", {
      content: "input",
    })
    .then((value) => {

      if(value.trim().length === 0){
        swal('Campo vacio', 'No se ingreso ningun Hospital', 'warning');
        return
      }

      this._hospitalService.crearHospital(value)
        .subscribe(resp => this.cargarHospitales()); 

    });

  }


  guardarHospital(hospital: Hospital){

    this._hospitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(hospital:Hospital){
    swal({
      title: 'Esta seguro?',
      text: `Esta a punto de borrar a: ${hospital.nombre}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then(borrar =>{

      if(borrar){

        this._hospitalService.borrarHospital(hospital._id)
            .subscribe((borrado) => {
              this.cargarHospitales();
            });

      }

    });


  }


  // actualizarHospital(nombre: string, _id:string){

  //   if(nombre.trim().length === 0){
  //     swal('Campo vacio', 'No se ingreso ningun Hospital', 'warning');
  //     this.cargarHospitales();
  //     return;
  //   }

   
  //   this._hospitalService.actualizarHospital(new Hospital(nombre, null, _id))
  //       .subscribe();

  // }

 

  mostrarModal(hospital: Hospital){
    let tipo:string = 'hospitales';
    this._modalUploadService.mostrarModal({tipo, id: hospital._id, titulo: `Cambiar imagen de: ${hospital.nombre}`});
  }

}
