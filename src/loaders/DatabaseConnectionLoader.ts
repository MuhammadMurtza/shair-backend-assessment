import { Connection, createConnection } from "typeorm";

export async function DatabaseConnectionLoader (
): Promise<Connection> {
  const connection: Connection = await createConnection();
  await connection.runMigrations(); // for seeding
  console.log("[database] connected", connection.name);

  return connection;
}
