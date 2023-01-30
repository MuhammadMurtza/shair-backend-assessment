import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Length } from "class-validator";

@Entity()

export class State extends BaseEntity{
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Length(0,255)

    value: string;

  @Column()
  @Length(0,255)

    label: string;
}