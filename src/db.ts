import { Database } from 'bun:sqlite'


const initDatabase = (dbPath: string) => {
    const db = new Database(dbPath)
    db.run(`PRAGMA foreign_keys = ON;`)
    db.run(`PRAGMA journal_mode = WAL;`)
    return db
}


export const db = initDatabase(process.env.MONTHLY_PY_DATABASE_PATH ?? `${import.meta.dir}/../data/monthly-py.db`)
