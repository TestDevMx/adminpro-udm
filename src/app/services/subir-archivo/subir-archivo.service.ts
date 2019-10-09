import { Injectable } from '@angular/core';
import { PUT_SUBIR_IMAGEN } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(
    
  ) { }

  subirArchivo(archivo: File, tipo: string, id: string) {


    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve(JSON.parse(xhr.response));
          }else{
            console.log('Fallo al subir imagen');
            resolve(JSON.parse(xhr.response));
          }
        }

      };

      let url = `${PUT_SUBIR_IMAGEN}/${tipo}/${id}`;      

      xhr.open('PUT',url, true);
      xhr.send(formData);


    });

  }

}
