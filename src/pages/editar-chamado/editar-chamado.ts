import {Component, Injectable, OnInit} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Chamado} from "../../model/Chamado-model";
import {Observable} from "rxjs/Observable";
import { MeusChamadosPage } from "../meus-chamados/meus-chamados";
import {Sala} from "../../model/Sala-model";
import {Predio} from "../../model/Predio-model";
import {Servico} from "../../model/Servico-model";
import {CategoriaDeServico} from "../../model/CategoriaDeServico-model";
import {ChamadoServiceProvider} from "../../providers/chamado-service/chamado-service";
import {ImagePicker} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";
import 'rxjs/add/operator/map';

/**
 * Generated class for the EditarChamadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-chamado',
  templateUrl: 'editar-chamado.html',
})
export class EditarChamadoPage implements OnInit{

  loading: Loading;
  categoriaDeServicos: CategoriaDeServico[];
  servicos: Servico[];
  predios: Predio[];
  salas: Sala[];
  chamados: Chamado[];

  categoriaDeServico = new CategoriaDeServico();
  servico = new Servico();
  predio = new Predio();
  sala = new Sala();
  chamado = new Chamado();
  public base64Image : string;


  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthServiceProvider,
              public alertCtrl : AlertController,
              public imagePicker: ImagePicker,
              private camera: Camera, public chamadoService: ChamadoServiceProvider,  public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarChamadoPage');
  }

  editar(){

    this.chamado= this.navParams.get("parametroReferenciaEnviado");
    console.log(this.chamado);
  }


  buscarCategoriaServico(): void {

    this.chamadoService.getCategoriaDeServico().subscribe(categoriaDeServico => {this.categoriaDeServicos= categoriaDeServico});
  }

  buscarServicos(): void {

    this.chamadoService.getServico(this.categoriaDeServico).subscribe(servico => {this.servicos = servico});

  }

  buscarPredios(): void {

    this.chamadoService.getPredios().subscribe(predio => {this.predios= predio});
  }

  buscarSalas(): void {

    this.chamadoService.getSalas(this.predio).subscribe(sala => { this.salas = sala });
  }
  public logout() {

    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }

  takePhoto() {

    const options : CameraOptions = {
      quality: 60, // picture quality
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      console.log("String da imagem"+ this.base64Image);
      //this.photos.push(this.base64Image); faz um array de fotos
      //this.photos.reverse();
    }, (err) => {
      console.log(err);
    });

  }

  openGallery() {

    const options: CameraOptions = {
      quality: 60, // picture quality
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.photos.push(this.base64Image); faz um array de fotos
      //this.photos.reverse();
    }, (err) => {
      console.log(err);
    });
  }
  enviarForm(formulario, chamado: Chamado){

    this.chamado.categoriaDeServico = this.categoriaDeServico;
    this.chamado.servico = this.servico;
    this.chamado.predio = this.predio;
    this.chamado.sala = this.sala;
    this.chamado.foto = this.base64Image;
    this.chamado.usuario = this.auth.getUsuarioInfo();

    this.showLoading();
    this.chamadoService.editarChamado(this.chamado).subscribe(retorno => {
      if(retorno){
        formulario.resetForm();
        this.nav.setRoot(MeusChamadosPage);
        this.showMensagem("Chamado editado.", "Sucesso!");
      }else{

        this.showMensagem("Chamado não editado.", "ops!");
      }
   }, error => {this.showMensagem("Chamado não editado.", "ops!");});
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

  ngOnInit()
  {
    this.editar();
    this.buscarCategoriaServico();
    this.buscarPredios();
  }

}
