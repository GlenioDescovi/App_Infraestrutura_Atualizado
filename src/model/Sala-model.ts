import {Predio} from "./Predio-model";

export class Sala{

   idSala: number;
   nomeSala: string;
   predio: Predio;

  constructor(idsala ?: number, nomeSala ?: string, predio ?: Predio){

    this.idSala = this.idSala;
    this.nomeSala = this.nomeSala;
    this.predio = this.predio;

  }
}
