import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from "../../model/Usuario-model";
import { Observable } from "rxjs/Observable";
import {Http} from "@angular/http";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private url= "http://192.168.90.66:8080/";

  constructor(public http: Http) {

  }

  currentUser: Usuario;
  usuarioSessao: Usuario;

/*  public login(credenciais: Usuario) : Observable<Usuario>{
    if (credenciais.email === null || credenciais.senha === null){
      return Observable.throw("Por favor insira suas credenciais");
    }else{
      return Observable.create(observable => {

        //Neste ponto, faça um pedido para o seu backend para fazer um cheque real!
          //this.usuarioSessao= this.http.post(this.url+"usuario/login/" + credenciais);

        console.log("dadso do usuario no login: " + credenciais.siape);

        let acesso = (credenciais.senha === this.usuarioSessao.senha && credenciais.siape === this.usuarioSessao.siape);
        //this.currentUser = new Usuario('Glenio', 'glenio.descovi@gmail.com', 2);
        observable.next(acesso);
        observable.complete();
      });
    }
  }*/


  public login(credenciais: Usuario) {
    return this.http.post(this.url+'usuario/login',credenciais);
  }



  public getUsuarioInfo(): Usuario{
    return this.currentUser;
  }
  public logout(){
    return Observable.create(observable => {
      this.currentUser = null;
      observable.next(true);
      observable.complete();
    });
  }

}

