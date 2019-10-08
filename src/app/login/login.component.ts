import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor( 
    public router: Router,
    public _usuarioService: UsuarioService,
    public _ngZone: NgZone
  ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () =>{

      this.auth2 = gapi.auth2.init({
        clien_id: '1016611836098-o7e04ufb9fnv083bd32jj58fu2truv30.apps.googleusercontent.com',
        cookiepolicity: 'single_host_origin',
        scope: 'profile email'
      });


      this.attachSignIn(document.getElementById('btnGoogle'));



    });

  }

  //  // this._usuarioService.loginGoogle(token)
      //     .subscribe(() => this.router.navigate(['/dashboard']) );

      // let profile = googleUser.getBasicProfile();
          // console.log(token);

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      let token = googleUser.getAuthResponse().id_token;
    
          /**
           * ! Versión usando window.location (vanilla javascript - código comentado)
            
              this._usuarioService.loginGoogle(token)
              .subscribe(() => window.location.href = '#/dashboard' );

           */
          // this._usuarioService.loginGoogle(token)
          // .subscribe(() => this.router.navigate(['/dashboard']) );
           
          // * Version usando router.navigate con NgZone
          this._usuarioService.loginGoogle(token)
          .subscribe(() => this._ngZone.run(() => {
            
              this.router.navigate(['/dashboard'])
              this.auth2.disconnect();
            }) );

    });

  }


  ingresar(forma: NgForm) {

    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.correo,
      forma.value.password
    );

    this._usuarioService.login(usuario,forma.value.recuerdame)
        .subscribe(correcto => this.router.navigate(['/dashboard']));

    console.log(forma.valid);
    console.log(forma.value);
    // console.log('ingresando')
    // this.router.navigate([ '/dashboard' ]);
  }



}
