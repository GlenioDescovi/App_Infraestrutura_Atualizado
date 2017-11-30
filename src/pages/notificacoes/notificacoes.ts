import {Component, OnInit} from '@angular/core';
import {AlertController, App, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Notificacao} from "../../model/Notificacao-model";
import {NotificacaoServiceProvider} from "../../providers/notificacao-service/notificacao-service";
import {LoginPage} from "../login/login";
import {LocalNotifications} from "@ionic-native/local-notifications";

/**
 * Generated class for the NotificacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificacoes',
  templateUrl: 'notificacoes.html',
})
export class NotificacoesPage implements OnInit{

  loading: Loading;
  notificacao= new Notificacao();
  notificacoes: Notificacao[];

  constructor(public app: App, public auth: AuthServiceProvider,
              public notificacaoService: NotificacaoServiceProvider ,
              public nav: NavController, public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl : AlertController) {

  /*public localNotifications: LocalNotifications*/

  }
  public logout() {

    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }


  buscaMinhasNotificacoes(): void{
    //depois de fazer o login com o tokene buscar o usuario que esta no web storage
    this.notificacaoService.getNotificacoes(this.auth.getUsuarioInfo()).subscribe(minhasNotificacoes => {this.notificacoes = minhasNotificacoes});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacoesPage');
  }
  ngOnInit(){
    //this.auth.getUsuarioInfo();
    this.buscaMinhasNotificacoes();

  }

}
