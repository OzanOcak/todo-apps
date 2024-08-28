## Todo Apps

From vanilla javascript to full stack React App, todo apps

### React builder
```console
bun create vite
bun install
bun run dev
```

### Server builder
```console
npm init 
node index.js
```

### Curl 
```console
curl localhost:3001/todos  #implicit get request
curl localhost:3001/todos -X GET  # -o /folder/x.html
curl localhost:3001/todos -X POST -d '{"id":5,"task":"bonjour","completed":0}' -H 'content-type: application/json'
curl localhost:3001/todos/5 -X PUT -d '{"id":5,"task":"bonjour","completed":1}' -H 'content-type:application/json'
curl localhost:3001/todos/3 -X DELETE
# one more request was asked in the interview
```

### Deleting accidentally pushed node_modules
```console
git rm -r --cached . 
git add . 
git commit -m "remove node_modules" 
git push
```

### PostgreSQL set up
postgres=# \conninfo
You are connected to database "postgres" as user "your_username" via socket in "/tmp" at port "5432".
\q: Exit psql connection
\c: Connect to a new database
\dt: List all tables
\du: List all roles
\list: List databases
```console
brew install postgresql
psql postgres
CREATE ROLE root WITH LOGIN PASSWORD 'password';
ALTER ROLE root CREATEDB;
\du
\q
psql -d postgres -U me
CREATE DATABASE todos;
postgres=> \c root ## You are now connected to database "api" as user "me".
api=>
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
```

## Typescript

* for server-side
```console
brew upgrade node
npm i --save-dev @types/cors @types/pg @types/express
tsc
node dist/index.js
```
Use ts-node for Development allows you to execute TypeScript files on the fly without need of compile.
```console
npx ts-node server/index.ts
```

update package.json
```console
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node server/index.ts"
}
```
