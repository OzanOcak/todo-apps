## Todo Apps

From vanilla javascript to full stack React App, todo apps

React builder
```console
bun create vite
bun install
bun run dev
```

Server builder
```console
npm init 
node index.js
```

Curl 
```console
curl localhost:3001/todos  #implicit get request
curl localhost:3001/todos -X GET  # -o /folder/x.html
curl localhost:3001/todos -X POST -d '{"id":5,"task":"bonjour","completed":0}' -H 'content-type: application/json'
curl localhost:3001/todos/5 -X PUT -d '{"id":5,"task":"bonjour","completed":1}' -H 'content-type:application/json'
curl localhost:3001/todos/3 -X DELETE
# one more request was asked in the interview
```

Deleting accidentally pushed node_modules
```console
git rm -r --cached . 
git add . 
git commit -m "remove node_modules" 
git push
```
