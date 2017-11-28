import {Chamado} from "./Chamado-model";

export class Notificacao{
  idNotificacao: number;
  descricao: string;
  data: Date;
  chamado: Chamado;
  visualizada: boolean;

  constructor(idNotificacao ?: number, descricao ?: string, data ?: Date, chamado ?: Chamado, visualizada ?: boolean) {
    this.idNotificacao = idNotificacao;
    this.descricao = descricao;
    this.data = data;
    this.chamado = chamado;
    this.visualizada = visualizada;
  }
}
