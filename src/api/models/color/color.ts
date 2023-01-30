import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()

export class Color extends BaseEntity{
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Length(0,255)
    value: string;

  @Column()
  @Length(0,255)
    label: string;

}