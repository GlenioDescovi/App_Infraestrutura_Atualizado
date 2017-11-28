import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Chamado } from "../../model/Chamado-model";
import { ChamadoServiceProvider } from "../../providers/chamado-service/chamado-service";
import "rxjs/add/operator/catch";
import { Sala } from "../../model/Sala-model";
import { Predio } from "../../model/Predio-model";
import { Servico } from "../../model/Servico-model";
import { CategoriaDeServico } from "../../model/CategoriaDeServico-model";
import {EditarChamadoPage} from "../editar-chamado/editar-chamado";

/**
 * Generated class for the MeusChamadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-chamados',
  templateUrl: 'meus-chamados.html',
})
export class MeusChamadosPage implements OnInit{

  chamados: Chamado[];
  categoriaDeServico = new CategoriaDeServico();
  servico = new Servico();
  predio = new Predio();
  sala = new Sala();
  chamado = new Chamado();
  loading: Loading;


  constructor(public loadingCtrl: LoadingController, public alertCtrl : AlertController, public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public chamadoService: ChamadoServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MeusChamadosPage');
  }

  buscaMeusChamados(): void{

    this.chamadoService.getMeusChamados(this.auth.getUsuarioInfo()).subscribe(meusChamados => {this.chamados = meusChamados});

  }
  editando(chamado){
    chamado.usuario =  this.auth.getUsuarioInfo();
    this.nav.push(EditarChamadoPage, {
      parametroReferenciaEnviado: chamado});
  }

  excluir(chamado: Chamado){

    this.showLoading();
    this.chamadoService.deletaChamado(chamado).subscribe(retorno => {
      if(retorno){
        this.nav.setRoot(MeusChamadosPage);
        this.showMensagem("Chamado excluido.", "Sucesso!");
      }else{
        this.showMensagem("Chamado não excluido.", "Ops!");
      }
    }, error => {this.showMensagem("Chamado não excluido.", "Ops!");});
  }

  showPrompt(chamado) {
    let prompt = this.alertCtrl.create({
      title: 'Opções',
      message: "O que você deseja?",
      buttons: [
        {
          text: 'Excluir',
          handler: data => {
            this.excluir(chamado);
          }
        },
        {
          text: 'Editar',
          handler: data => {
            this.editando(chamado);
          }
        }
      ]
    });
    prompt.present();
  }

  showMensagem(text, title) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espere um momento...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  ngOnInit(){
    this.buscaMeusChamados();
  }

}
