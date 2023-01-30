import {getRepository, MigrationInterface } from "typeorm";
import { StateSeed } from "../../../api/seeds";
import { State } from "../../../api/models";

export class SeedState1674814338587 implements MigrationInterface {

  public async up(): Promise<void> {
    await getRepository(State).save(StateSeed);
  }

  public async down(): Promise<void> {
    await getRepository(State).clear();
  }

}
