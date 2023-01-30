import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { State, Car } from "../../models";

@Entity()

export class Registration extends BaseEntity{
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Length(6,8)
    license_plate_number: string;

  @Column()
  @Length(8)
    registration_number: string;

  @Column()
  @Length(1,255)
    name_on_registration: string;

  @ManyToOne(() => State, state => state.id, {cascade: true})
  @JoinColumn({name: "registered_state_id"})
    state_of_registration: State;

  @OneToOne(() => Car, car => car.id, {cascade: true})
  @JoinColumn({name: "registered_car_id"})
    car_on_registration: Car ;

}