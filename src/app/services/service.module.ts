import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService, 
         LoginGuardGuard,
         AdminGuard, 
         SubirArchivoService, 
         ModalUploadService,
         HospitalService,
         MedicoService, VerificaTokenGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SidebarService, 
    SharedService, 
    UsuarioService, 
    LoginGuardGuard, 
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService, 
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
