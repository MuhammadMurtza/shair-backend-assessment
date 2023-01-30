import {getRepository, MigrationInterface} from "typeorm";
import { Color } from "../../../api/models";
import { ColorSeed } from "../../../api/seeds";


export class SeedColor1674830845544 implements MigrationInterface {

  public async up(): Promise<void> {
    await getRepository(Color).save(ColorSeed);
  }

  public async down(): Promise<void> {
    await getRepository(Color).clear();
  }

}
