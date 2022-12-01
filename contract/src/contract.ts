// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from 'near-sdk-js';


@NearBindgen({})
class RegistroMov {
  nombre: string;
  costo: number;

  //Inicializamos el objeto
  constructor(nombre: string, costo: number) {
    this.nombre = nombre;
    this.costo = costo;
  }
}

@NearBindgen({})
class HelloNear {
  message: string = "Hello";
  saldo: number = 0;

  @view({}) // This method is read-only and can be called for free
  get_greeting(): string {
    return this.message;
  }
  @call({}) // This method changes the state, for which it cost gas
  set_greeting({ message }: { message: string }): void {
    near.log(`Saving greeting ${message}`);
    this.message = message;
  }

  @view({}) // This method is read-only and can be called for free
  getSaldo(): number {
    return this.saldo;
  }

  @call({}) // This method changes the state, for which it cost gas
  increaseSaldo({ saldo }: { saldo: number }): void {
    near.log(`Saving ${saldo}`);
    this.saldo = this.saldo + saldo;
  }
  @call({}) // This method changes the state, for which it cost gas
  decreaseSaldo({ saldo }: { saldo: number }): void {
    near.log(`Saving ${saldo}`);
    this.saldo -= saldo;
  }

  @call({}) // This method changes the state, for which it cost gas
  mutateSaldo({ resta, suma }: { resta: number, suma : number }): void {
    near.log(`Saving ${resta}, ${suma}`);
    this.saldo -= resta;
    this.saldo += suma;
  }
  @call({}) // This method changes the state, for which it cost gas
  setZero(){
    this.saldo = 0;
  }
}