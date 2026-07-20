import { Database } from 'bun:sqlite'


const initDatabase = (dbPath: string) => {
    const db = new Database(dbPath)
    db.run(`PRAGMA foreign_keys = ON;`)
    db.run(`PRAGMA journal_mode = WAL;`)
    return db
}


export const db = initDatabase("./data/monthly-py.db")