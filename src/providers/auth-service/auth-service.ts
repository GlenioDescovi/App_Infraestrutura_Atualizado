import {Injectable, OnInit} from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from "../../model/Usuario-model";
import { Observable } from "rxjs/Observable";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { App } from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

@Injectable()
export class AuthServiceProvider implements OnInit{
  ngOnInit(): void {


  }

  //private  url="http://192.168.90.103:9080/infraestruturaBackend/";
  private  url="http://localhost:8181/";
  usuarioGet= new Usuario();


  constructor(public app: App, public storage: Storage, public http: Http) {

  }

  public login(credenciais: Usuario) {
    return this.http.post(this.url+'usuario/login',credenciais);
  }

  public getUsuarioInfo(): Usuario {

    this.storage.get('usuarioLogado').then((retorno) => {
      this.usuarioGet = retorno;
    });

    return this.usuarioGet;

  }
  public logout(){

      this.storage.remove('usuarioLogado');
      this.storage.clear();
      this.storage.set('usuarioLogado', 'null');


  }

}

