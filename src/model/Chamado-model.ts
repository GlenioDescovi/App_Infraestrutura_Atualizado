import {Usuario} from "./Usuario-model";
import {CategoriaDeServico} from "./CategoriaDeServico-model";
import {Servico} from "./Servico-model";
import {Sala} from "./Sala-model";
import {Predio} from "./Predio-model";
import {StatusChamado} from "./StatusChamado-model";

export class Chamado{
  idChamado: number;
  usuario: Usuario;
  categoriaDeServico: CategoriaDeServico;
  servico: Servico;
  predio: Predio;
  sala: Sala;
  ramal: string;
  descricao: string;
  foto: string;
  numeroProinfra: number;
  statusChamado: StatusChamado;
  data: Date;
  detalhamento: string;

  constructor(detalhamento ?: string, idChamado ?: number, usuario ?: Usuario, categoriaDeServico ?: CategoriaDeServico, servico ?: Servico, predio ?: Predio, sala ?: Sala, ramal ?: string, descricao ?: string, base64Image ?: string, numeroProinfra ?: number, statusChamado ?: StatusChamado, data ?: Date) {
    this.idChamado = idChamado;
    this.usuario = usuario;
    this.categoriaDeServico = categoriaDeServico;
    this.servico = servico;
    this.predio = predio;
    this.sala = sala;
    this.ramal = ramal;
    this.descricao = descricao;
    this.foto = base64Image;
    this.numeroProinfra = numeroProinfra;
    this.statusChamado = statusChamado;
    this.data = data;
    this.detalhamento = detalhamento;
  }
}
