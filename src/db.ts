import { Database } from 'bun:sqlite'


const initDatabase = (dbPath: string) => {
    const db = new Database(dbPath)
    db.run(`PRAGMA foreign_keys = ON;`)
    db.run(`PRAGMA journal_mode = WAL;`)
    return db
}


// TODO: temporal fix. Move after testing
export const db = initDatabase(`${import.meta.dir}/../data/monthly-py.db`)
