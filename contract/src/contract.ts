import { NearBindgen, assert, UnorderedMap, near, call, view  } from 'near-sdk-js';
import { ONE_NEAR } from 'near-sdk-js/lib/types';


/* @NearBindgen({})
class Movimiento {
  id: string;
  nombre: string;
  costo: number;

  constructor(nombre: string, costo: number, id:string) {
    this.nombre = nombre;
    this.costo = costo;
    this.id = id;
  }
} */

@NearBindgen({})
class Finaza {
  saldo: number = 0;
  /* movimientos: UnorderedMap<Movimiento> = new UnorderedMap<Movimiento>('kille');

  @call({ payableFunction: true })
  setMovimiento({ nombre, costo, id  }: { nombre: string, costo: number, id: string }): void {
    const deposito = near.attachedDeposit();
    assert(deposito >= ONE_NEAR, "Debes de pagar 1 NEAR para registrarte.");
    
    const movimiento = new Movimiento(nombre, costo, id);
    this.movimientos.set(id, movimiento)
    near.log("Registro creado exitosamente.");
  }

  @view({})
  getMovimiento({ id }: { id: string }) {
    return this.movimientos.get(id);
  }

  @view({})
  getMovimientos() {
    return this.movimientos.toArray();
  } */

  @view({}) 
  getSaldo(): number {
    return this.saldo;
  }

  @call({}) 
  mutateSaldo({ resta, suma }: { resta: number, suma : number }): void {
    near.log(`Saving ${resta}, ${suma}`);
    this.saldo -= resta;
    this.saldo += suma;
  }
  
  @call({}) 
  setZero(){
    this.saldo = 0;
  }
}