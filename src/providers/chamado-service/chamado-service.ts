import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {Predio} from "../../model/Predio-model";
import "rxjs/add/operator/catch";
import {Sala} from "../../model/Sala-model";
import {CategoriaDeServico} from "../../model/CategoriaDeServico-model";
import {Servico} from "../../model/Servico-model";
import {Chamado} from "../../model/Chamado-model";
import {HomePage} from "../../pages/home/home";
import {NavController} from "ionic-angular";
import {Usuario} from "../../model/Usuario-model";


/*
  Generated class for the ChamadoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChamadoServiceProvider {

  //private url= "http://192.168.83.187:8181/backend/";
  //private url= "http://192.168.15.8:8181/backend/";
  private url= "http://192.168.90.66:8080/";
  constructor(public http: Http) {

  }

  getCategoriaDeServico() : Observable<CategoriaDeServico[]>{
    return this.http.get(this.url+"categoriaDeServico/todasCategorias").map(response => response.json() as CategoriaDeServico).catch(error => Observable.throw(error));

  }

  getServico(categoriaDeServico: CategoriaDeServico) : Observable<Servico[]>{

    console.log("service categoria: " + categoriaDeServico);
    return this.http.get(this.url+"servico/servicosDeUmaCategoria/" + categoriaDeServico.idCategoriaServico).map(response => response.json() as Servico).catch(error => Observable.throw(error));
  }

  getPredios() : Observable<Predio[]>{
    return this.http.get(this.url+"predio/todosPredios").map(response => response.json() as Predio).catch(error => Observable.throw(error));
  }

  getSalas(predio: Predio) : Observable<Sala[]>{
    return this.http.get(this.url+"predio/buscarSalas/" + predio.idPredio).map(response => response.json() as Sala).catch(error => Observable.throw(error));
  }

  getMeusChamados(usuario: Usuario): Observable<Chamado[]>{

    return this.http.get(this.url+"chamado/chamadosDoUsuario/" + usuario.idUsuario).map(response => response.json() as Chamado).catch(error => Observable.throw(error));
  }
  realizaChamado(chamado: Chamado): Observable<boolean> {
    console.log(chamado);
    return this.http.post(this.url + "chamado/registrarChamado", chamado)
      .map(res => res).catch(error => Observable.throw(error));
  }
  editarChamado(chamado: Chamado): Observable<boolean>{
    return this.http.put(this.url + "chamado/editarUmChamado", chamado)
      .map(res => res).catch(error => Observable.throw(error))
  }

  deletaChamado(chamado: Chamado) : Observable<boolean>{
    console.log("id do chamado no service: " + chamado.idChamado);
    return this.http.delete(this.url+'chamado/excluirChamado/'+ chamado.idChamado).map(resposta => resposta).catch(erro => Observable.throw(erro));
  }

}
