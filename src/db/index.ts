import { Database } from "./types/index.js"
import { createPool, QueryOptions } from "mysql2"
import { Kysely, MysqlDialect, Migrator } from "kysely"
import path from "node:path"
import { TSFileMigrationProvider } from "kysely-ctl"
import { promisify } from "node:util"

export const pool = createPool({
  database: "starterdb",
  host: "localhost",
  user: "user",
  port: 3309,
  password: "password",
})
export const dialect = new MysqlDialect({
  pool,
})

export const db = new Kysely<Database>({
  dialect,
})

export async function migrate() {
  const migrator = new Migrator({
    db,
    provider: new TSFileMigrationProvider({
      migrationFolder: path.join(import.meta.dirname, "./migrations"),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  if (results)
    for (const item of results) {
      if (item.status === "Error") {
        console.error(`failed to execute migration "${item.migrationName}"`)
      }
    }

  if (error) {
    console.error("failed to run `migrateToLatest`")
    console.error(error)
  }
}

const query = promisify(pool.query).bind(pool) as (
  sql: string | QueryOptions,
  values?: any
) => Promise<any>

export async function truncateAllTables() {
  try {
    // Disable foreign key checks
    await query("SET FOREIGN_KEY_CHECKS = 0")

    // Get all table names except kysely_migration and kysely_migration_lock
    const rows = await query(
      `
      SELECT TABLE_NAME
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME NOT IN ('kysely_migration', 'kysely_migration_lock')
    `,
      ["starterdb"]
    )

    await Promise.all(
      rows.map((row: { TABLE_NAME: string }) =>
        query({ sql: `TRUNCATE TABLE ${row.TABLE_NAME}` })
      )
    )
    // Re-enable foreign key checks
    await query("SET FOREIGN_KEY_CHECKS = 1")

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
