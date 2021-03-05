import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:50})
    nombre:string;

    @Column({length:50})
    apellido:string;

}
