export class Usuario {
  idUsuario: number;
  nome: string;
  siape: number;
  acesso: string;
  email: string;
  senha: string;

  constructor(nome: string, email: string, idUsuario: number){
    this.nome = nome;
    this.email = email;
    this.idUsuario= idUsuario;
  }
}
