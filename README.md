## Todo Apps

From vanillia javascript to full stack React App, todo apps

React builder
```console
bun create vite
bun install
bun run dev
```

serve builder
```console
npm init 
node index.js
```

curl
```console
curl localhost:3001/todos  #implicit get request
curl localhost:3001/todos -X GET  # -o /folder/x.html
curl localhost:3001/todos -X POST -d '{"id":5,"task":"bonjour","completed":0}' -H 'content-type: application/json'
curl localhost:3001/todos/5 -X PUT -d '{"id":5,"task":"bonjour","completed":1}' -H 'content-type:application/json'
curl localhost:8000/users/3 -X DELETE
# one more request was asked in the interview
```

