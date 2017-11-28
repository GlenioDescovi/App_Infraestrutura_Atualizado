import { Component } from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, IonicPage, MenuController} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service"
import { HomePage } from "../home/home";
import {Usuario} from "../../model/Usuario-model";
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
export class LoginPage {

  loading: Loading;
  usuarioFormulario = new Usuario();
  usuario: Usuario = new Usuario();

  constructor( public navCtrl: NavController,
               public menu: MenuController,
               private nav: NavController,
               private auth: AuthServiceProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController) {
  }


  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }
  ionViewDidLeave() {
    // don't forget to return the swipe to normal, else all the pages won't be swiping to open menu
    this.menu.swipeEnable(true);
    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }



  // desse jeito se chama uma pagina
  public createAccount() {
    this.nav.push(HomePage);
  }

  public login(registerForm){
    this.showLoading();
    this.auth.login(this.usuarioFormulario).subscribe(retorno => {
      this.usuario = retorno.json();
      console.log(retorno.json());
      if (this.usuario.siape == this.usuarioFormulario.siape){

        this.nav.setRoot(HomePage);

      }else {
        this.showError("Siape ou senha incorretos");
        registerForm.resetForm();
      }
    }, error => {this.showError(error);});

    /*this.auth.login(this.usuario).subscribe(allowed => {
      if(allowed){
        this.nav.setRoot(HomePage);
      }else{
        this.showError("Siape ou senha incorretos");
        console.log("credenciais " + this.usuario.senha + " " + this.usuario.siape);
      }
    }, error => {this.showError(error);});*/
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
