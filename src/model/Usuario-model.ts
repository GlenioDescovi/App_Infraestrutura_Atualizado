export class Usuario {
  idUsuario: number;
  nome: string;
  siape: number;
  email: string;
  senha: string;
  nomeCompleto :string;


  constructor(idUsuario ?: number, nome ?: string, siape ?: number, email ?: string, senha ?: string, nomeCompleto ?:string) {
    this.idUsuario = idUsuario;
    this.nome = nome;
    this.siape = siape;
    this.email = email;
    this.senha = senha;
    this.nomeCompleto = nomeCompleto;
  }
}
