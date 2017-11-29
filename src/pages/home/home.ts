import { Component, OnInit } from '@angular/core';
import {AlertController, App, Loading, LoadingController, NavController} from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service/auth-service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import 'rxjs/add/operator/map';
import { Predio } from "../../model/Predio-model";
import { ChamadoServiceProvider } from "../../providers/chamado-service/chamado-service";
import { Sala } from "../../model/Sala-model";
import { CategoriaDeServico } from "../../model/CategoriaDeServico-model";
import { Servico } from "../../model/Servico-model";
import { Chamado } from "../../model/Chamado-model";
import {LoginPage} from "../login/login";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public base64Image : string;
/*  username = '';
  email = '';*/

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

  constructor(public storage: Storage ,public app: App, public alertCtrl : AlertController,
              public imagePicker: ImagePicker,
              public nav: NavController,
              public auth: AuthServiceProvider,
              private camera: Camera, public chamadoService: ChamadoServiceProvider,  public loadingCtrl: LoadingController) {

   /* let info = this.auth.getUsuarioInfo();
    this.username = info['nome'];
    this.email = info['email'];*/

    this.getUsuario();

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

  ionViewDidLoad() {

    console.log('ionViewDidLoad TakePicture');
  }
  public logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot(LoginPage);
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

    const options : CameraOptions = {
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

   cadastraChamado(formulario, chamado: Chamado){

    this.chamado.categoriaDeServico = this.categoriaDeServico;
    this.chamado.servico = this.servico;
    this.chamado.predio = this.predio;
    this.chamado.sala = this.sala;
    this.chamado.foto = this.base64Image;
    this.chamado.usuario = this.auth.getUsuarioInfo();

     this.showLoading();
     this.chamadoService.realizaChamado(this.chamado).subscribe(retorno => {
       if(retorno.json()){
         formulario.resetForm();
         this.showMensagem("Chamado solicitado.", "Sucesso!");
       }else{

         this.showMensagem("Chamado não solicitado.", "ops!");
       }
     }, error => {this.showMensagem("Chamado não solicitado.", "ops!");});
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

  getUsuario(){
    this.auth.getUsuarioInfo();
    console.log("usuario service: " + this.auth.getUsuarioInfo().nomeCompleto);
  }



  ngOnInit(){
    this.buscarCategoriaServico();
    this.buscarPredios();
  }
}
