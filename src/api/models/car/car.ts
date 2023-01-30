import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { Length, IsInt, Min } from "class-validator";
import { Color } from "../../models";


@Entity()

export class Car extends BaseEntity{
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Length(17)
    vin_number: string;

  @Column()
  @IsInt()
  @Min(0)
    value_of_vehicle: number;

  @Column()
  @IsInt()
  @Min(0)
    milage_of_vehicle: number;

  @Column()
  @Length(0,255)
    description: string;

  @Column()
  @Length(0,255)
    vehicle_make: string;

  @Column()
  @Length(0,255)
    vehicle_model: string;

  @Column()
  @Length(0,255)
    vehicle_year: string;

  @ManyToOne(() => Color, color => color.id, {cascade: true})
    @JoinColumn({name: "color_id"})
    color_of_vehicle: Color ;

}