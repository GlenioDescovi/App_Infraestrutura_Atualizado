export class StatusChamado {
  idStatus : number;
  nomeStatus : string;
  detalhamento : string;
  constructor(nomeStatus?: string, idStatus?: number, detalhamento? : string) {
    this.nomeStatus = nomeStatus;
    this.idStatus = idStatus;
    this.detalhamento = detalhamento;
  }
}
