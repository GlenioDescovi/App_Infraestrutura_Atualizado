import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from "../../model/Usuario-model";
import { Observable } from "rxjs/Observable";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

   constructor() {

  }

  currentUser: Usuario;

  public login(credenciais){
    if (credenciais.email === null || credenciais.senha === null){
      return Observable.throw("Por favor insira suas credenciais");
    }else{
      return Observable.create(observable => {

        //Neste ponto, faça um pedido para o seu backend para fazer um cheque real!
        console.log("credenciais do auth service " + credenciais.senha + credenciais.email)
        let acesso = (credenciais.senha === "1234" && credenciais.email === "g");
        this.currentUser = new Usuario('Glenio', 'glenio.descovi@gmail.com', 2);
        observable.next(acesso);
        observable.complete();
      });
    }
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

