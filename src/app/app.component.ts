import { Component, ViewChild } from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { MeusChamadosPage } from "../pages/meus-chamados/meus-chamados";
import { EditarChamadoPage } from "../pages/editar-chamado/editar-chamado";
import {NotificacoesPage} from "../pages/notificacoes/notificacoes";

@Component({
  templateUrl: 'app.html'
})
export class Infraestrutura {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Realizar Chamado', component: HomePage },
      { title: 'Meus Chamados', component: MeusChamadosPage },
      { title: 'Notificações', component: NotificacoesPage }


    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
