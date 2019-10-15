import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, 
         SidebarService, 
         SharedService, 
         UsuarioService, 
         LoginGuardGuard, 
         SubirArchivoService, 
         ModalUploadService,
         HospitalService,
         MedicoService } from './service.index';
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
    SubirArchivoService, 
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
