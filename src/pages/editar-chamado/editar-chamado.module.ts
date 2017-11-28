import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicPageModule} from 'ionic-angular';
import { EditarChamadoPage } from './editar-chamado';
import {ChamadoServiceProvider} from "../../providers/chamado-service/chamado-service";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {ImagePicker} from "@ionic-native/image-picker";
import {SplashScreen} from "@ionic-native/splash-screen";
import {NotificacoesPage} from "../notificacoes/notificacoes";
import {MeusChamadosPage} from "../meus-chamados/meus-chamados";
import {HomePage} from "../home/home";
import {Infraestrutura} from "../../app/app.component";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import { Camera } from "@ionic-native/camera";

@NgModule({
  declarations: [
    EditarChamadoPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    IonicPageModule.forChild(EditarChamadoPage),
  ],bootstrap: [IonicApp],
  entryComponents: [
    Infraestrutura,
    HomePage,
    MeusChamadosPage,
    EditarChamadoPage,
    NotificacoesPage,
    EditarChamadoPage,
  ],
  providers: [
    SplashScreen,
    Camera,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider, ChamadoServiceProvider, EditarChamadoPage,
  ]
})
export class EditarChamadoPageModule {}
