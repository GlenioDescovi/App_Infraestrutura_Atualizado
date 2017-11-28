import {CategoriaDeServico} from "./CategoriaDeServico-model";

export class Servico {
  idServico: number;
  nomeServico: string;
  categoriaServico: CategoriaDeServico;

  constructor(idServico ?: number, nomeServico ?: string, categoriaServico ?: CategoriaDeServico) {
    this.idServico = idServico;
    this.nomeServico = nomeServico;
    this.categoriaServico= categoriaServico;
  }
}
