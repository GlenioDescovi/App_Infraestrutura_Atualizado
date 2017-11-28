import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Notificacao} from "../../model/Notificacao-model";
import {NotificacaoServiceProvider} from "../../providers/notificacao-service/notificacao-service";

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

  constructor(public auth: AuthServiceProvider,public notificacaoService: NotificacaoServiceProvider , public nav: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl : AlertController) {
  }
  public logout() {

    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

  buscaMinhasNotificacoes(): void{
    //depois de fazer o login com o tokene buscar o usuario que esta no web storage
    this.notificacaoService.getNotificacoes(this.auth.getUsuarioInfo()).subscribe(minhasNotificacoes => {this.notificacoes = minhasNotificacoes});
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificacoesPage');
  }
  ngOnInit(){

    this.buscaMinhasNotificacoes();

  }

}
