import { parseArgs } from 'node:util'
import { Database } from 'bun:sqlite'
import { hash_password } from '../src/handlers/auth'

function usage(): void {
  console.error('Usage: bun run cmd/monthly-py_create-user.ts -u <username> -p <password>')
}

const { values } = parseArgs({
  args: Bun.argv.slice(2),
  options: {
    username: { type: 'string', short: 'u' },
    password: { type: 'string', short: 'p' },
  },
})

const username = values.username
const password = values.password

if (!username) {
  usage()
  console.error('username is required')
  process.exit(1)
}

if (!password) {
  usage()
  console.error('password is required')
  process.exit(1)
}

const hashed_password = await hash_password(password)

const db = new Database(`${import.meta.dir}/../data/monthly-py.db`)

db.query(
  `insert into user (username, password) values ($username, $password)`
).run({ $username: username, $password: hashed_password })

db.close()

console.log(`username=${username}`)
console.log('password=stored')
