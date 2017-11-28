import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicPageModule} from 'ionic-angular';
import { MeusChamadosPage } from './meus-chamados';
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {Infraestrutura} from "../../app/app.component";
import {HomePage} from "../home/home";
import {EditarChamadoPage} from "../editar-chamado/editar-chamado";
import {NotificacoesPage} from "../notificacoes/notificacoes";
import {SplashScreen} from "@ionic-native/splash-screen";
import {ImagePicker} from "@ionic-native/image-picker";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ChamadoServiceProvider} from "../../providers/chamado-service/chamado-service";
import { Camera } from "@ionic-native/camera";



@NgModule({
  declarations: [
    MeusChamadosPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    IonicPageModule.forChild(MeusChamadosPage),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Infraestrutura,
    HomePage,
    MeusChamadosPage,
    EditarChamadoPage,
    NotificacoesPage,

  ],
  providers: [
    SplashScreen,
    Camera,
    ImagePicker,
    {provide:ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider, ChamadoServiceProvider, EditarChamadoPage,
  ]
})
export class MeusChamadosPageModule {}
