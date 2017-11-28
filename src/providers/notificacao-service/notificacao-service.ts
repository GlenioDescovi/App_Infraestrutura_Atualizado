import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Usuario} from "../../model/Usuario-model";
import {Notificacao} from "../../model/Notificacao-model";

/*
  Generated class for the NotificacaoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotificacaoServiceProvider {

  private url= "http://192.168.90.66:8080/";

  constructor(public http: Http) {
    console.log('Hello NotificacaoServiceProvider Provider');
  }

  getNotificacoes(usuario: Usuario): Observable<Notificacao[]>{
    return this.http.get(this.url+"notificacoes/notificacaoUsuario/" + usuario.idUsuario).map(response => response.json() as Notificacao).catch(error => Observable.throw(error));
  }


}
