import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { Infraestrutura } from './app.component';
import { HomePage } from "../pages/home/home";
import { Camera } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { ChamadoServiceProvider } from '../providers/chamado-service/chamado-service';
import { HttpModule } from "@angular/http";
import { MeusChamadosPage } from "../pages/meus-chamados/meus-chamados";
import { EditarChamadoPage } from "../pages/editar-chamado/editar-chamado";
import {NotificacoesPage} from "../pages/notificacoes/notificacoes";
import { NotificacaoServiceProvider } from '../providers/notificacao-service/notificacao-service';

@NgModule({
  declarations: [
    Infraestrutura,
    HomePage,
    MeusChamadosPage,
    EditarChamadoPage,
    NotificacoesPage,

  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(Infraestrutura),
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
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    {provide:ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider, ChamadoServiceProvider, EditarChamadoPage,
    NotificacaoServiceProvider,
  ]
})
export class AppModule {}
