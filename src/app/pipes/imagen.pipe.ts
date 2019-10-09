import { Pipe, PipeTransform } from '@angular/core';
import { GET_IMAGEN } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    let url:string = `${GET_IMAGEN}`

    if(!img){
      return `${url}/usuarios/img`;
    }

    if(img.indexOf('https') >= 0){
      return img
    }


    let tipos:string[] = ['usuarios', 'medicos', 'hospitales'];

    if(tipo.includes(tipo)){
      return url = `${url}/${tipo}/${img}`;
    }else{
      console.log('Tipo de imagen no existe:', tipos.join(','))
      return `${url}/usuarios/img`;
    }

  }

}
