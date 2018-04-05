import {Component, OnInit} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, IonicPage, MenuController} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service"
import { HomePage } from "../home/home";
import {Usuario} from "../../model/Usuario-model";
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit{
  ngOnInit(): void {
  }

  loading: Loading;
  usuarioFormulario = new Usuario();
  usuario: Usuario = new Usuario();

  constructor(public storage: Storage, public navCtrl: NavController,
               public menu: MenuController,
               private nav: NavController,
               private auth: AuthServiceProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController) {
  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }
  ionViewDidLeave() {

    this.menu.swipeEnable(true);

  }

  // desse jeito se chama uma pagina
  public createAccount() {
    this.nav.push(HomePage);
  }

  public login(registerForm){
    this.showLoading();
    this.auth.login(this.usuarioFormulario).subscribe(retorno => {
      this.usuario = retorno.json();
      if (this.usuario.siape == this.usuarioFormulario.siape){

        this.storage.remove('usuarioLogado');
        this.storage.ready().then(() => {
          this.storage.set('usuarioLogado', this.usuario);
        });

        this.nav.setRoot(HomePage);

      }else {
        this.showError("Siape ou senha incorretos");
        registerForm.resetForm();
      }
    }, error => {this.showError(error);});

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um momento...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Ops!',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  getUsuario(){
    this.auth.getUsuarioInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
